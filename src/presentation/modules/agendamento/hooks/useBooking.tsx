import { useState, useCallback } from "react";
import {
  Service,
  Professional,
  Appointment,
  professionals,
  generateAvailability,
  TimeSlot,
} from "@/presentation/modules/agendamento/data/mock";

export type BookingStep = "services" | "professional" | "datetime" | "confirm" | "success";

interface BookingState {
  step: BookingStep;
  selectedService: Service | null;
  selectedProfessional: Professional | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  customerName: string;
  customerPhone: string;
  appointments: Appointment[];
  viewingAppointment: Appointment | null;
}

export function useBooking() {
  const [state, setState] = useState<BookingState>({
    step: "services",
    selectedService: null,
    selectedProfessional: null,
    selectedDate: null,
    selectedTime: null,
    customerName: "",
    customerPhone: "",
    appointments: [],
    viewingAppointment: null,
  });

  const selectService = useCallback((service: Service) => {
    setState((s) => ({
      ...s,
      selectedService: service,
      selectedProfessional: null,
      step: "professional",
      selectedDate: null,
      selectedTime: null,
    }));
  }, []);

  const selectProfessional = useCallback((professional: Professional | null) => {
    const pro = professional || professionals[Math.floor(Math.random() * professionals.length)];
    setState((s) => ({
      ...s,
      selectedProfessional: pro,
      step: "datetime",
    }));
  }, []);

  const selectDate = useCallback((date: Date) => {
    setState((s) => ({ ...s, selectedDate: date, selectedTime: null }));
  }, []);

  const selectTime = useCallback((time: string) => {
    setState((s) => ({ ...s, selectedTime: time, step: "confirm" }));
  }, []);

  const getTimeSlots = useCallback((): TimeSlot[] => {
    if (!state.selectedService || !state.selectedDate) return [];
    return generateAvailability(state.selectedService.duration, state.selectedDate);
  }, [state.selectedService, state.selectedDate]);

  const setCustomerInfo = useCallback(
    (name: string, phone: string) => {
      setState((s) => ({ ...s, customerName: name, customerPhone: phone }));
    },
    []
  );

  const confirmBooking = useCallback(() => {
    if (
      !state.selectedService ||
      !state.selectedProfessional ||
      !state.selectedDate ||
      !state.selectedTime
    )
      return;

    const appointment: Appointment = {
      id: `apt-${Date.now()}`,
      service: state.selectedService,
      professional: state.selectedProfessional,
      date: state.selectedDate.toISOString().split("T")[0],
      time: state.selectedTime,
      customerName: state.customerName,
      customerPhone: state.customerPhone,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    setState((s) => ({
      ...s,
      appointments: [...s.appointments, appointment],
      step: "success",
      viewingAppointment: appointment,
    }));
  }, [state]);

  const cancelAppointment = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      appointments: s.appointments.map((a) =>
        a.id === id ? { ...a, status: "cancelled" as const } : a
      ),
      viewingAppointment: s.viewingAppointment?.id === id
        ? { ...s.viewingAppointment, status: "cancelled" as const }
        : s.viewingAppointment,
    }));
  }, []);

  const reset = useCallback(() => {
    setState((s) => ({
      ...s,
      step: "services",
      selectedService: null,
      selectedProfessional: null,
      selectedDate: null,
      selectedTime: null,
      customerName: "",
      customerPhone: "",
      viewingAppointment: null,
    }));
  }, []);

  const goBack = useCallback(() => {
    setState((s) => {
      const steps: BookingStep[] = ["services", "professional", "datetime", "confirm"];
      const idx = steps.indexOf(s.step);
      if (idx <= 0) return s;
      return { ...s, step: steps[idx - 1] };
    });
  }, []);

  const viewAppointment = useCallback((apt: Appointment | null) => {
    setState((s) => ({ ...s, viewingAppointment: apt }));
  }, []);

  return {
    ...state,
    selectService,
    selectProfessional,
    selectDate,
    selectTime,
    getTimeSlots,
    setCustomerInfo,
    confirmBooking,
    cancelAppointment,
    reset,
    goBack,
    viewAppointment,
  };
}
