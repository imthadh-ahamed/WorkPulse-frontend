"use client";

import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { Tenant } from "@/types/Tenants";

interface TenantPdfGeneratorProps {
  tenantDetails: Tenant;
}

export default function TenantPdfGenerator({
  tenantDetails,
}: TenantPdfGeneratorProps) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Tenant Details Report", 14, 20);

    // Add table
    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Company Name", tenantDetails.companyName],
        ["Email", tenantDetails.email],
        ["Phone", tenantDetails.phone || "N/A"],
        ["Address", tenantDetails.address || "N/A"],
        ["City", tenantDetails.city || "N/A"],
        ["State", tenantDetails.state || "N/A"],
        ["Country", tenantDetails.country || "N/A"],
        ["Postal Code", tenantDetails.postalCode || "N/A"],
        ["Industry", tenantDetails.industry || "N/A"],
        ["Number of Employees", tenantDetails.numberOfEmployees || "N/A"],
        ["Website URL", tenantDetails.websiteUrl || "N/A"],
        ["Subscription", tenantDetails.subscription],
        ["Created By", tenantDetails.createdBy],
        ["Created Date", tenantDetails.created.toLocaleDateString()],
        ["Modified By", tenantDetails.modifiedBy || "N/A"],
        [
          "Modified Date",
          tenantDetails.modified?.toLocaleDateString() || "N/A",
        ],
      ],
    });

    // Save the PDF
    doc.save("Tenant_Details_Report.pdf");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      onClick={generatePDF}
      sx={{ textTransform: "none" }}
    >
      Download PDF
    </Button>
  );
}
