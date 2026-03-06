"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CalendarCheck, MapPin, Phone as PhoneIcon } from "lucide-react";
import { business } from "@/presentation/modules/agendamento/data/mock";
import ServiceList from "@/presentation/modules/agendamento/components/serviceList";
import DateTimePicker from "@/presentation/modules/agendamento/components/data-timer-pick";
import ConfirmStep from "@/presentation/modules/agendamento/components/confirm-step";
import ProfessionalPicker from "@/presentation/modules/agendamento/components/profissionaPicker";
import SuccessScreen from "@/presentation/modules/agendamento/components/sucessStreen";
import AppointmentList from "@/presentation/modules/agendamento/components/appointment";
import { Button } from "@/presentation/shared/components/ui/button";
import { useBooking } from "../hooks/useBooking";

type View = "booking" | "appointments";

const AgendamentoView = () => {
  const booking = useBooking();
  const [view, setView] = useState<View>("booking");

  const stepTitles: Record<string, string> = {
    services: "Escolha o serviço",
    professional: "Escolha o profissional",
    datetime: "Data e horário",
    confirm: "Confirmar",
    success: "",
  };

  const showBackButton =
    (view === "booking" && booking.step !== "services" && booking.step !== "success") ||
    view === "appointments";

  const handleBack = () => {
    if (view === "appointments") {
      setView("booking");
      return;
    }
    booking.goBack();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-3">
          {/* Business info bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleBack}
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform"
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
              )}
              <div>
                <h1 className="text-lg font-bold tracking-tight">
                  {business.name}
                </h1>
                <p className="text-[11px] text-muted-foreground">
                  {business.tagline}
                </p>
              </div>
            </div>
            <Button
              variant={view === "appointments" ? "default" : "outline"}
              size="sm"
              className="rounded-full h-9 text-xs font-semibold gap-1.5"
              onClick={() => {
                if (view === "appointments") {
                  setView("booking");
                  booking.reset();
                } else {
                  setView("appointments");
                }
              }}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              {view === "appointments" ? "Agendar" : "Meus horários"}
              {booking.appointments.filter((a) => a.status === "confirmed")
                .length > 0 &&
                view !== "appointments" && (
                  <span className="ml-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {
                      booking.appointments.filter(
                        (a) => a.status === "confirmed"
                      ).length
                    }
                  </span>
                )}
            </Button>
          </div>

          {/* Step indicator */}
          {view === "booking" && booking.step !== "success" && (
            <div className="mt-3 flex items-center gap-2">
              {["services", "professional", "datetime", "confirm"].map((s, i) => {
                const steps = ["services", "professional", "datetime", "confirm"];
                const currentIdx = steps.indexOf(booking.step);
                const isActive = i <= currentIdx;
                return (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      isActive ? "bg-primary" : "bg-muted"
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-5 pb-8">
        {view === "booking" && booking.step !== "success" && (
          <motion.h2
            key={booking.step}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold mb-5"
          >
            {stepTitles[booking.step]}
          </motion.h2>
        )}

        <AnimatePresence mode="wait">
          {view === "appointments" ? (
            <motion.div
              key="appointments"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-5">Meus agendamentos</h2>
              <AppointmentList
                appointments={booking.appointments}
                onCancel={booking.cancelAppointment}
                onBack={() => {
                  setView("booking");
                  booking.reset();
                }}
              />
            </motion.div>
          ) : (
            <>
              {booking.step === "services" && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ServiceList onSelect={booking.selectService} />
                </motion.div>
              )}

              {booking.step === "professional" && (
                <motion.div
                  key="professional"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProfessionalPicker onSelect={booking.selectProfessional} />
                </motion.div>
              )}

              {booking.step === "datetime" && booking.selectedService && (
                <DateTimePicker
                  key="datetime"
                  service={booking.selectedService}
                  selectedDate={booking.selectedDate}
                  selectedTime={booking.selectedTime}
                  onSelectDate={booking.selectDate}
                  onSelectTime={booking.selectTime}
                  onBack={booking.goBack}
                />
              )}

              {booking.step === "confirm" &&
                booking.selectedService &&
                booking.selectedProfessional &&
                booking.selectedDate && (
                  <ConfirmStep
                    key="confirm"
                    service={booking.selectedService}
                    professional={booking.selectedProfessional}
                    date={booking.selectedDate}
                    time={booking.selectedTime!}
                    customerName={booking.customerName}
                    customerPhone={booking.customerPhone}
                    onSetCustomerInfo={booking.setCustomerInfo}
                    onConfirm={booking.confirmBooking}
                    onBack={booking.goBack}
                  />
                )}

              {booking.step === "success" && booking.viewingAppointment && (
                <SuccessScreen
                  key="success"
                  appointment={booking.viewingAppointment}
                  onNewBooking={() => {
                    booking.reset();
                  }}
                  onViewAppointments={() => {
                    setView("appointments");
                  }}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Footer info */}
      {view === "booking" && booking.step === "services" && (
        <footer className="px-4 py-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{business.address}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <PhoneIcon className="w-3 h-3 flex-shrink-0" />
            <span>{business.phone} · {business.hours}</span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default AgendamentoView;
