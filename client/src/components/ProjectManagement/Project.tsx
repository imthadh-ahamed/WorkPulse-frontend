"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { AddProjectModal } from "@/components/ProjectManagement/AddProjectModel"; // Import Add modal
import { EditProjectModal } from "@/components/ProjectManagement/EditProjectModel"; // Import Edit modal
import { DeleteProjectConfirmationModal } from "@/components/ProjectManagement/DeleteConfirmationModel"; // Import Delete modal
import type { Project } from "@/types/Projects";
import { PlusCircle } from "lucide-react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/app/services/Project/project.service";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Employee } from "@/types/Employee";

const ITEMS_PER_PAGE = 9;

export default function ProjectManagementPage() {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for Delete modal
  const [projectList, setProjectList] = useState<Project[] | null>([]); // State for projects
  const [editingProject, setEditingProject] = useState<Project | null>(null); // State for editing
  const [deletingProject, setDeletingProject] = useState<Project | null>(null); // State for deleting

  const user = useSelector(
    (state: RootState) => state.user.userData
  ) as Employee | null;

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

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId); // Convert projectId to string
      setProjectList(
        (prevProjects) =>
          (prevProjects || []).filter((project) => project.id !== projectId) // Ensure consistent types
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
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
      handleDeleteProject(deletingProject.id); // Ensure deletingProject.id is passed as a number
      setDeletingProject(null); // Reset deleting project
    }
  };

  const handleSaveProject = async (
    newProject: Omit<
      Project,
      "id" | "created" | "createdBy" | "modified" | "modifiedBy"
    >
  ) => {
    try {
      const createdProject = await createProject({
        ...newProject,
        tenantId: user?.tenantId || "null",
        createdBy: "currentUserId",
      });
      setProjectList((prevProjects) => [
        ...(prevProjects || []),
        createdProject,
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    try {
      const project = await updateProject(updatedProject.id, updatedProject);
      setProjectList((prevProjects) =>
        (prevProjects || []).map((p) => (p.id === project.id ? project : p))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const paginatedProjects = React.useMemo(() => {
    return (projectList || []).slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  }, [projectList, page]);

  const fetchProjects = React.useCallback(async () => {
    try {
      const response = await getProjects(
        user?.tenantId ?? "null",
        page,
        ITEMS_PER_PAGE
      );
      console.log("Fetched Projects Response:", response);
      setProjectList(response.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, [user?.tenantId, page]);

  useEffect(() => {
    fetchProjects();
    console.log(paginatedProjects, "paginatedProjects");
  }, [fetchProjects]);

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
          startIcon={<PlusCircle />}
          onClick={handleAddProject} // Open Add modal on click
        >
          Add Project
        </Button>
      </Box>

      {projectList && projectList.length === 0 ? (
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
                    <Link href={`/pages/projects/${project.id}`} passHref>
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
              count={Math.ceil((projectList?.length ?? 0) / ITEMS_PER_PAGE)}
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
        currentUser="currentUserId" // Replace with the actual current user ID
        employees={[]} // Pass an empty array or the appropriate employees list
      />

      {/* EditProjectModal */}
      {editingProject && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleUpdateProject}
          project={editingProject} // Pass the project to edit
          employees={[]} // Pass an empty array or the appropriate employees list
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