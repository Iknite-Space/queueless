import React from "react";
// import "./DownloadTicket.css";
import PropTypes from "prop-types";
import { jsPDF } from "jspdf"; // Library used to generate PDF

DownloadTicket.propTypes = {
  org: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.string.isRequired,
  setStep: PropTypes.string.isRequired,
  resetFormData: PropTypes.string.isRequired,
};

function DownloadTicket({
  handleCloseModal,
  org,
  service,
  slot,
  formData,
  setStep,
  resetFormData,
}) {

  // Functions to create and download the ticket PDF
  const handleDownload = () => {
    //close the modal
    handleCloseModal();
    setStep(1);
    resetFormData();
  };

  const generateTicketPDF = ({ org, service, slot, formData }) => {
    console.log({ org, service, slot, formData });

    const lineSpacing = 10;
    const labelFontSize = 12;
    const valueFontSize = 12;

    const columnGap = 10;
    const columnWidth = 40;

    const baseY = 30; // Top margin
    const footerHeight = 15;
    const numRows = 7;

    // Total height = base margin + rows + footer
    const contentHeight = baseY + numRows * lineSpacing + footerHeight;

    // Page width: A4 width (210mm), adjust height dynamically
    const pageWidth = 210;
    const pageHeight = contentHeight;

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [pageWidth, pageHeight],
    });

    let y = baseY;
    const totalRowWidth = columnWidth * 2 + columnGap;
    const startX = (pageWidth - totalRowWidth) / 2.5;

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Qless Appointment Ticket", pageWidth / 2, 15, {
      align: "center",
    });

    // Helper function to draw two-column rows
    const addRow = (label, value) => {
      doc.setFontSize(labelFontSize);
      doc.setFont("helvetica", "normal");
      doc.text(label, startX, y);

      doc.setFontSize(valueFontSize);
      doc.setFont("helvetica", "bold");
      doc.text(value, startX + columnWidth + columnGap, y);

      y += lineSpacing;
    };

    // Ticket content
    addRow("Organization:", org.name);
    addRow("Location:", org.location);
    addRow("Service:", service.service_name);
    addRow("Date:", slot.formattedDate);
    addRow("Username:", formData.username);
    addRow("Email:", formData.email);
    addRow("Phone:", formData.phone);

    y += 5;

    // Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Please arrive 10 minutes before your scheduled time.",
      pageWidth / 2,
      y,
      { align: "center" }
    );

    doc.save("qless_appointment_ticket.pdf");
  };

  return (
    <div className="download-ticket-container">
      {/* Ticket Details Section */}
      <div className="confirmation-page">
        <div className="confirm-row">
          <p className="confirm-label">Organization:</p>
          <p className="confirm-value">{org.name}</p>
        </div>

        <div className="confirm-row">
          <p className="confirm-label">Location:</p>
          <p className="confirm-value">{org.location}</p>
        </div>

        <div className="confirm-row">
          <p className="confirm-label">Service:</p>
          <p className="confirm-value">{service.service_name}</p>
        </div>

        <hr />
        <br />
        <div className="confirm-row">
          <p className="confirm-label">Appointment date:</p>
          <p className="confirm-value">{slot.formattedDate}</p>
        </div>
        <div className="confirm-row">
          <p className="confirm-label">Username:</p>
          <p className="confirm-value">{formData.username}</p>
        </div>
        <div className="confirm-row">
          <p className="confirm-label">Email:</p>
          <p className="confirm-value">{formData.email}</p>
        </div>
        <div className="confirm-row">
          <p className="confirm-label">Phone Number:</p>
          <p className="confirm-value">{formData.phone}</p>
        </div>
        {/* <div className="confirm-row">
                <p className="confirm-label">Amount to pay:</p>
                <p className="confirm-value">{formData.serviceFee}</p>
              </div> */}
      </div>

      {/* Download Button to trigger PDF creation */}
      <div className="input-form-actions">
        <button
          className="submit-button"
          onClick={() => {
            generateTicketPDF({ org, service, formData, slot });
            handleDownload();
          }}
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
}
export default DownloadTicket;
