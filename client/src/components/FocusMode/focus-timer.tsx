"use client";
import { useState, useEffect } from "react";
import { differenceInSeconds, parseISO, format } from "date-fns";
import { Button, Card, CardContent } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import { Clock, X } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";

type FocusSession = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
};

interface FocusTimerProps {
  session: FocusSession;
  isPaused: boolean;
  onPause: () => void;
  onEnd: () => void;
}

export default function FocusTimer({
  session,
  isPaused,
  onPause,
  onEnd,
}: FocusTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const totalDuration = differenceInSeconds(
    parseISO(session.endTime),
    parseISO(session.startTime)
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = new Date();
      const end = parseISO(session.endTime);
      const secondsLeft = differenceInSeconds(end, now);

      if (secondsLeft <= 0) {
        clearInterval(interval);
        setTimeRemaining(0);
        setProgress(100);
        onEnd();
        return;
      }

      setTimeRemaining(secondsLeft);
      setProgress(((totalDuration - secondsLeft) / totalDuration) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [session, isPaused, totalDuration, onEnd]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours > 0 ? `${hours}:` : ""}${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
        isMinimized ? "w-16 h-16" : "w-80"
      }`}
    >
      {isMinimized ? (
        <Button
          className="w-16 h-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => setIsMinimized(false)}
        >
          <Clock className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="shadow-lg border-2 border-primary/20 animate-fadeIn">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium truncate pr-2">{session.title}</h3>
              <div className="flex items-center gap-1">
                <Button
                  variant="outlined"
                  size="small"
                  className="h-7 w-7"
                  onClick={() => setIsMinimized(true)}
                >
                  <span className="sr-only">Minimize</span>
                  <span className="h-1 w-4 bg-current rounded-full"></span>
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className="h-7 w-7 text-destructive hover:text-destructive/90"
                  onClick={onEnd}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">End Session</span>
                </Button>
              </div>
            </div>

            <div className="text-center mb-3">
              <div className="text-3xl font-bold mb-1">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-xs text-muted-foreground">
                {format(parseISO(session.startTime), "h:mm a")} -{" "}
                {format(parseISO(session.endTime), "h:mm a")}
              </div>
            </div>

            <Progress value={progress} className="h-2 mb-4" />

            <div className="flex justify-center">
              <Button
                variant="outlined"
                size="small"
                className={`transition-all duration-300 ${
                  isPaused
                    ? "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400"
                }`}
                onClick={onPause}
              >
                {isPaused ? (
                  <>
                    <PlayArrow className="mr-1 h-3.5 w-3.5" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="mr-1 h-3.5 w-3.5" />
                    Pause
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
