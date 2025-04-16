"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Container,
} from "@mui/material";

export default function DashboardPage() {
  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Announcements Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Announcements" />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Company Picnic
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Join us for the annual company picnic this Saturday!
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  New Project Kickoff
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We&apos;re starting a new project next week. Details to
                  follow.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tasks Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Tasks" />
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Complete Q3 Report
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Due: 2023-09-30
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Client Meeting Preparation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Due: 2023-09-15
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Productivity Analysis Card */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="AI-Predictive Productivity Analysis" />
            <CardContent>
              <Typography variant="h2" component="div" fontWeight="bold">
                85
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your productivity score (0-100)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
