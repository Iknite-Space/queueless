package handlers

import (
    "encoding/json"
    "net/http"
)

// Define a struct for your ticket data
type Ticket struct {
    ServiceType  string `json:"serviceType"`
    DateTime     string `json:"dateTime"`
    Organization string `json:"organization"`
}

// Handler function for GET /api/slot-ticket/{id}
func GetSlotTicket(w http.ResponseWriter, r *http.Request) {

    // Dummy ticket data — you can connect to a database later
    ticket := Ticket{
        ServiceType:  "Passport Application",
        DateTime:     "July 24, 2025 — 10:30 AM",
        Organization: "Ministry of Foreign Affairs",
    }

    // Set the header and return the ticket info as JSON
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(ticket)
}
