package api

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	campay "github.com/Iknite-Space/c4-project-boilerplate/api/payment"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
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
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
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

// helper functions
func fromPGTime(t pgtype.Time) (time.Time, error) {
	if !t.Valid {
		return time.Time{}, fmt.Errorf("invalid pgtype.Time")
	}
	return time.Date(0, 1, 1, 0, 0, 0, int(t.Microseconds)*1000, time.UTC), nil
}

func toPGTime(t time.Time) pgtype.Time {
	// Calculate microseconds since midnight
	midnight := time.Date(0, 1, 1, 0, 0, 0, 0, time.UTC)
	microseconds := t.Sub(midnight).Microseconds()

	return pgtype.Time{
		Microseconds: microseconds,
		Valid:        true,
	}
}

func (h *MessageHandler) generateSlotTemplates(c *gin.Context, serviceID string) error {
	data, err := h.querier.GetServiceWithOrgTimes(c, serviceID)
	if err != nil {
		return fmt.Errorf("failed to fetch organization working hours: %w", err)
	}

	start, err := fromPGTime(data.StartTime)
	if err != nil {
		return err
	}
	end, err := fromPGTime(data.EndTime)
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
			StartTime: toPGTime(slotStart),
			EndTime:   toPGTime(slotEnd),
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


// hamdler function for payment
func (h *MessageHandler) handleInitiatePayment(c *gin.Context) {
    // Define request struct (use consistent JSON tags)
    var requestBody struct {
        PhoneNumber string `json:"phone_number"`
        Amount      float64 `json:"amount"`
        Currency    string `json:"currency"`
        Description string `json:"description"`
        Reference   string `json:"reference"`
				Date        string  `json:"date" binding:"required"` 
 				CusName     string  `json:"cus_name" binding:"required"` 
				CusEmail    string  `json:"cus_email"` 
				ServiceID   string  `json:"service_id" binding:"required"`
        SlotID      string  `json:"slot_id" binding:"required"`
    }


    // Bind and validate request
    if err := c.ShouldBindJSON(&requestBody); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Invalid request body",
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
		


		parsedDate, err := time.Parse("2006-01-02", requestBody.Date)
if err != nil {
    c.JSON(http.StatusBadRequest, gin.H{
        "error": "Invalid date format. Expected YYYY-MM-DD",
    })
    return
}

pgDate := pgtype.Date{
    Time:  parsedDate,
    Valid: true,
}


		    // 2. Create payment record
    paymentID := "pay_" + time.Now().Format("20060102-150405") // Format: pay_YYYYMMDD-HHMMSS
    
    err = h.querier.CreatePayment(c, repo.CreatePaymentParams{
        PaymentID:   paymentID,
        CusName:     requestBody.CusName,
				 CusEmail:    pgtype.Text{String: requestBody.CusEmail, Valid: requestBody.CusEmail != ""},
        PhoneNumber: requestBody.PhoneNumber,
        Date:       pgDate,
        ServiceID:   requestBody.ServiceID,
        SlotID:      requestBody.SlotID,
        Amount:      requestBody.Amount,
        Status:      "pending",
    })
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save payment"})
        return
    }


		
		amountStr := fmt.Sprintf("%.2f", requestBody.Amount)
		
    // Call Campay package
    resp, err := campay.RequestPayment(
        requestBody.PhoneNumber,
        amountStr,
        requestBody.Currency,
        requestBody.Description,
        requestBody.Reference,
    )

    if err != nil {
			log.Printf("Campay API error: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to initiate payment",
				"details": err.Error(),
			})
			return
    }
		
		    // Set default status if empty
		if resp.Status == ""{
			resp.Status = "PENDING"
		}
    // Successful response
    c.JSON(http.StatusOK, gin.H{
			"data":   resp,
    })
		

}


func (h *MessageHandler) handleCampayWebhook(c *gin.Context) {
	// 1. Get the most important parameters
	status := c.Query("status")          // "SUCCESSFUL" or "FAILED"
	reference := c.Query("reference")    // Transaction ID
	amount := c.Query("amount")          // e.g. "1000"
	currency := c.Query("currency")      // e.g. "XAF"
	signature := c.Query("signature")    // JWT token
	phone := c.Query("phone_number")     // e.g. "237612345678"

	// Verify JWT signature (add this after getting the parameters)
secret := os.Getenv("CAMPAY_WEBHOOK_SECRET")
token, err := jwt.Parse(signature, func(token *jwt.Token) (interface{}, error) {
    return []byte(secret), nil
})

if err != nil || !token.Valid {
    log.Println("INVALID SIGNATURE!")
    c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid signature"})
    return
}


    log.Println("Received webhook with status:", status)
    if status == "SUCCESSFUL" {
        // 1. Update payment status
        err := h.querier.UpdatePaymentStatus(c, repo.UpdatePaymentStatusParams{
            PaymentID:      reference,
            Status:         "completed",
            TransactionRef: reference, // assuming reference matches transaction_ref
        })
        if err != nil {
            log.Printf("UpdatePaymentStatus failed: %v", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Update failed"})
            return
        }

        // 2. Retrieve payment info for booking date
        payment, err := h.querier.GetPaymentByID(c, reference)
        if err != nil {
            log.Printf("Payment lookup failed: %v", err)
            c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
            return
        }

        // 3. Create booking
        bookingID := "book_" + time.Now().Format("20060102-150405")
        err = h.querier.CreateBooking(c, repo.CreateBookingParams{
            BookingID:   bookingID,
            PaymentID:   payment.PaymentID,
            BookingDate: payment.Date,
            Status:      "booked",
        })
        if err != nil {
            log.Printf("CreateBooking failed: %v", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Booking creation failed"})
            return
        }

        log.Println("Booking confirmed for payment:", reference)
				// 2. Log everything (for debugging)
				log.Println("\n=== NEW WEBHOOK ===")
				log.Println("Status:", status)
				log.Println("Reference:", reference)
				log.Println("Amount:", amount, currency)
				log.Println("Phone:", phone)
				log.Println("Signature:", signature)
    }

		// Just respond with "OK" for now
    c.String(http.StatusOK, "Webhook processed")
}




