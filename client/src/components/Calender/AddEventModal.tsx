"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Box,
  IconButton,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Close as CloseIcon } from "@mui/icons-material";
import { EventDTO } from "@/app/DTOs/EventDTO";
import { useSelector } from "react-redux";
import { Employee } from "@/types/Employee";
import { useState } from "react";
import { RootState } from "@/app/redux/store";
import { createEvent } from "@/app/services/Calendar/calendar.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<EventDTO, "id">) => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .max(100, "Title can't exceed 100 characters")
    .required("Title is required"),
  start: Yup.date().required("Start date and time are required"),
  end: Yup.date()
    .min(Yup.ref("start"), "End date and time must be after the start")
    .required("End date and time are required"),
  location: Yup.string().max(200, "Location can't exceed 200 characters"),
  description: Yup.string().max(500, "Description can't exceed 500 characters"),
  type: Yup.string()
    .oneOf(["meeting", "event", "deadline"], "Invalid type")
    .required("Type is required"),
  repeat: Yup.string().oneOf(
    ["once", "daily", "weekly", "monthly", "yearly"],
    "Invalid repeat option"
  ),
  repeatEndDate: Yup.date().when("repeat", {
    is: (repeat: string) => repeat !== "once",
    then: (schema) =>
      schema.min(
        Yup.ref("end"),
        "Repeat end date must be after the event end date"
      ),
  }),
});

export function AddEventModal({ isOpen, onClose, onSave }: Readonly<AddEventModalProps>) {
  const [loading, setLoading] = useState(false);
  const user = useSelector(
        (state: RootState) => state.user.userData
      ) as Employee | null;

  const handleSave = async (values: EventDTO) => {
    setLoading(true);
    try {
      const event = {
        tenantId: user?.tenantId ?? "",
        title: values.title,
        start: new Date(values.start),
        end: new Date(values.end),
        location: values.location,
        description: values.description,
        type: values.type,
        repeat: values.repeat,
        repeatEndDate: values.repeatEndDate ? new Date(values.repeatEndDate) : undefined,
      };
      await createEvent(event);
      toast.success("Event created successfully!");
      onSave(event);
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }

  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        Add Event
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            tenantId: user?.tenantId ?? "",
            title: "",
            start: new Date(),
            end: new Date(),
            location: "",
            description: "",
            type: "meeting",
            repeat: "once",
            repeatEndDate: new Date(),
          }}
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
                      label="Title"
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
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      name="start"
                      as={TextField}
                      label="Start Date & Time"
                      type="datetime-local"
                      fullWidth
                      value={values.start || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.start && Boolean(errors.start)}
                      helperText={<ErrorMessage name="start" />}
                      InputLabelProps={{ shrink: true }}
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
                  <Grid item xs={12} sm={6}>
                    <Field
                      required
                      name="end"
                      as={TextField}
                      label="End Date & Time"
                      type="datetime-local"
                      fullWidth
                      value={values.end || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.end && Boolean(errors.end)}
                      helperText={<ErrorMessage name="end" />}
                      InputLabelProps={{ shrink: true }}
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
                      name="location"
                      as={TextField}
                      label="Location"
                      fullWidth
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.location && Boolean(errors.location)}
                      helperText={<ErrorMessage name="location" />}
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
                      name="description"
                      as={TextField}
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
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
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="type"
                      as={TextField}
                      select
                      label="Type"
                      fullWidth
                      value={values.type || "event"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.type && Boolean(errors.type)}
                      helperText={<ErrorMessage name="type" />}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "1.1rem",
                          color: "#333",
                        },
                      }}
                    >
                      <MenuItem value="meeting">Meeting</MenuItem>
                      <MenuItem value="event">Event</MenuItem>
                      <MenuItem value="deadline">Deadline</MenuItem>
                    </Field>
                  </Grid>
                  {values.type !== "deadline" && (
                    <>
                      <Grid item xs={12}>
                        <Field
                          name="repeat"
                          as={TextField}
                          select
                          label="Repeat"
                          fullWidth
                          value={values.repeat ?? "once"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.repeat && Boolean(errors.repeat)}
                          helperText={<ErrorMessage name="repeat" />}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "1.1rem",
                              color: "#333",
                            },
                          }}
                        >
                          <MenuItem value="once">Once</MenuItem>
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                          <MenuItem value="monthly">Monthly</MenuItem>
                          <MenuItem value="yearly">Yearly</MenuItem>
                        </Field>
                      </Grid>
                      {values.repeat !== "once" && (
                        <Grid item xs={12}>
                          <Field
                            name="repeatEndDate"
                            as={TextField}
                            label="Repeat End Date"
                            type="date"
                            fullWidth
                            value={values.repeatEndDate || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.repeatEndDate &&
                              Boolean(errors.repeatEndDate)
                            }
                            helperText={<ErrorMessage name="repeatEndDate" />}
                            InputLabelProps={{ shrink: true }}
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
                      )}
                    </>
                  )}
                </Grid>
              </Box>
              <DialogActions sx={{ mt: 2, justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClose}
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
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
}

