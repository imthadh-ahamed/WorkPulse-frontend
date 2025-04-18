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
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useState } from "react";
import { Employee } from "@/types/Employee";
import { createAnnouncement } from "@/app/services/Announcement/announcement.service";
import { toast } from "react-toastify";

interface AddAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (announcement: Omit<Announcement, "id">) => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .max(100, "Title can't exceed 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .max(500, "Description can't exceed 500 characters")
    .required("Description is required"),
});

export function AddAnnouncementModal({
  isOpen,
  onClose,
  onSave,
}: Readonly<AddAnnouncementModalProps>) {
  const [loading, setLoading] = useState(false);
  const user = useSelector(
      (state: RootState) => state.user.userData
    ) as Employee | null;
  const handleSave = async (values: { title: string; description: string }) => {
    setLoading(true);
    try {
      const announcement = {
        tenantId: user?.tenantId ?? "",
        title: values.title,
        description: values.description,
        created: new Date(),
        createdBy: user?.id ?? "",
      };
      await createAnnouncement(announcement);
      toast.success("Announcement created successfully!");
      onSave(announcement);
      onClose();
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Failed to create announcement. Please try again.");
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
        Add Announcement
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            title: "",
            description: "",
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
                  {loading ? "Saving..." : "Save"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
