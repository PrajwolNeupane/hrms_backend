export default function timeDifferenceFinder(clockIn: string, clockOut: string): string {
    // Parse clock-in and clock-out times into Date objects
    const [clockInHours, clockInMinutes]: number[] = clockIn.split(':').map(Number);
    const [clockOutHours, clockOutMinutes]: number[] = clockOut.split(':').map(Number);

    // Calculate the difference in milliseconds
    const diffMilliseconds: number = (new Date(0, 0, 0, clockOutHours, clockOutMinutes).getTime() - new Date(0, 0, 0, clockInHours, clockInMinutes).getTime());

    // Convert milliseconds to hours and minutes
    const diffHours: number = Math.floor(diffMilliseconds / (1000 * 60 * 60));
    const diffMinutes: number = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    // Format the result
    const formattedDifference: string = `${diffHours}:${diffMinutes}`;

    return formattedDifference;
}
