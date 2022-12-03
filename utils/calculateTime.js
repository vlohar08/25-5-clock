const calculateTime = (seconds) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substring(14, 19);
  return timeString;
};

export default calculateTime;
