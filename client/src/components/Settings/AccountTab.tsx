"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Tenant } from "@/types/Tenants";
import { sampleTenant } from "@/app/data/Tenant"; // Import the sample tenant data
import TenantPdfGenerator from "./TenantPdfGenerator";

interface AccountTabProps {
  tenant?: Tenant; // Make tenant optional to use sampleTenant as default
  isAdmin: boolean;
}

export default function AccountTab({
  tenant = sampleTenant,
  isAdmin,
}: AccountTabProps) {
  const [editable, setEditable] = useState(false);
  const [tenantDetails, setTenantDetails] = useState(tenant);

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleChange = (field: keyof Tenant, value: string | number | null) => {
    setTenantDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved tenant details:", tenantDetails);
    setEditable(false);
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
      <CardContent>
        <Grid container spacing={3}>
          {/* Company Name */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Company Name
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                size="small"
              />
            ) : (
              <Typography variant="body1">
                {tenantDetails.companyName}
              </Typography>
            )}
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Email
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.email}
                onChange={(e) => handleChange("email", e.target.value)}
                size="small"
              />
            ) : (
              <Typography variant="body1">{tenantDetails.email}</Typography>
            )}
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Phone
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                size="small"
              />
            ) : (
              <Typography variant="body1">
                {tenantDetails.phone || "N/A"}
              </Typography>
            )}
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Address
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                size="small"
              />
            ) : (
              <Typography variant="body1">
                {tenantDetails.address || "N/A"}
              </Typography>
            )}
          </Grid>

          {/* City */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              City
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                size="small"
              />
            ) : (
              <Typography variant="body1">
                {tenantDetails.city || "N/A"}
              </Typography>
            )}
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              State
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
                size="small"
              />
            ) : (
              <Typography variant="body1">
                {tenantDetails.state || "N/A"}
              </Typography>
            )}
          </Grid>

          {/* Country */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Country
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.country || ""}
                onChange={(e) => handleChange("country", e.target.value)}
                size="small"
              />
            ) : (
              <Typography variant="body1">
                {tenantDetails.country || "N/A"}
              </Typography>
            )}
          </Grid>

          {/* Postal Code */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Postal Code
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.postalCode || ""}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                size="small"
              />
            ) : (
              <Typography variant="body1">
                {tenantDetails.postalCode || "N/A"}
              </Typography>
            )}
          </Grid>

          {/* Industry */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Industry
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.industry || ""}
                onChange={(e) => handleChange("industry", e.target.value)}
                size="small"
              />
            ) : (
              <Typography variant="body1">
                {tenantDetails.industry || "N/A"}
              </Typography>
            )}
          </Grid>

          {/* Number of Employees */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Number of Employees
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.numberOfEmployees || ""}
                onChange={(e) =>
                  handleChange("numberOfEmployees", Number(e.target.value))
                }
                size="small"
                type="number"
              />
            ) : (
              <Typography variant="body1">
                {tenantDetails.numberOfEmployees || "N/A"}
              </Typography>
            )}
          </Grid>

          {/* Website URL */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Website URL
            </Typography>
            {editable ? (
              <TextField
                fullWidth
                value={tenantDetails.websiteUrl || ""}
                onChange={(e) => handleChange("websiteUrl", e.target.value)}
                size="small"
              />
            ) : (
              <Typography variant="body1">
                {tenantDetails.websiteUrl || "N/A"}
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* Action Buttons */}
        {isAdmin && (
          <Box
            sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button
              variant="outlined"
              onClick={handleEditToggle}
              sx={{ textTransform: "none" }}
            >
              {editable ? "Cancel" : "Edit"}
            </Button>
            {editable && (
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{ textTransform: "none" }}
              >
                Save
              </Button>
            )}
            <TenantPdfGenerator tenantDetails={tenantDetails} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
