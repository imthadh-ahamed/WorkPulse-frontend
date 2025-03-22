import { notFound } from "next/navigation";
import { Box, Typography, Container } from "@mui/material";
import { projects } from "@/app/data/Projects";
import DashboardPage from "@/components/dashboard-page";

export default async function ProjectTaskManagementPage({
  params,
}: {
  readonly params: { projectId: string };
}) {
  const projectId = await params.projectId;
  const project = projects.find((p) => p.id === Number(projectId));

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
        <DashboardPage />
      </Box>
    </Container>
  );
}
