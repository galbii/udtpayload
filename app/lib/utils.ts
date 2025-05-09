import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class values into a single string,
 * merging Tailwind classes intelligently to avoid conflicts.
 * 
 * @param inputs - One or more class values (strings, objects, arrays)
 * @returns A single merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 