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

export const fullFormatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(formattedDate);
};

export const formatTime = (timeString: any) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
  };

  const formattedTime = new Date(timeString);
  return new Intl.DateTimeFormat("en-US", options).format(formattedTime);
};
