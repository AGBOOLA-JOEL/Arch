export const formatDate = (inputDate: string) => {
  const dateObject = new Date(inputDate);

  if (isNaN(dateObject.getTime())) {
    return "Invalid Date";
  }

  const formattedDay = dateObject.getDate().toString().padStart(2, "0");
  const formattedMonth = (dateObject.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const formattedYear = dateObject
    .getFullYear()
    .toString()
    .slice(-2)
    .padStart(2, "0");

  const formattedDate = `${formattedDay} - ${formattedMonth} - ${formattedYear}`;
  return formattedDate;
};
