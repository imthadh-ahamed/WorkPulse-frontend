"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Button,
  Divider,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
} from "@mui/icons-material";

interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
}

// Sample announcements data
const announcements: Announcement[] = [
  {
    id: 1,
    title: "Company Picnic",
    content:
      "Join us for the annual company picnic this Saturday! We'll have food, games, and activities for everyone. Families are welcome to attend.",
    author: "HR Department",
    date: "2023-09-10",
    category: "Event",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    title: "New Project Kickoff",
    content:
      "We're excited to announce the kickoff of our new project next week. Details will be shared in the upcoming team meeting.",
    author: "Project Management",
    date: "2023-09-08",
    category: "Project",
    likes: 15,
    comments: 5,
  },
  {
    id: 3,
    title: "Office Renovation",
    content:
      "The office renovation will begin next month. During this time, some teams will be temporarily relocated. More information will be provided soon.",
    author: "Facilities Management",
    date: "2023-09-05",
    category: "Facilities",
    likes: 10,
    comments: 12,
  },
  {
    id: 4,
    title: "New Health Benefits",
    content:
      "We're pleased to announce new health benefits for all employees starting next quarter. Check your email for details about the updated coverage.",
    author: "Benefits Team",
    date: "2023-09-01",
    category: "Benefits",
    likes: 32,
    comments: 7,
  },
];

export default function AnnouncementsPage() {
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
        <Button variant="contained" startIcon={<AddIcon />}>
          New Announcement
        </Button>
      </Box>

      <Grid container spacing={3}>
        {announcements.map((announcement) => (
          <Grid item xs={12} key={announcement.id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      alt={announcement.author}
                      src={`/placeholder.svg?height=40&width=40`}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {announcement.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(announcement.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip label={announcement.category} size="small" />
                </Box>

                <Typography variant="h6" gutterBottom>
                  {announcement.title}
                </Typography>

                <Typography variant="body1" paragraph>
                  {announcement.content}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button startIcon={<ThumbUpIcon />} size="small">
                      {announcement.likes}
                    </Button>
                    <Button startIcon={<CommentIcon />} size="small">
                      {announcement.comments}
                    </Button>
                  </Box>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
