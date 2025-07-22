import React from "react";
import "./DownloadTicket.css";
import { jsPDF } from "jspdf"; // Library used to generate PDF

 function DownloadTicket() {
  // Function to create and download the ticket PDF
  const handleDownload = () => {
    const doc = new jsPDF(); // Create a new PDF document

    // Add text content to the PDF
    doc.text("Qless Ticket", 20, 20);
    doc.text("Service: Passport Application", 20, 30);
    doc.text("Organization: Ministry of Foreign Affairs", 20, 60);
    doc.text("Date & Time: July 24, 2025 — 10:30 AM", 20, 50);

    // Saves document with filename
    doc.save("ticket.pdf");
  };

  return (
    <div className="download-ticket-container">
      {/* Page Header */}
      <h1>Download Your Ticket</h1>

      {/* Ticket Details Section */}
      <div className="ticket-card">
        <p><strong>Service Type:</strong> Passport Application</p>
        <p><strong>Organization:</strong> Ministry of Foreign Affairs</p>
        <p><strong>Date & Time:</strong> July 24, 2025 — 10:30 AM</p>

        {/* Download Button to trigger PDF creation */}
        <button className="download-button" onClick={handleDownload}>
          Download Ticket
        </button>
      </div>
    </div>
  );
}
export default DownloadTicket;