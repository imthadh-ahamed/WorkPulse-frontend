"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Grid,
  Chip,
  Button,
  Pagination,
  CardActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { projects } from "@/app/data/Projects";
import { AddProjectModal } from "@/components/ProjectManagement/AddProjectModel"; // Import Add modal
import { EditProjectModal } from "@/components/ProjectManagement/EditProjectModel"; // Import Edit modal
import { DeleteProjectConfirmationModal } from "@/components/ProjectManagement/DeleteConfirmationModel"; // Import Delete modal
import type { Project } from "@/types/Projects";
import { Employees } from "@/app/data/Employee";

const ITEMS_PER_PAGE = 9;

export default function ProjectManagementPage() {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for Delete modal
  const [projectList, setProjectList] = useState(projects); // State for projects
  const [editingProject, setEditingProject] = useState<Project | null>(null); // State for editing
  const [deletingProject, setDeletingProject] = useState<Project | null>(null); // State for deleting

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleAddProject = () => {
    setEditingProject(null); // Reset editing state
    setIsAddModalOpen(true); // Open the Add modal
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project); // Set the project to edit
    setIsEditModalOpen(true); // Open the Edit modal
  };

  const handleDeleteProject = (projectId: number) => {
    setProjectList((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    ); // Remove the project from the list
  };

  const handleOpenDeleteModal = (project: Project) => {
    setDeletingProject(project); // Set the project to delete
    setIsDeleteModalOpen(true); // Open the Delete modal
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false); // Close the Add modal
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // Close the Edit modal
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the Delete modal
  };

  const handleConfirmDelete = () => {
    if (deletingProject) {
      handleDeleteProject(deletingProject.id); // Delete the project
      setDeletingProject(null); // Reset deleting project
    }
  };

  const handleSaveProject = (
    newProject: Omit<
      Project,
      "id" | "created" | "createdBy" | "modified" | "modifiedBy"
    >
  ) => {
    if (editingProject) {
      // Update existing project
      setProjectList((prevProjects) =>
        prevProjects.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                ...newProject,
                modified: new Date(),
                modifiedBy: "currentUserId", // Replace with actual user ID
              }
            : project
        )
      );
    } else {
      // Add new project
      setProjectList((prevProjects) => [
        ...prevProjects,
        {
          ...newProject,
          id: prevProjects.length + 1,
          created: new Date(),
          createdBy: "currentUserId", // Replace with actual user ID
          modified: new Date(),
          modifiedBy: "currentUserId", // Replace with actual user ID
        },
      ]);
    }
    setIsAddModalOpen(false); // Close the Add modal after saving
  };

  const handleUpdateProject = (updatedProject: Project) => {
    // Update the project in the list
    setProjectList((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    setIsEditModalOpen(false); // Close the Edit modal after saving
  };

  const paginatedProjects = projectList.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
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
          Project Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddProject} // Open Add modal on click
        >
          Add Project
        </Button>
      </Box>

      {projectList.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          No projects available. Click &quot;Add Project&quot; to create a new
          project.
        </Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {paginatedProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card>
                  <CardContent>
                    <Link
                      href={`/pages/project-management/${project.id}`}
                      passHref
                    >
                      <Typography variant="h5" component="div">
                        {project.name}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                    <CardActions
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <Chip
                        label={project.isActive ? "Active" : "Inactive"}
                        color={project.isActive ? "success" : "default"}
                      />
                      <Box>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditProject(project)} // Open Edit modal on click
                          sx={{
                            minWidth: "auto", // Remove extra padding
                            padding: "6px", // Adjust padding for a compact look
                          }}
                        />
                        <Button
                          size="small"
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => handleOpenDeleteModal(project)} // Open Delete modal on click
                          sx={{
                            minWidth: "auto", // Remove extra padding
                            padding: "6px", // Adjust padding for a compact look
                          }}
                        />
                      </Box>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(projectList.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}

      {/* AddProjectModal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveProject}
        employees={Employees} // Pass the list of employees here
        currentUser="currentUserId" // Replace with the actual current user ID
      />

      {/* EditProjectModal */}
      {editingProject && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleUpdateProject}
          project={editingProject} // Pass the project to edit
          employees={Employees} // Pass the list of employees here
          currentUser="currentUserId" // Replace with the actual current user ID
        />
      )}

      {/* DeleteProjectConfirmationModal */}
      {deletingProject && (
        <DeleteProjectConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          projectName={deletingProject.name} // Pass the project name
        />
      )}
    </Container>
  );
}
