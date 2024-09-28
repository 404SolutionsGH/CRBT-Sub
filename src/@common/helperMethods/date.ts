export const getCurrentDateYYMMDD=()=>{
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const getNextDate = (currentDate: string, interval: "monthly" | "yearly") => {
  // Parse the input date string
  const date = new Date(currentDate);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format. Please use 'yyyy-mm-dd'.");
  }

  // Update the date based on the interval
  if (interval === "monthly") {
    date.setMonth(date.getMonth() + 1); // Increment by 1 month
  } else if (interval === "yearly") {
    date.setFullYear(date.getFullYear() + 1); // Increment by 1 year
  }

  // Format the updated date back to "yyyy-mm-dd"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};