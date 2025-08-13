package campay

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/Iknite-Space/c4-project-boilerplate/api/utility"
)

type PaymentRequest struct {
	From              string `json:"from"`
	Amount            string `json:"amount"`
	Currency          string `json:"currency"`
	Description       string `json:"description"`
	ExternalReference string `json:"external_reference"`
}

type PaymentResponse struct {
	Reference string `json:"reference"`
	UssdCode  string `json:"ussd_code"` 
	Operator  string `json:"operator"`
	Status    string `json:"status"` 
}

func RequestPayment(momoNumber, amount, currency, description, ref string) (*PaymentResponse, error) {
	token := utility.LoadEnv("CAMPAY_CONFIG", "CAMPAY_API_KEY") //os.Getenv("CAMPAY_API_KEY")
	if token == "" {
		return nil, fmt.Errorf("missing CAMPAY_API_KEY in environment")
	}

	requestBody := PaymentRequest{
		From:              momoNumber,
		Amount:            amount,
		Currency:          currency,
		Description:       description,
		ExternalReference: ref,
	}

	jsonBody, err := json.Marshal(requestBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %v", err)
	}

	req, err := http.NewRequest(
		"POST",
		"https://demo.campay.net/api/collect/",
		bytes.NewBuffer(jsonBody),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	req.Header.Set("Authorization", "Token "+token)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{
		Timeout: 10 * time.Second,
	}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %v", err)
	}

	//	defer resp.Body.Close()

	defer func() {
		err := resp.Body.Close()
		if err != nil {
			log.Fatal(err)
		}
	}()

	// Read response once
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %v", err)
	}

	log.Printf("Raw Campay response: %s", string(bodyBytes))

	// Parse response
	var result struct {
		Reference string `json:"reference"`
		UssdCode  string `json:"ussd_code"`
		Operator  string `json:"operator"`
		Status    string `json:"status"`
		Error     string `json:"error"` 
	}

	if err := json.Unmarshal(bodyBytes, &result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %v", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("payment failed (status %d): %s", resp.StatusCode, result.Error)
	}

	return &PaymentResponse{
		Reference: result.Reference,
		UssdCode:  result.UssdCode,
		Operator:  result.Operator,
		Status:    result.Status,
	}, nil
}
