/**
 * Formats an ISO date string into a more readable format
 * @param dateString ISO date string (e.g. "2023-05-15T14:30:00Z")
 * @returns Formatted date string (e.g. "May 15, 2023")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
} 