import { EventDTO } from "@/app/DTOs/EventDTO";
import axiosInstance from "../http-service";
import { Event } from "@/types/Calender";

export const createEvent = async (data: EventDTO): Promise<void> => {
  try {
    const endpoint = `/calendar`;
    const response = await axiosInstance.post(endpoint, data);
    console.log("Event created successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getEvents = async (
    tenantId: string,
    page: number,
    limit: number,
    search: string
): Promise<{ events: Event[]; total: number }> => {
  try {
    const endpoint = `/calendar`;
    const response = await axiosInstance.get(endpoint, {
      params: { tenantId, page, limit, search },
    });

    const events = response.data.events.map((event: Event & { _id: string }) => ({
      ...event,
      id: event._id
    }));

    console.log("Events returned successfully", response.data);
    return { events, total: response.data.total };
  } catch (error) {
      console.log("Error fetching events:", error);
      throw error;
  }
}

export const updateEvent = async (
  id: string,
  data: EventDTO
): Promise<Event> => {
  try {
    const endpoint = `/calendar/${id}`;
    const response = await axiosInstance.put(endpoint, data);
    console.log("Event updated successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string): Promise<void> => {
  try {
    const endpoint = `/calendar/${id}`;
    await axiosInstance.delete(endpoint);
    console.log("Event deleted successfully");
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};