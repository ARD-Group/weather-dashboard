export function formatDate(timestamp: string | number | Date): string {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function timeAgo(timestamp: string | number | Date): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else {
    return `${minutes}m ago`;
  }
}

export function secondsToHHMMSS(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours.toFixed(0)).padStart(2, '0');
  const formattedMinutes = String(minutes.toFixed(0)).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds.toFixed(0)).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function formatTimestamp(timestamp: number | string): { time: string; day: string } {
  const date = new Date(typeof timestamp === 'string' ? Date.parse(timestamp) : timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const timeString = `${formattedHours}:${formattedMinutes}${ampm}`;

  const now = new Date();
  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

  const dayString = isToday ? 'Today' : `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  return { time: timeString, day: dayString };
}
