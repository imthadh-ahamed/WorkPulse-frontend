"use client";

import React from "react";
import { useState } from "react";
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
import { DeleteFocusTimeModal } from "@/components/FocusMode/DeleteFocusModal";
import FocusTimer from "@/components/FocusMode/focus-timer";
import {
  FocusModeProvider,
  useFocusMode,
} from "@/components/FocusMode/FocusModeContext";

function FocusWorkPage() {
  const [focusSessions, setFocusSessions] =
    useState<FocusSession[]>(FocusSessions);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(
    null
  );
  const { startSession } = useFocusMode();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

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
      focusHours: 0,
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
    }
  };

  const handleStartSession = (session: FocusSession) => {
    if (!session.isRunning) {
      // Start the session globally
      startSession(session);

      // Update the session's isRunning state
      setFocusSessions((prevSessions) =>
        prevSessions.map((s) =>
          s.id === session.id ? { ...s, isRunning: true } : s
        )
      );
    }
  };

  const handleEndSession = (sessionId: string) => {
    // Update the session's isRunning state to false
    setFocusSessions((prevSessions) =>
      prevSessions.map((s) =>
        s.id === sessionId ? { ...s, isRunning: false } : s
      )
    );
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
                  Focus Hours
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
                  <TableCell>{session.focusHours} h</TableCell>
                  <TableCell>{session.description || "—"}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => handleStartSession(session)}
                      sx={{ color: "green" }}
                    >
                      {session.isRunning ? "Resume" : <Play />}
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
          rowsPerPageOptions={[8, 16, 24, 32, 40]}
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
        onSave={(session) => setFocusSessions([...focusSessions, session])}
        session={currentSession}
      />

      {/* Edit Session Modal */}
      <EditFocusTimeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(session) =>
          setFocusSessions(
            focusSessions.map((s) => (s.id === session.id ? session : s))
          )
        }
        session={currentSession}
      />

      {/* Delete Session Modal */}
      <DeleteFocusTimeModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteSession}
      />

      {/* Floating Timer */}
      <FocusTimer onEndSession={handleEndSession} />
    </Container>
  );
}

export default function App() {
  return (
    <FocusModeProvider>
      <FocusWorkPage />
    </FocusModeProvider>
  );
}
