export function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}