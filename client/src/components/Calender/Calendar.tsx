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
  Tooltip,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { events as initialEvents } from "@/app/data/Calender";
import { AddEventModal } from "@/components/Calender/AddEventModal";
import { EditEventModal } from "@/components/Calender/EditEventModal";
import { DeleteEventModal } from "@/components/Calender/DeleteEventModal";
import { Event } from "@/types/Calender";
import { MoreVerticalIcon } from "lucide-react";

const generateCalendarDays = (currentDate: Date, eventsList: Event[]) => {
  const days = [];
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const month = date.getMonth();

  // Add empty cells for days before the 1st of the month
  const firstDay = date.getDay();
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: "", date: null });
  }

  // Add days of the month
  while (date.getMonth() === month) {
    days.push({
      day: date.getDate(),
      date: new Date(date),
      events: eventsList.filter((event) => {
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

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventsList, setEventsList] = useState(initialEvents); // Manage events state
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Menu anchor state
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null); // Selected event ID for menu
  const eventsPerPage = 7; // Number of events per page

  const calendarDays = generateCalendarDays(currentDate, eventsList);

  const handleAddEvent = () => {
    setIsAddEventModalOpen(false);
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEventsList((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setIsEditEventModalOpen(false);
  };

  const handleEditClick = (event: Event) => {
    setEventToEdit(event);
    setIsEditEventModalOpen(true);
  };

  const handleDeleteEvent = () => {
    if (eventToDelete) {
      setEventsList((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventToDelete.id)
      );
      setEventToDelete(null);
    }
  };

  const handleDeleteClick = (event: Event) => {
    setEventToDelete(event);
    setIsDeleteEventModalOpen(true);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Pagination and search logic for upcoming events
  const upcomingEvents = eventsList
    .toSorted((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .filter((event) => new Date(event.start) >= new Date())
    .filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    ); // Filter by search query

  const totalPages = Math.ceil(upcomingEvents.length / eventsPerPage);
  const paginatedEvents = upcomingEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    eventId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedEventId(eventId); // Set the selected event ID
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEventId(null); // Clear the selected event ID
  };

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
          Calendar
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAddEventModalOpen(true)}
        >
          Add Event
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column: Calendar */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Button
                  startIcon={<ChevronLeftIcon />}
                  onClick={handlePreviousMonth}
                >
                  Previous
                </Button>
                <Typography variant="h6">{currentMonth}</Typography>
                <Button
                  endIcon={<ChevronRightIcon />}
                  onClick={handleNextMonth}
                >
                  Next
                </Button>
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
                      height: 100,
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
                            <Tooltip
                              key={event.id}
                              title={
                                <>
                                  <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                  >
                                    {event.title}
                                  </Typography>
                                  <Typography variant="body2">
                                    {new Date(event.start).toLocaleString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                      }
                                    )}
                                    {event.end !== event.start &&
                                      ` - ${new Date(
                                        event.end
                                      ).toLocaleTimeString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                      })}`}
                                  </Typography>
                                  {event.location && (
                                    <Typography variant="body2">
                                      Location: {event.location}
                                    </Typography>
                                  )}
                                  {event.description && (
                                    <Typography variant="body2">
                                      {event.description}
                                    </Typography>
                                  )}
                                </>
                              }
                              arrow
                            >
                              <Box
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
                                  cursor: "pointer",
                                }}
                              >
                                {event.title}
                              </Box>
                            </Tooltip>
                          ))}
                        </Box>
                      </>
                    )}
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Upcoming Events */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              position: "relative",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                "&:hover .search-bar": {
                  width: "200px",
                  opacity: 1,
                  pointerEvents: "auto",
                },
              }}
            >
              <SearchIcon sx={{ cursor: "pointer" }} />
              <TextField
                className="search-bar"
                variant="outlined"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  style: { borderRadius: "8px" },
                }}
                size="small"
                sx={{
                  width: "0px",
                  opacity: 0,
                  pointerEvents: "none",
                  transition: "width 0.3s ease, opacity 0.3s ease",
                  ml: 1,
                }}
              />
            </Box>
          </Box>
          <Paper>
            <List>
              {paginatedEvents.map((event) => (
                <Box key={event.id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <Button
                          size="small"
                          onClick={(e) => handleMenuOpen(e, event.id)}
                        >
                          <MoreVerticalIcon />
                        </Button>
                        <Menu
                          id={`menu-${event.id}`}
                          anchorEl={anchorEl}
                          open={
                            Boolean(anchorEl) && selectedEventId === event.id
                          }
                          onClose={handleMenuClose}
                          PaperProps={{
                            elevation: 3,
                            sx: {
                              borderRadius: 2,
                              minWidth: 150,
                              backgroundColor: "background.paper",
                              boxShadow:
                                "0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.1)",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              handleMenuClose();
                              handleEditClick(event); // Open EditEventModal
                            }}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              "&:hover": {
                                backgroundColor: "action.hover",
                              },
                            }}
                          >
                            <EditIcon fontSize="small" sx={{ color: "blue" }} />
                            <Typography
                              variant="body2"
                              color="text.primary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              Edit
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleMenuClose();
                              handleDeleteClick(event); // Open DeleteEventModal
                            }}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              "&:hover": {
                                backgroundColor: "action.hover",
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" color="error" />
                            <Typography
                              variant="body2"
                              color="text.primary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              Delete
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                    }
                  >
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              <Button
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
                startIcon={<ChevronLeftIcon />}
              >
                Previous
              </Button>
              <Typography>
                Page {currentPage} of {totalPages}
              </Typography>
              <Button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                endIcon={<ChevronRightIcon />}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* AddEventModal */}
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onSave={handleAddEvent}
      />

      {/* EditEventModal */}
      {eventToEdit && (
        <EditEventModal
          isOpen={isEditEventModalOpen}
          onClose={() => setIsEditEventModalOpen(false)}
          onSave={handleEditEvent}
          event={eventToEdit}
        />
      )}

      {/* DeleteEventModal */}
      {eventToDelete && (
        <DeleteEventModal
          isOpen={isDeleteEventModalOpen}
          onClose={() => setIsDeleteEventModalOpen(false)}
          onConfirm={handleDeleteEvent}
        />
      )}
    </Container>
  );
}
