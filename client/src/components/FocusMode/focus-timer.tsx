"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { useFocusMode } from "@/components/FocusMode/FocusModeContext";
import { Remove, PlayArrow, Pause } from "@mui/icons-material";

interface FocusTimerProps {
  onEndSession: (sessionId: string) => void;
}

const FocusTimer: React.FC<FocusTimerProps> = ({ onEndSession }) => {
  const {
    activeSession,
    isPaused,
    isToastVisible,
    isMinimized,
    pauseSession,
    endSession: originalEndSession,
    minimizeToast,
    restoreToast,
  } = useFocusMode();

  const endSession = React.useCallback(() => {
    if (activeSession) {
      originalEndSession();
    }
  }, [activeSession, originalEndSession]);
  const [remainingTime, setRemainingTime] = useState<string>("");

  useEffect(() => {
    if (!activeSession || !activeSession.endTime) return;

    const calculateRemainingTime = () => {
      const endTime = new Date(activeSession.endTime ?? 0).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        endSession(); // End the session if time is up
        onEndSession(activeSession.id); // Update isRunning to false
        setRemainingTime("00:00:00");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setRemainingTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    // Update the remaining time every second
    const interval = setInterval(() => {
      if (!isPaused) {
        calculateRemainingTime();
      }
    }, 1000);

    // Cleanup the interval on component unmount or when the session ends
    return () => clearInterval(interval);
  }, [activeSession, isPaused, endSession, onEndSession]);

  if (!activeSession || (!isToastVisible && !isMinimized)) return null;

  return isMinimized ? (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 60,
        height: 60,
        backgroundColor: "primary.main",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 3,
        cursor: "pointer",
        zIndex: 1400,
      }}
      onClick={restoreToast}
    >
      <Typography variant="h6" color="white">
        {remainingTime}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        backgroundColor: "white",
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
        zIndex: 1400,
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {activeSession.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Minimize Icon */}
          <IconButton
            size="small"
            onClick={minimizeToast}
            sx={{ color: "gray" }}
          >
            <Remove />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="body2">
        Focus Duration: {activeSession.focusHours} hour(s)
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mt: 1, color: "primary.main" }}
      >
        {remainingTime}
      </Typography>
      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          color={isPaused ? "primary" : "warning"}
          onClick={pauseSession}
          startIcon={isPaused ? <PlayArrow /> : <Pause />}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            endSession();
            if (activeSession) onEndSession(activeSession.id);
          }}
        >
          End
        </Button>
      </Box>
    </Box>
  );
};

export default FocusTimer;
