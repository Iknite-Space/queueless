package campay

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type RequestBody struct {
	From      string  `json:"from"`
	Amount      string `json:"amount"`
	Description string `json:"description"`
	Reference   string `json:"external_reference"`
}



type Response struct {
	Reference string `json:"reference"`
	Ussd_Code string `json:"ussd_code"`
	Operator  string `json:"operator"`
}

func MakePayment(apiKey string, momoNumber string, amount string,  description string, ref string) (Response, error) {

	postBody, _ := json.Marshal(map[string]string{
		"from":               momoNumber,
		"amount":             amount,
		"description":        description,
		"external_reference": ref,
	})

	reqBody := bytes.NewBuffer(postBody)

	//GO HTTP post request

	req, err := http.NewRequest(http.MethodPost, "https://demo.campay.net/api/collect/", reqBody)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Authorization", "Token " + apiKey)
	req.Header.Set("Content-Type", "application/json")

// client := &http.Client{
//     Timeout: 10 * time.Second,
// }
// response, err := client.Do(resp)


	response, err := http.DefaultClient.Do(req)
	fmt.Println(response)
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

	bodyBytes, _ := io.ReadAll(response.Body)
log.Println("Raw response:", string(bodyBytes))

	// json.NewDecoder(response.Body).Decode(&sb)
	if err := json.NewDecoder(response.Body).Decode(&paymentResponse);
	err !=nil{
		log.Println("JSON decode error:", err)
	}
	return paymentResponse, nil

}


