import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function smsHref(phone: string, body?: string) {
  const number = phone.replace(/[^\d+]/g, "");
  return body
    ? `sms:${number}?body=${encodeURIComponent(body)}`
    : `sms:${number}`;
}

export function mailtoHref(email: string, subject?: string) {
  return subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
}

export function parseTrustBadges(value: string) {
  return value
    .split("|")
    .map((b) => b.trim())
    .filter(Boolean);
}
