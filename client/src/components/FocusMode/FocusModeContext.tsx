"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FocusSession } from "@/types/FocusSession";

interface FocusModeContextProps {
  activeSession: FocusSession | null;
  isPaused: boolean;
  isToastVisible: boolean;
  isMinimized: boolean;
  startSession: (session: FocusSession) => void;
  pauseSession: () => void;
  endSession: () => void;
  hideToast: () => void;
  minimizeToast: () => void;
  restoreToast: () => void;
}

const FocusModeContext = createContext<FocusModeContextProps | undefined>(
  undefined
);

export const FocusModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeSession, setActiveSession] = useState<FocusSession | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Restore state from localStorage on load
  useEffect(() => {
    const storedSession = localStorage.getItem("activeSession");
    const storedToastVisibility = localStorage.getItem("isToastVisible");
    const storedMinimizedState = localStorage.getItem("isMinimized");
    const storedPausedState = localStorage.getItem("isPaused");
    if (storedSession) {
      setActiveSession(JSON.parse(storedSession));
    }
    if (storedToastVisibility) {
      setIsToastVisible(JSON.parse(storedToastVisibility));
    }
    if (storedMinimizedState) {
      setIsMinimized(JSON.parse(storedMinimizedState));
    }
    if (storedPausedState) {
      setIsPaused(JSON.parse(storedPausedState));
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (activeSession) {
      localStorage.setItem("activeSession", JSON.stringify(activeSession));
    } else {
      localStorage.removeItem("activeSession");
    }
    localStorage.setItem("isToastVisible", JSON.stringify(isToastVisible));
    localStorage.setItem("isMinimized", JSON.stringify(isMinimized));
    localStorage.setItem("isPaused", JSON.stringify(isPaused));
  }, [activeSession, isToastVisible, isMinimized, isPaused]);

  const startSession = (session: FocusSession) => {
    const now = new Date();
    const endTime = new Date(
      now.getTime() + session.focusHours * 60 * 60 * 1000 // Calculate end time based on focusHours
    );
    setActiveSession({
      ...session,
      endTime: endTime.toISOString(),
      isRunning: true,
    });
    setIsPaused(false);
    setIsToastVisible(true); // Show the toast when a session starts
    setIsMinimized(false); // Ensure the toast is not minimized
  };

  const pauseSession = () => {
    setIsPaused((prev) => !prev);
  };

  const endSession = React.useCallback(() => {
    if (activeSession) {
      setActiveSession((prevSession) =>
        prevSession ? { ...prevSession, isRunning: false } : null
      ); // Set isRunning to false
    }
    setIsPaused(false);
    setIsToastVisible(false); // Hide the toast when the session ends
    setIsMinimized(false); // Reset minimized state
  }, [activeSession]);

  const hideToast = () => {
    setIsToastVisible(false); // Hide the toast without ending the session
  };

  const minimizeToast = () => {
    setIsMinimized(true); // Minimize the toast
  };

  const restoreToast = () => {
    setIsMinimized(false); // Restore the toast
  };

  const contextValue = React.useMemo(
    () => ({
      activeSession,
      isPaused,
      isToastVisible,
      isMinimized,
      startSession,
      pauseSession,
      endSession,
      hideToast,
      minimizeToast,
      restoreToast,
    }),
    [activeSession, isPaused, isToastVisible, isMinimized, endSession]
  );

  return (
    <FocusModeContext.Provider value={contextValue}>
      {children}
    </FocusModeContext.Provider>
  );
};

export const useFocusMode = () => {
  const context = useContext(FocusModeContext);
  if (!context) {
    throw new Error("useFocusMode must be used within a FocusModeProvider");
  }
  return context;
};
