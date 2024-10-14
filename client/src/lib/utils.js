import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import moment from 'moment';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const camelCaseToCapitalized = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (char) => char.toUpperCase());
};

export const timeAgo = (date) => {
  return moment(date).fromNow();
};