package handlers

// Define a struct for your ticket data
type Ticket struct {
	ServiceType  string `json:"serviceType"`
	DateTime     string `json:"dateTime"`
	Organization string `json:"organization"`
}