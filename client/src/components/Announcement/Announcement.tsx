"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Grid,
  Button,
  Pagination,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Announcement } from "@/types/Announcement";
import { AddAnnouncementModal } from "@/components/Announcement/AddAnnouncementModal";
import { EditAnnouncementModal } from "@/components/Announcement/EditAnnouncementModal";
import { DeleteAnnouncementModal } from "@/components/Announcement/DeleteAnnouncementModal";
import { getAnnouncements } from "@/app/services/Announcement/announcement.service";

export function Announcements() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const announcementsPerPage = 3;

  // Fetch announcements from the backend
  const fetchAnnouncements = async (page: number) => {
    setLoading(true);
    try {
      const response = await getAnnouncements(page, announcementsPerPage);
      setAnnouncementList(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements(currentPage);
  }, [currentPage]);

  const handleChangePage = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleAddAnnouncement = () => {
    setIsAddModalOpen(false);
  };

  const handleEditAnnouncement = (updatedAnnouncement: Announcement) => {
    const updatedList = announcementList.map((announcement) =>
      announcement.id === updatedAnnouncement.id
        ? updatedAnnouncement
        : announcement
    );
    setAnnouncementList(updatedList);
    setIsEditModalOpen(false);
  };

  const handleDeleteAnnouncement = () => {
    if (selectedAnnouncement) {
      const updatedList = announcementList.filter(
        (announcement) => announcement.id !== selectedAnnouncement.id
      );
      setAnnouncementList(updatedList);
      setIsDeleteModalOpen(false);
      setSelectedAnnouncement(null);
    }
  };

  const handleOpenEditModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteModalOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Announcements
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAddModalOpen(true)}
        >
          New Announcement
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {announcementList.map((announcement) => (
            <Grid item xs={12} key={`announcement-${announcement.id || Math.random()}`}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {announcement.title}
                    </Typography>
                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEditModal(announcement)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: "red" }}
                        onClick={() => handleOpenDeleteModal(announcement)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {announcement.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      <AddAnnouncementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddAnnouncement}
      />

      {selectedAnnouncement && (
        <EditAnnouncementModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditAnnouncement}
          announcement={selectedAnnouncement}
        />
      )}

      {selectedAnnouncement && (
        <DeleteAnnouncementModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteAnnouncement}
        />
      )}
    </Container>
  );
}
