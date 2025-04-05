"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Button,
  Pagination,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Announcement } from "@/types/Announcement";
import { AddAnnouncementModal } from "@/components/Announcement/AddAnnouncementModal";
import { EditAnnouncementModal } from "@/components/Announcement/EditAnnouncementModal";
import { announcements } from "@/app/data/Announcement";
import { DeleteAnnouncementModal } from "@/components/Announcement/DeleteAnnouncementModal";

export default function AnnouncementsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [announcementList, setAnnouncementList] = useState(announcements);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const announcementsPerPage = 4;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleAddAnnouncement = (newAnnouncement: Omit<Announcement, "id">) => {
    const newId = announcementList.length + 1;
    const announcementWithId = { id: newId, ...newAnnouncement };
    setAnnouncementList([...announcementList, announcementWithId]);
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

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcementList.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

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

      <Grid container spacing={3}>
        {currentAnnouncements.map((announcement) => (
          <Grid item xs={12} key={announcement.id}>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Pagination
          count={Math.ceil(announcementList.length / announcementsPerPage)}
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
