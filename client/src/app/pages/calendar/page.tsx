"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  location: string;
  type: "meeting" | "event" | "deadline";
}

// Sample events data
const events: Event[] = [
  {
    id: 1,
    title: "Team Meeting",
    start: "2023-09-15T10:00",
    end: "2023-09-15T11:00",
    location: "Conference Room A",
    type: "meeting",
  },
  {
    id: 2,
    title: "Project Deadline",
    start: "2023-09-20T17:00",
    end: "2023-09-20T17:00",
    location: "",
    type: "deadline",
  },
  {
    id: 3,
    title: "Client Presentation",
    start: "2023-09-18T14:00",
    end: "2023-09-18T15:30",
    location: "Zoom Meeting",
    type: "meeting",
  },
  {
    id: 4,
    title: "Company Picnic",
    start: "2023-09-23T12:00",
    end: "2023-09-23T16:00",
    location: "Central Park",
    type: "event",
  },
];

// Generate calendar days
const generateCalendarDays = () => {
  const days = [];
  const date = new Date(2023, 8, 1); // September 2023
  const month = date.getMonth();

  // Add empty cells for days before the 1st of the month
  const firstDay = new Date(2023, 8, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: "", date: null });
  }

  // Add days of the month
  while (date.getMonth() === month) {
    days.push({
      day: date.getDate(),
      date: new Date(date),
      events: events.filter((event) => {
        const eventDate = new Date(event.start);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      }),
    });
    date.setDate(date.getDate() + 1);
  }

  return days;
};

const calendarDays = generateCalendarDays();
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [currentMonth] = useState("September 2023");

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Calendar
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Event
        </Button>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Button startIcon={<ChevronLeftIcon />}>Previous</Button>
            <Typography variant="h6">{currentMonth}</Typography>
            <Button endIcon={<ChevronRightIcon />}>Next</Button>
          </Box>

          <Grid
            container
            spacing={0}
            sx={{ border: "1px solid", borderColor: "divider" }}
          >
            {/* Weekday headers */}
            {weekdays.map((day) => (
              <Grid
                item
                xs={12 / 7}
                key={day}
                sx={{
                  p: 1,
                  textAlign: "center",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="subtitle2">{day}</Typography>
              </Grid>
            ))}

            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <Grid
                item
                xs={12 / 7}
                key={index}
                sx={{
                  height: 120,
                  p: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor:
                    day.day === 15 ? "action.selected" : "background.paper",
                }}
              >
                {day.day && (
                  <>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {day.day}
                    </Typography>
                    <Box sx={{ overflow: "hidden" }}>
                      {day.events?.map((event) => (
                        <Box
                          key={event.id}
                          sx={{
                            p: 0.5,
                            mb: 0.5,
                            borderRadius: 1,
                            backgroundColor:
                              event.type === "meeting"
                                ? "primary.light"
                                : event.type === "event"
                                ? "success.light"
                                : "warning.light",
                            fontSize: "0.75rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {event.title}
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Upcoming Events
      </Typography>
      <Paper>
        <List>
          {events.map((event) => (
            <Box key={event.id}>
              <ListItem>
                <ListItemText
                  primary={event.title}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {new Date(event.start).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                        {event.end !== event.start &&
                          ` - ${new Date(event.end).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                            }
                          )}`}
                      </Typography>
                      {event.location && ` • ${event.location}`}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
