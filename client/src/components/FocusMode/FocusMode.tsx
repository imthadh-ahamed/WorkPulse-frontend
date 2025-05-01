"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import AddFocusTimeModal from "@/components/FocusMode/AddFocusTimeModal";
import EditFocusTimeModal from "@/components/FocusMode/EditFocusTimeModal";
import { FocusSession } from "@/types/FocusSession";
import { DeleteFocusTimeModal } from "@/components/FocusMode/DeleteFocusModal";
import FocusTimer from "@/components/FocusMode/focus-timer";
import {
  FocusModeProvider,
  useFocusMode,
} from "@/components/FocusMode/FocusModeContext";
import { getFocusModes } from "@/app/services/FocusMode/focusmode.service";

function FocusWorkPage() {
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(
    null
  );
  const { startSession } = useFocusMode();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    const fetchFocusModes = async () => {
      setLoading(true);
      try {
        const data = await getFocusModes();
        setFocusSessions(data);
      } catch (error) {
        console.error("Error fetching focus modes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFocusModes();
  }, []);

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
      _id: "",
      title: "",
      focusHours: 0,
      description: "",
      tenantId: "",
      created: new Date(),
      createdBy: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEditSession = (session: FocusSession) => {
    setCurrentSession(session);
    setIsEditModalOpen(true);
  };

  const handleDeleteSession = (_id: string) => {
    setCurrentSession(
      focusSessions.find((session) => session._id === _id) || null
    );
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteSession = () => {
    if (currentSession) {
      setFocusSessions(
        focusSessions.filter((session) => session._id !== currentSession._id)
      );
    }
  };

  const handleStartSession = (session_id: string) => {
    const session = focusSessions.find((s) => s._id === session_id);
    if (session) {
      startSession(session);
    }
    setFocusSessions((prevSessions) =>
      prevSessions.map((session) =>
        session._id === session_id
          ? { ...session, isRunning: true }
          : { ...session, isRunning: false }
      )
    );
  };

  const handleEndSession = (session_id: string) => {
    setFocusSessions((prevSessions) =>
      prevSessions.map((session) =>
        session._id === session_id ? { ...session, isRunning: false } : session
      )
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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

      {focusSessions.length === 0 ? (
        <Typography variant="body1">No focus modes available.</Typography>
      ) : (
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
                .map((session, index) => (
                  <TableRow key={`${session._id}-${index}`}>
                    <TableCell>{session.title}</TableCell>
                    <TableCell>{session.focusHours} h</TableCell>
                    <TableCell>{session.description || "—"}</TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        onClick={() => handleStartSession(session._id)}
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
                        onClick={() => handleDeleteSession(session._id)}
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
      )}

      {/* Add Session Modal */}
      <AddFocusTimeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(session) => setFocusSessions([...focusSessions, session])}
        session={currentSession}
        resetForm={() => {}}
      />

      {/* Edit Session Modal */}
      <EditFocusTimeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(session) =>
          setFocusSessions(
            focusSessions.map((s) => (s._id === session._id ? session : s))
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
