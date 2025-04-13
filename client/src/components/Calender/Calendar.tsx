"use client";

import { useState } from "react";
import { Container } from "@mui/material";
import { events as initialEvents } from "@/app/data/Calender";
import { AddEventModal } from "@/components/Calender/AddEventModal";
import { EditEventModal } from "@/components/Calender/EditEventModal";
import { DeleteEventModal } from "@/components/Calender/DeleteEventModal";
import { Event } from "@/types/Calender";
import CalendarUI from "@/components/Calender/CalendarUI";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventsList, setEventsList] = useState(initialEvents);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const eventsPerPage = 7;

  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    setEventsList((prev) => [...prev, { ...newEvent, id: Date.now() }]);
    setIsAddEventModalOpen(false);
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEventsList((prev) =>
      prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    setIsEditEventModalOpen(false);
  };

  const handleDeleteEvent = () => {
    if (eventToDelete) {
      setEventsList((prev) =>
        prev.filter((event) => event.id !== eventToDelete.id)
      );
      setEventToDelete(null);
    }
    setIsDeleteEventModalOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <CalendarUI
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        eventsList={eventsList}
        setIsAddEventModalOpen={setIsAddEventModalOpen}
        setIsEditEventModalOpen={setIsEditEventModalOpen}
        setIsDeleteEventModalOpen={setIsDeleteEventModalOpen}
        setEventToEdit={setEventToEdit}
        setEventToDelete={setEventToDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        eventsPerPage={eventsPerPage}
      />

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onSave={handleAddEvent}
      />

      {eventToEdit && (
        <EditEventModal
          isOpen={isEditEventModalOpen}
          onClose={() => setIsEditEventModalOpen(false)}
          onSave={handleEditEvent}
          event={eventToEdit}
        />
      )}

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
