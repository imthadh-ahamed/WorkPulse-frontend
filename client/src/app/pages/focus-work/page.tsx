"use client";

import type React from "react";
import { useState } from "react";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import { Plus, Edit, Trash2, Play } from "lucide-react";
import {
  Button,
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import AddFocusTimeModal from "@/components/FocusMode/AddFocusTimeModal";
import EditFocusTimeModal from "@/components/FocusMode/EditFocusTimeModal";
import { FocusSession } from "@/types/FocusSession";
import { FocusSessions } from "@/app/data/FocusSessions";
import { useToast } from "@/components/FocusMode/hooks/use-toast";
import FocusTimer from "@/components/FocusMode/focus-timer";
import { DeleteFocusTimeModal } from "@/components/FocusMode/DeleteFocusModal";

export default function Home() {
  const [focusSessions, setFocusSessions] =
    useState<FocusSession[]>(FocusSessions);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(
    null
  );
  const [activeSession, setActiveSession] = useState<FocusSession | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddSession = () => {
    setCurrentSession({
      id: "",
      title: "",
      startTime: "",
      endTime: "",
      description: "",
      tenantId: 0,
      created: new Date(),
      createdBy: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEditSession = (session: FocusSession) => {
    setCurrentSession(session);
    setIsEditModalOpen(true);
  };

  const handleDeleteSession = (id: string) => {
    setCurrentSession(
      focusSessions.find((session) => session.id === id) || null
    );
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteSession = () => {
    if (currentSession) {
      setFocusSessions(
        focusSessions.filter((session) => session.id !== currentSession.id)
      );
      toast({
        title: "Session deleted",
        description: "The focus session has been removed from your schedule.",
      });
    }
  };

  const handleStartSession = (session: FocusSession) => {
    setActiveSession(session);
    setIsPaused(false);
    toast({
      title: "Focus session started",
      description: `${session.title} is now in progress. Stay focused!`,
    });
  };

  const handleSaveSession = (session: FocusSession) => {
    // Validation
    if (!session.title || !session.startTime || !session.endTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Check if end time is after start time
    if (isAfter(parseISO(session.startTime), parseISO(session.endTime))) {
      toast({
        title: "Invalid time range",
        description: "End time must be after start time.",
        variant: "destructive",
      });
      return;
    }

    // Check for overlapping sessions
    const hasOverlap = focusSessions.some((existingSession) => {
      if (session.id && existingSession.id === session.id) return false;

      const sessionStart = parseISO(existingSession.startTime);
      const sessionEnd = parseISO(existingSession.endTime);
      const newStart = parseISO(session.startTime);
      const newEnd = parseISO(session.endTime);

      return (
        (isAfter(newStart, sessionStart) && isBefore(newStart, sessionEnd)) ||
        (isAfter(newEnd, sessionStart) && isBefore(newEnd, sessionEnd)) ||
        (isBefore(newStart, sessionStart) && isAfter(newEnd, sessionEnd))
      );
    });

    if (hasOverlap) {
      toast({
        title: "Time conflict",
        description: "This session overlaps with an existing focus time.",
        variant: "destructive",
      });
      return;
    }

    if (session.id) {
      // Update existing session
      setFocusSessions(
        focusSessions.map((existingSession) =>
          existingSession.id === session.id ? session : existingSession
        )
      );
      toast({
        title: "Session updated",
        description: "Your focus session has been updated successfully.",
      });
    } else {
      // Add new session
      const newSession = {
        ...session,
        id: Date.now().toString(),
      };
      setFocusSessions([...focusSessions, newSession]);
      toast({
        title: "Session created",
        description: "New focus session has been added to your schedule.",
      });
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleEndSession = () => {
    setActiveSession(null);
    setIsPaused(false);
    toast({
      title: "Session ended",
      description: "Your focus session has ended. Great job!",
    });
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
          Focus Time Manager
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={handleAddSession}
        >
          Add Focus Time
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="focus time table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Time
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  Description
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {focusSessions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{session.title}</TableCell>
                  <TableCell>
                    {format(parseISO(session.startTime), "h:mm a")} -{" "}
                    {format(parseISO(session.endTime), "h:mm a")}
                  </TableCell>
                  <TableCell>{session.description || "—"}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => handleStartSession(session)}
                      sx={{ color: "green" }}
                    >
                      <Play />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleEditSession(session)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDeleteSession(session.id)}
                      sx={{ color: "red" }}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={focusSessions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Add Session Modal */}
      <AddFocusTimeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveSession}
        session={currentSession}
      />

      {/* Edit Session Modal */}
      <EditFocusTimeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveSession}
        session={currentSession}
      />

      {/* Delete Session Modal */}
      <DeleteFocusTimeModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteSession}
      />

      {/* Floating Timer */}
      {activeSession && (
        <FocusTimer
          session={activeSession}
          isPaused={isPaused}
          onPause={() => setIsPaused(!isPaused)}
          onEnd={handleEndSession}
        />
      )}
    </Container>
  );
}
