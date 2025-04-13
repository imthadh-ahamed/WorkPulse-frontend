import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  TextField,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface UpcomingEventsProps {
  readonly paginatedEvents: ReadonlyArray<{
    readonly id: number;
    readonly title: string;
    readonly start: Date;
    readonly end: Date;
    readonly location?: string;
  }>;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly searchQuery: string;
  readonly setSearchQuery: (query: string) => void;
  readonly handlePreviousPage: () => void;
  readonly handleNextPage: () => void;
  readonly handleEditClick: (event: {
    readonly id: number;
    readonly title: string;
    readonly start: Date;
    readonly end: Date;
    readonly location?: string;
  }) => void;
  readonly handleDeleteClick: (event: {
    readonly id: number;
    readonly title: string;
    readonly start: Date;
    readonly end: Date;
    readonly location?: string;
  }) => void;
}

export function UpcomingEvents({
  paginatedEvents,
  currentPage,
  totalPages,
  searchQuery,
  setSearchQuery,
  handlePreviousPage,
  handleNextPage,
  handleEditClick,
  handleDeleteClick,
}: UpcomingEventsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
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
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Upcoming Events
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon sx={{ cursor: "pointer" }} />
          <TextField
            variant="outlined"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{
              ml: 1,
              width: "200px",
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
                  <Button
                    onClick={(e) => handleMenuOpen(e, event.id)}
                    size="small"
                  >
                    Options
                  </Button>
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
      <Menu
        id={`menu-${selectedEventId}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && selectedEventId !== null}
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
            const event = paginatedEvents.find((e) => e.id === selectedEventId);
            if (event) handleEditClick(event);
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
            const event = paginatedEvents.find((e) => e.id === selectedEventId);
            if (event) handleDeleteClick(event);
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
    </Grid>
  );
}
