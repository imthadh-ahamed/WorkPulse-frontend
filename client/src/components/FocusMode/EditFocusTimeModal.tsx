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
  Grid,
  IconButton,
} from "@mui/material";
import { FocusSession } from "@/types/FocusSession";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Close as CloseIcon } from "@mui/icons-material";

interface EditFocusTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: FocusSession) => void;
  session: FocusSession | null;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Session title is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  description: Yup.string(),
});

export default function EditFocusTimeModal({
  isOpen,
  onClose,
  onSave,
  session,
}: EditFocusTimeModalProps) {
  const initialValues: FocusSession = session || {
    id: "",
    title: "",
    startTime: "",
    endTime: "",
    description: "",
    tenantId: 0,
    created: new Date(),
    createdBy: "",
  };

  const handleSave = (values: FocusSession) => {
    onSave(values);
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
        Edit Focus Session
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      name="startTime"
                      as={TextField}
                      type="datetime-local"
                      label="Start Time"
                      fullWidth
                      value={values.startTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.startTime && Boolean(errors.startTime)}
                      helperText={<ErrorMessage name="startTime" />}
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
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      required
                      name="endTime"
                      as={TextField}
                      type="datetime-local"
                      label="End Time"
                      fullWidth
                      value={values.endTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.endTime && Boolean(errors.endTime)}
                      helperText={<ErrorMessage name="endTime" />}
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
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
                </Grid>
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
                  Save Changes
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
