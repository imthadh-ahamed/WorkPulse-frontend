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
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { projects } from "@/app/data/Projects";

const ITEMS_PER_PAGE = 9;

export default function ProjectManagementPage() {
  const [page, setPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedProjects = projects.slice(
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
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Project
        </Button>
      </Box>

      <Grid container spacing={4}>
        {paginatedProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Link href={`/pages/project-management/${project.id}`} passHref>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {project.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip
                      label={project.isActive ? "Active" : "Inactive"}
                      color={project.isActive ? "success" : "default"}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(projects.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}
