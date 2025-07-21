package api

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	campay "github.com/Iknite-Space/c4-project-boilerplate/api/payment"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
	r.POST("/api/v1/payments/initiate", h.handleInitiatePayment)

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
        Amount      string `json:"amount"`
        Currency    string `json:"currency"`
        Description string `json:"description"`
        Reference   string `json:"reference"`
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

    // Call Campay package
    resp, err := campay.RequestPayment(
        requestBody.PhoneNumber,
        requestBody.Amount,
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