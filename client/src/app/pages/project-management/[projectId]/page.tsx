import { notFound } from "next/navigation";
import { Box, Typography, Container } from "@mui/material";
import { projects } from "@/app/data/Projects";

export default function ProjectTaskManagementPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = projects.find((p) => p.id === Number(params.projectId));

  if (!project) {
    return notFound(); // This will show Next.js' built-in 404 page
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {project.name} Task Management
        </Typography>
        {/* Add your task management content here */}
      </Box>
    </Container>
  );
}
