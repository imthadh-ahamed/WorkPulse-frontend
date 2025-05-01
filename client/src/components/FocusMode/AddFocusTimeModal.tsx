"use client";

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { FocusSession } from "@/types/FocusSession";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Close as CloseIcon } from "@mui/icons-material";
import { createFocusMode } from "@/app/services/FocusMode/focusmode.service";

interface FocusTimeModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (session: FocusSession) => void;
  readonly session: FocusSession | null;
  readonly resetForm: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Session title is required"),
  focusHours: Yup.number().required("Focus hours are required"),
  description: Yup.string(),
});

export default function FocusTimeModal({
  isOpen,
  onClose,
  onSave,
  session,
  resetForm,
}: FocusTimeModalProps) {
  const initialValues: FocusSession = session || {
    id: "",
    title: "",
    focusHours: 0,
    description: "",
    tenantId: 0,
    created: new Date(),
    createdBy: "",
  };

  const handleSave = async (values: FocusSession) => {
    try {
      const newFocusSession = await createFocusMode(values);
      onSave(newFocusSession);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating focus session:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        {initialValues.id ? "Edit Focus Session" : "Create Focus Session"}
        <IconButton edge="end" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Field
                    required
                    name="title"
                    as={TextField}
                    label="Session Title"
                    fullWidth
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={<ErrorMessage name="title" />}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "1.1rem",
                        color: "#333",
                      },
                    }}
                  />
                  <Field
                    required
                    name="focusHours"
                    as={TextField}
                    type="number"
                    inputProps={{ step: "0.1" }}
                    label="Focus Hours"
                    fullWidth
                    value={values.focusHours}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.focusHours && Boolean(errors.focusHours)}
                    helperText={<ErrorMessage name="focusHours" />}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "1.1rem",
                        color: "#333",
                      },
                      mt: 2,
                    }}
                  />
                  <Field
                    name="description"
                    as={TextField}
                    label="Description (Optional)"
                    fullWidth
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={<ErrorMessage name="description" />}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: "1.1rem",
                        color: "#333",
                      },
                      mt: 2,
                    }}
                  />
                </Box>
              </Box>
              <DialogActions sx={{ mt: 2, justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={onClose}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: "8px 16px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    padding: "8px 16px",
                  }}
                >
                  {initialValues.id ? "Save Changes" : "Create Session"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
