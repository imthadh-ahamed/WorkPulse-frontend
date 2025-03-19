"use client";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Event as EventIcon,
  Announcement as AnnouncementIcon,
} from "@mui/icons-material";

export default function DailySummaryPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Daily Summary
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        {today}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CheckCircleIcon color="success" /> Completed Tasks
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Morning team standup"
                    secondary="9:00 AM"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Review project proposal"
                    secondary="10:30 AM"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Update weekly report"
                    secondary="11:45 AM"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <ScheduleIcon color="primary" /> Upcoming Tasks
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Client call with ABC Corp"
                    secondary="2:00 PM"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Review employee performance"
                    secondary="3:30 PM"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Prepare tomorrow's agenda"
                    secondary="4:45 PM"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <EventIcon color="secondary" /> Today&apos;s Meetings
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Department Sync"
                    secondary="1:00 PM - 1:30 PM • Conference Room A"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="Project Planning"
                    secondary="3:00 PM - 4:00 PM • Zoom Meeting"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <AnnouncementIcon color="warning" /> Important Announcements
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Office Closure"
                    secondary="The office will be closed this Friday for maintenance."
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary="New HR Policy"
                    secondary="Updated work-from-home policy is now in effect."
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
