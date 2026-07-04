import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatE164ToDisplay(phone: string): string {
  if (phone.startsWith('+92') && phone.length === 13) {
    return `0${phone.slice(3, 6)} ${phone.slice(6)}`;
  }
  return phone;
}