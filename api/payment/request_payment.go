package campay

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type RequestBody struct {
	Amount      int `json:"amount"`
	Number      string  `json:"from"`
	Description string `json:"description"`
	Reference   string `json:"external_reference"`
}



type Response struct {
	Reference string `json:"reference"`
	Ussd_Code string `json:"ussd_code"`
}

func MakePayment(apiKey string, amount string, momoNumber string, description string, ref string) (Response, error) {

	postBody, _ := json.Marshal(map[string]string{
		"amount":             amount,
		"from":               momoNumber,
		"description":        description,
		"external_reference": ref,
	})

	responseBody := bytes.NewBuffer(postBody)

	//GO HTTP post request

	resp, err := http.NewRequest(http.MethodPost, "https://demo.campay.net/api/collect/", responseBody)
	if err != nil {
		log.Fatal(err)
	}
	resp.Header.Set("Authorization", "Token "+apiKey)
	resp.Header.Set("Content-Type", "application/json")

client := &http.Client{
    Timeout: 10 * time.Second,
}
response, err := client.Do(resp)


	// response, err := http.DefaultClient.Do(resp)

	//habdling response error
	if err != nil {
		log.Fatalf("Error %v", err)
	}
	// defer response.Body.Close()
		defer func() {
    if err := response.Body.Close(); 
	err != nil {
        log.Println("Error closing response body:", err)
    }
}()

	// read response body
	var paymentResponse Response
	// json.NewDecoder(response.Body).Decode(&sb)
	if err := json.NewDecoder(response.Body).Decode(&paymentResponse);
	err !=nil{
		log.Println("JSON decode error:", err)
	}
	return paymentResponse, nil

}
