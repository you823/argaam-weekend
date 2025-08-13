// Format date as "17 Jul, 2025"
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Return { days, hours } difference
export function getTimeDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMs = end - start;

  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return { days, hours };
}