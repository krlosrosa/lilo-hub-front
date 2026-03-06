import { addDays, format } from "date-fns";

export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  description: string;
  icon: string;
  category: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviewCount: number;
}

export interface TimeSlot {
  time: string; // "HH:mm"
  available: boolean;
}

export interface Appointment {
  id: string;
  service: Service;
  professional: Professional;
  date: string; // "yyyy-MM-dd"
  time: string; // "HH:mm"
  customerName: string;
  customerPhone: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

export const business = {
  name: "Studio Essence",
  tagline: "Beleza & Bem-estar",
  address: "Rua das Flores, 420 — Centro, São Paulo",
  phone: "(11) 99876-5432",
  hours: "Seg–Sáb, 9h–20h",
};

export const services: Service[] = [
  {
    id: "s1",
    name: "Corte Feminino",
    duration: 45,
    price: 89,
    description: "Corte moderno com lavagem e finalização",
    icon: "✂️",
    category: "Cabelo",
  },
  {
    id: "s2",
    name: "Corte Masculino",
    duration: 30,
    price: 55,
    description: "Corte clássico ou moderno com acabamento",
    icon: "💈",
    category: "Cabelo",
  },
  {
    id: "s3",
    name: "Coloração",
    duration: 120,
    price: 180,
    description: "Coloração completa com produtos premium",
    icon: "🎨",
    category: "Cabelo",
  },
  {
    id: "s4",
    name: "Manicure & Pedicure",
    duration: 60,
    price: 75,
    description: "Cuidado completo para mãos e pés",
    icon: "💅",
    category: "Unhas",
  },
  {
    id: "s5",
    name: "Massagem Relaxante",
    duration: 60,
    price: 120,
    description: "Massagem corporal para alívio de tensões",
    icon: "🧘",
    category: "Bem-estar",
  },
  {
    id: "s6",
    name: "Limpeza de Pele",
    duration: 90,
    price: 150,
    description: "Limpeza profunda com hidratação facial",
    icon: "✨",
    category: "Estética",
  },
  {
    id: "s7",
    name: "Barba",
    duration: 20,
    price: 35,
    description: "Barba modelada com toalha quente",
    icon: "🪒",
    category: "Cabelo",
  },
  {
    id: "s8",
    name: "Sobrancelha",
    duration: 15,
    price: 25,
    description: "Design e modelagem de sobrancelha",
    icon: "👁️",
    category: "Estética",
  },
];

export const professionals: Professional[] = [
  {
    id: "p1",
    name: "Ana Costa",
    specialty: "Hair Stylist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=b6e3f4",
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: "p2",
    name: "Lucas Silva",
    specialty: "Barbeiro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas&backgroundColor=c0aede",
    rating: 4.8,
    reviewCount: 98,
  },
  {
    id: "p3",
    name: "Marina Santos",
    specialty: "Esteticista",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marina&backgroundColor=ffd5dc",
    rating: 4.7,
    reviewCount: 85,
  },
  {
    id: "p4",
    name: "Rafael Oliveira",
    specialty: "Massoterapeuta",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael&backgroundColor=d1d4f9",
    rating: 5.0,
    reviewCount: 64,
  },
];

// Generate realistic availability for the next 14 days
export function generateAvailability(
  serviceDuration: number,
  date: Date
): TimeSlot[] {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0) return []; // Sunday closed

  const startHour = 9;
  const endHour = 20;
  const slots: TimeSlot[] = [];
  const slotInterval = 30; // 30-minute intervals

  // Seed random based on date for consistency
  const dateStr = format(date, "yyyy-MM-dd");
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed += dateStr.charCodeAt(i);
  }

  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += slotInterval) {
      // Check if service fits before closing
      const slotEnd = hour * 60 + min + serviceDuration;
      if (slotEnd > endHour * 60) continue;

      const timeStr = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;

      // Simulate some slots being taken (deterministic based on date+time)
      const hash = (seed * (hour + 1) * (min + 1)) % 100;
      const isLunchTime = hour === 12 || hour === 13;
      const isPeakHour = hour >= 17 && hour <= 19;

      let available = true;
      if (isLunchTime && hash < 60) available = false;
      else if (isPeakHour && hash < 50) available = false;
      else if (hash < 25) available = false;

      slots.push({ time: timeStr, available });
    }
  }

  return slots;
}

// Generate next available dates
export function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = addDays(today, i);
    if (date.getDay() !== 0) {
      dates.push(date);
    }
  }
  return dates;
}
