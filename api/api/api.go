package api

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"firebase.google.com/go/auth"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	"github.com/Iknite-Space/c4-project-boilerplate/api/firebase"
	campay "github.com/Iknite-Space/c4-project-boilerplate/api/payment"
	"github.com/Iknite-Space/c4-project-boilerplate/api/utility"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/gorilla/websocket"
	"github.com/jackc/pgx/v5/pgtype"
)

type MessageHandler struct {
	querier repo.Querier
}

func NewMessageHandler(querier repo.Querier) *MessageHandler {
	return &MessageHandler{
		querier: querier,
	}
}

func (h *MessageHandler) WireHttpHandler() http.Handler {

	// r = router
	r := gin.Default()

	// addin CORS middleware
	r.Use(cors.New(cors.Config{
		// included https://api.queueless.xyz to handle endpoint, as the access point
		AllowOrigins:     []string{"http://localhost:3000", "https://queueless.xyz"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS", "PATCH", "PUT"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	r.Use(gin.CustomRecovery(func(c *gin.Context, _ any) {
		c.String(http.StatusInternalServerError, "Internal Server Error: panic")
		c.AbortWithStatus(http.StatusInternalServerError)
	}))

	r.GET("//healthcheck", h.handleHealthCheck)
	r.GET("/api/v1/organizations", h.handleGetOrganizations)
	r.GET("/api/v1/organizations/:id/services", h.handleGetServicesByOrganization)
	r.POST("/api/v1/:id/services", h.handleCreateService)
	r.GET("/api/v1/service/:id/slots", h.handleGetServiceSlots)
	r.POST("/api/v1/payment/initiate", h.handleInitiatePayment)
	r.GET("/api/v1/payment/webhook", h.handleCampayWebhook)
	// r.GET("/api/v1/payment/:id/status", h.handleGetPaymentStatus)
	r.GET("api/v1/payment/:id/statusSocket", h.handlePaymentStatusSocket)
	// r.POST("/api/v1/bookings", h.handleCreateBooking)
	r.GET("/api/v1/service/:id/bookings", h.handleGetServiceBookings)
	r.GET("/api/v1/services/search", h.handleGetSearchResults)

	//create user in firebase
	r.POST("/api/v1/firebase/users", h.handleCreateFirebaseUser)

	//verify organization login token before fetching data
	r.GET("/api/v1/organization/data", h.handleGetOrganizationData)

	//update the organization table
	r.PATCH("/api/v1/organization/update/profile", h.handleUpdateOrganization)

	//get organization bookings
	r.GET("/api/v1/organization/:id/bookings", h.handleGetOrganizationBookings)
	return r
}

func (h *MessageHandler) handleHealthCheck(c *gin.Context) {
	c.String(http.StatusOK, "ok")
}

// Endpoint to get all organizations
func (h *MessageHandler) handleGetOrganizations(c *gin.Context) {

	organizations, err := h.querier.GetOrganizations(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":        "success",
		"organizations": organizations,
	})
}

// Endpoint to get all services by organization
func (h *MessageHandler) handleGetServicesByOrganization(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	services, err := h.querier.GetServicesByOrganization(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   "success",
		"services": services,
	})
}

// Endpoint to get all services by organization
func (h *MessageHandler) handleGetServiceSlots(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	slots, err := h.querier.GetServiceSlots(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"slots":  slots,
	})
}

func (h *MessageHandler) generateSlotTemplates(c *gin.Context, serviceID string) error {
	data, err := h.querier.GetServiceWithOrgTimes(c, serviceID)
	if err != nil {
		return fmt.Errorf("failed to fetch organization working hours: %w", err)
	}

	start, err := utility.FromPGTime(data.StartTime)
	if err != nil {
		return err
	}
	end, err := utility.FromPGTime(data.EndTime)
	if err != nil {
		return err
	}

	duration := time.Duration(data.Duration) * time.Minute
	current := start

	for current.Before(end) {
		slotStart := current
		slotEnd := current.Add(duration)

		if slotEnd.After(end) {
			break
		}

		err := h.querier.InsertSlotTemplate(c, repo.InsertSlotTemplateParams{
			ServiceID: serviceID,
			StartTime: utility.ToPGTime(slotStart),
			EndTime:   utility.ToPGTime(slotEnd),
		})
		if err != nil {
			log.Printf("InsertslotTemplate error: %v", err)
		}

		current = slotEnd
	}

	return nil
}

func (h *MessageHandler) handleCreateService(c *gin.Context) {
	var req repo.CreateServiceParams
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println(err.Error())
		return
	}

	serviceID, err := h.querier.CreateService(c, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := h.generateSlotTemplates(c, serviceID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": fmt.Sprintf("Failed to generate slot templates: %v", err),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   "success",
		"services": "Service successfully created",
	})
}

// variable to store the transaction reference for each payment request.
var ref string

// hamdler function for payment
func (h *MessageHandler) handleInitiatePayment(c *gin.Context) {

	// Define request struct (use consistent JSON tags)
	type data struct {
		CustomerName   string      `json:"cus_name,omitempty"`
		CustomerEmail  string      `json:"cus_email,omitempty"`
		PhoneNumber    string      `json:"phone_number,omitempty"`
		Date           pgtype.Date `json:"date,omitempty"`
		ServiceID      string      `json:"service_id,omitempty"`
		SlotID         string      `json:"slot_id,omitempty"`
		Amount         string      `json:"amount,omitempty"`
		Currency       string      `json:"currency,omitempty"`
		Description    string      `json:"description,omitempty"`
		Reference      string      `json:"reference,omitempty"`
		Status         string      `json:"status,omitempty"`
		TransactionRef string      `json:"transaction_ref,omitempty"`
	}

	//payment request body
	requestBody := data{}

	// Bind and validate request
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request body",
			"details": err.Error(),
		})
		return
	}
	if requestBody.PhoneNumber == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Phone number is required",
		})
		return
	}

	// Call Campay package
	resp, err := campay.RequestPayment(
		requestBody.PhoneNumber,
		requestBody.Amount,
		requestBody.Currency,
		requestBody.Description,
		requestBody.Reference,
	)

	fmt.Println(resp)
	if err != nil {
		log.Printf("Campay API error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to initiate payment",
			"details": err.Error(),
		})
		return
	}

	// Set default status if empty
	if resp.Status == "" {
		resp.Status = "PENDING"
	}

	//convert amount(string) to float 32
	amount, err := strconv.ParseFloat(requestBody.Amount, 32)

	if err != nil {
		log.Printf("Can not convert amount to float32: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid amount format",
			"details": err.Error(),
		})
		return

	}

	responseBody := repo.CreatePaymentParams{
		CusName:        requestBody.CustomerName,
		CusEmail:       requestBody.CustomerEmail,
		PhoneNumber:    requestBody.PhoneNumber,
		Date:           requestBody.Date,
		ServiceID:      requestBody.ServiceID,
		SlotID:         requestBody.SlotID,
		Amount:         amount,
		Status:         resp.Status,
		TransactionRef: resp.Reference,
	}

	payment, err := h.querier.CreatePayment(c, responseBody)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Successful response
	c.JSON(http.StatusOK, gin.H{
		"payment": payment,
	})

	ref = resp.Reference
}

func (h *MessageHandler) handleCampayWebhook(c *gin.Context) {

	// 1. Get the most important parameters
	status := c.Query("status")       // "SUCCESSFUL" or "FAILED"
	reference := c.Query("reference") // Transaction ID
	amount := c.Query("amount")       // e.g. "1000"
	currency := c.Query("currency")   // e.g. "XAF"
	signature := c.Query("signature") // JWT token
	phone := c.Query("phone_number")  // e.g. "237612345678"

	// Verify JWT signature (add this after getting the parameters)

	secret := utility.LoadEnv("CAMPAY_CONFIG", "CAMPAY_WEBHOOK_KEY") //os.Getenv("CAMPAY_WEBHOOK_SECRET")

	// 3. Parse and verify JWT

	token, err := jwt.Parse(signature, func(token *jwt.Token) (interface{}, error) {
		// Ensure token uses HMAC signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})

	// 4. If verification fails, reject the request
	if err != nil || !token.Valid {
		log.Println("INVALID SIGNATURE!", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid signature"})
		// return
	}

	// 5. Optionally: Read claims from token
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		log.Println("Verified token claims:", claims)
	}

	// 2. Log everything (for debugging)
	log.Println("\n=== NEW WEBHOOK ===")
	log.Println("Status:", status)
	log.Println("Reference:", reference)
	log.Println("Ref:", ref)
	log.Println("Amount:", amount, currency)
	log.Println("Phone:", phone)
	log.Println("Signature:", signature)

	if ref == reference {
		err = h.querier.UpdatePaymentStatus(c, repo.UpdatePaymentStatusParams{
			Status:         status,
			TransactionRef: reference,
		})
		if err != nil {
			log.Println("Failed to update payment status:", err)
		} else {
			log.Println("payment status updated successfully")
		}
	}

	// 3. Just respond with "OK" for now
	c.String(http.StatusOK, "Webhook received!")
}

// upgrading the http connection to a socket conn
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	}}

func (h *MessageHandler) GetPaymentStatusByID(ctx context.Context, id string) (repo.Payment, error) {
	payment, err := h.querier.GetPaymentByID(ctx, id)
	if err != nil {
		log.Println("Failed to get status:", err)
		return repo.Payment{PaymentID: payment.PaymentID}, err
	}
	return payment, nil
}

func (h *MessageHandler) CreateBookings(c *gin.Context, req repo.CreateBookingParams) error {

	_, err := h.querier.CreateBooking(c, req)
	if err != nil {
		log.Println("Failed to create booking:", err)
		return err
	}
	return err
}

func (h *MessageHandler) handlePaymentStatusSocket(c *gin.Context) {
	payment_id := c.Param("id")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("WebSocket upgrade failed:", err)
		return
	}
	//validate id
	if payment_id == "" {
		log.Println("Missing ID in query params")
		// conn.WriteJSON(map[string]string{"status": "error"})

		if err := conn.WriteJSON(map[string]string{"status": "error"}); err != nil {
			log.Println("WriteJSON failed:", err)
		}
		return
	}
	defer func() {
		if err := conn.Close(); err != nil {
			log.Println("WebSocket close failed:", err)
		}
	}()

	prevStatus := ""

	for {
		payment, err := h.GetPaymentStatusByID(c, payment_id) // You fetch from DB or queue
		if err != nil {
			log.Println("Error fetching status:", err)
			// conn.WriteJSON(map[string]string{"status": "error"})
			if err := conn.WriteJSON(map[string]string{"status": "error"}); err != nil {
				log.Println("WriteJSON failed:", err)
			}
			continue
		}

		status := payment.Status

		if status != prevStatus {
			// conn.WriteJSON(map[string]string{"status": status})
			if err := conn.WriteJSON(map[string]string{"status": status}); err != nil {

				log.Println("WriteJSON failed:", err)
			}

			prevStatus = status
		}

		if prevStatus == "SUCCESSFUL" {
			// Insert booking into database
			err := h.CreateBookings(c, repo.CreateBookingParams{
				PaymentID:   payment.PaymentID,
				ServiceID:   &payment.ServiceID,
				SlotID:      &payment.SlotID,
				BookingDate: payment.Date,
				Status:      payment.Status,
			})
			if err != nil {
				log.Println("Error inserting booking:", err)
				if err := conn.WriteJSON(map[string]string{"status": "booking_failed"}); err != nil {
					log.Println("writeJSON failed:", err)
				}
			} else {
				if err := conn.WriteJSON(map[string]string{"status": "booking_success"}); err != nil {
					log.Println("writeJSON failed:", err)
				}
				break
			}

			if prevStatus == "FAILED" {
				break
			}
			// conn.WriteJSON(map[string]string{"status": status})
			time.Sleep(2 * time.Second)
		}
	}
}

func (h *MessageHandler) handleGetServiceBookings(c *gin.Context) {
	serviceID := c.Param("id")
	start := c.Query("start")
	end := c.Query("end")

	if serviceID == "" || start == "" || end == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing required query parameters"})
		return
	}

	startDate, err := time.Parse("2006-01-02", start)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid start date"})
		return
	}

	endDate, err := time.Parse("2006-01-02", end)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid end date"})
		return
	}

	bookings, err := h.querier.GetBookingsInDateRange(c, repo.GetBookingsInDateRangeParams{
		ServiceID:     &serviceID,
		BookingDate:   pgtype.Date{Time: startDate, Valid: true},
		BookingDate_2: pgtype.Date{Time: endDate, Valid: true},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not fetch bookings"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"bookings": bookings,
	})
}

// Endpoint to get all services by organization
func (h *MessageHandler) handleGetSearchResults(c *gin.Context) {
	term := c.Query("term")
	// if term == "" {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
	// 	return
	// }

	results, err := h.querier.GetSearchResults(c, term)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"results": results,
	})
}

type CreateUserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *MessageHandler) handleCreateFirebaseUser(c *gin.Context) {
	var req CreateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	app := firebase.InitApp()
	client, err := app.Auth(context.Background())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	params := (&auth.UserToCreate{}).Email(req.Email).Password(req.Password)
	user, err := client.CreateUser(context.Background(), params)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	//extract organization email
	email := user.Email

	// create new organization in the database
	organizaton, err := h.querier.CreateOrganization(c, repo.CreateOrganizationParams{
		Email: &email,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Organization created", "organization": organizaton})
}

// Endpoint to get organization data
func (h *MessageHandler) handleGetOrganizationData(c *gin.Context) {

	//extract the header
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization header"})
		return
	}

	//extract the id token
	idToken := strings.TrimPrefix(authHeader, "Bearer ")

	//authenticate the token with firebase
	app := firebase.InitApp()
	client, err := app.Auth(context.Background())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	token, err := client.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
		return
	}

	//get user credentials
	// uid := token.UID
	user_email := token.Claims["email"].(string) // convert email to type interface to string.

	org, err := h.querier.GetOrganizationData(c, &user_email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error, failed to get organization data": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{
		"status":           "success",
		"organizationData": org,
		"email":            user_email,
	})
}

type UpdateOrganizationRequest struct {
	Name      string `json:"name"`
	Location  string `json:"location"`
	StartTime string `json:"start_time"`
	EndTime   string `json:"end_time"`
	Email     string `json:"email"`
	ImageUrl  string `json:"image_url"`
}

// Endpoint to update organization info
func (h *MessageHandler) handleUpdateOrganization(c *gin.Context) {
	var req UpdateOrganizationRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid requst body"})
	}

	if req.StartTime == "" || req.EndTime == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "start_time and end_time must not be empty"})
		return
	}

	startTime, err := utility.ParsePgTime(req.StartTime)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error converting start time": err.Error()})
	}
	endTime, err := utility.ParsePgTime(req.EndTime)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	org, err := h.querier.UpdateOrganizationData(c, repo.UpdateOrganizationDataParams{
		Name:      req.Name,
		Location:  &req.Location,
		StartTime: startTime,
		EndTime:   endTime,
		Email:     &req.Email,
		ImageUrl:  req.ImageUrl,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error updating organization data": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":       "success",
		"organization": org,
	})
}

// Endpoint to get all bookings by organization
func (h *MessageHandler) handleGetOrganizationBookings(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
		return
	}

	bookings, err := h.querier.GetOrganizationBookings(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   "success",
		"bookings": bookings,
	})
}
