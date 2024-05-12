export default function formatDate(date: Date) {
  // Array of weekday names
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Array of month names
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Get the day of the week (0-6) and month (0-11) from the date
  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];

  // Get the day of the month
  const day = date.getDate();

  // Get the year
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${weekday}, ${month} ${day} ${year}`;

  return formattedDate;
}
