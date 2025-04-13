import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
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
import { MoreVerticalIcon } from "lucide-react";
import { useState } from "react";
import { Event } from "@/types/Calender";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const generateCalendarDays = (currentDate: Date, eventsList: Event[]) => {
  const days = [];
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const month = date.getMonth();

  const firstDay = date.getDay();
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: "", date: null });
  }

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

export default function CalendarUI({
  currentDate,
  setCurrentDate,
  eventsList,
  setIsAddEventModalOpen,
  setIsEditEventModalOpen,
  setIsDeleteEventModalOpen,
  setEventToEdit,
  setEventToDelete,
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  eventsPerPage,
}: Readonly<{
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  eventsList: Event[];
  setIsAddEventModalOpen: (open: boolean) => void;
  setIsEditEventModalOpen: (open: boolean) => void;
  setIsDeleteEventModalOpen: (open: boolean) => void;
  setEventToEdit: (event: Event) => void;
  setEventToDelete: (event: Event) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  eventsPerPage: number;
}>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const calendarDays = generateCalendarDays(currentDate, eventsList);

  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const upcomingEvents = eventsList
    .filter((event) => new Date(event.start) >= new Date())
    .filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const totalPages = Math.ceil(upcomingEvents.length / eventsPerPage);
  const paginatedEvents = upcomingEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    eventId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedEventId(eventId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEventId(null);
  };

  return (
    <>
      {/* Header + Button */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight="bold">
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
        {/* Calendar Left */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Button
                  startIcon={<ChevronLeftIcon />}
                  onClick={() =>
                    setCurrentDate(
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() - 1,
                        1
                      )
                    )
                  }
                >
                  Previous
                </Button>
                <Typography variant="h6">{currentMonth}</Typography>
                <Button
                  endIcon={<ChevronRightIcon />}
                  onClick={() =>
                    setCurrentDate(
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() + 1,
                        1
                      )
                    )
                  }
                >
                  Next
                </Button>
              </Box>

              <Grid container>
                {weekdays.map((day) => (
                  <Grid item xs={12 / 7} key={day} textAlign="center">
                    <Typography variant="subtitle2">{day}</Typography>
                  </Grid>
                ))}
                {calendarDays.map((day, index) => (
                  <Grid
                    item
                    xs={12 / 7}
                    key={index}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      height: 100,
                      p: 1,
                    }}
                  >
                    {day.day && (
                      <>
                        <Typography variant="body2">{day.day}</Typography>
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
                                onClick={() => {
                                  setEventToEdit(event);
                                  setIsEditEventModalOpen(true);
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

        {/* Upcoming Events Right */}
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Upcoming Events</Typography>
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
                      <>
                        <Button
                          onClick={(e) => handleMenuOpen(e, event.id)}
                          size="small"
                        >
                          <MoreVerticalIcon />
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={
                            Boolean(anchorEl) && selectedEventId === event.id
                          }
                          onClose={handleMenuClose}
                        >
                          <MenuItem
                            onClick={() => {
                              handleMenuClose();
                              setEventToEdit(event);
                              setIsEditEventModalOpen(true);
                            }}
                          >
                            <EditIcon fontSize="small" /> Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleMenuClose();
                              setEventToDelete(event);
                              setIsDeleteEventModalOpen(true);
                            }}
                          >
                            <DeleteIcon fontSize="small" color="error" /> Delete
                          </MenuItem>
                        </Menu>
                      </>
                    }
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={new Date(event.start).toLocaleString()}
                    />
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>

            <Box display="flex" justifyContent="space-between" p={2}>
              <Button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon /> Prev
              </Button>
              <Typography>
                Page {currentPage} of {totalPages}
              </Typography>
              <Button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next <ChevronRightIcon />
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
