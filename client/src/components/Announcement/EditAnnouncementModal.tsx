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
  CircularProgress,
} from "@mui/material";
import { Announcement } from "@/types/Announcement";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";
import { updateAnnouncement } from "@/app/services/Announcement/announcement.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EditAnnouncementModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (announcement: Announcement) => void;
  readonly announcement: Announcement;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .max(100, "Title can't exceed 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .max(500, "Description can't exceed 500 characters")
    .required("Description is required"),
});

export function EditAnnouncementModal({
  isOpen,
  onClose,
  onSave,
  announcement,
}: EditAnnouncementModalProps) {

  const [loading, setLoading] = useState(false);

    const handleSave = async (values: {
      title: string;
      description: string;
    }) => {
      setLoading(true);
      try {
        const updatedAnnouncement = await updateAnnouncement(
          announcement._id ?? "",
          values
        );
        toast.success("Announcement updated successfully!");
        onSave(updatedAnnouncement);
        onClose();
      } catch (error) {
        console.error("Error updating announcement:", error);
        toast.error("Failed to update announcement. Please try again.");
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
        Edit Announcement
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            title: announcement.title,
            description: announcement.description,
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
                  <Grid item xs={12}>
                    <Field
                      required
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
                  {loading ? "Updating..." : "Update"}
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
