"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timeDifferenceFinder(clockIn, clockOut) {
    // Parse clock-in and clock-out times into Date objects
    const [clockInHours, clockInMinutes] = clockIn
        .split(":")
        .map(Number);
    const [clockOutHours, clockOutMinutes] = clockOut
        .split(":")
        .map(Number);
    // Calculate the difference in milliseconds
    const diffMilliseconds = new Date(0, 0, 0, clockOutHours, clockOutMinutes).getTime() -
        new Date(0, 0, 0, clockInHours, clockInMinutes).getTime();
    // Convert milliseconds to hours and minutes
    let diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
    let diffMinutes = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    // If the time difference is negative, add 24 hours
    if (diffHours < 0) {
        diffHours += 24;
    }
    if (diffMinutes < 0) {
        diffMinutes = -diffMinutes;
    }
    // Format the result
    const formattedDifference = `${diffHours}:${diffMinutes
        .toString()
        .padStart(2, "0")}`;
    return formattedDifference;
}
exports.default = timeDifferenceFinder;
//# sourceMappingURL=timeDifferenceFinder.js.map