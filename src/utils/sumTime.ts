function sumTime(time1: string, time2: string): string {
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);
  let totalHours = hours1 + hours2;
  let totalMinutes = minutes1 + minutes2;
  if (totalMinutes >= 60) {
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
  }
  const formattedHours = totalHours.toString().padStart(2, "0");
  const formattedMinutes = totalMinutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}

export default sumTime;
