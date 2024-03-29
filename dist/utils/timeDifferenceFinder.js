"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timeDifferenceFinder(clockIn, clockOut) {
    // Parse clock-in and clock-out times into Date objects
    const [clockInHours, clockInMinutes] = clockIn.split(':').map(Number);
    const [clockOutHours, clockOutMinutes] = clockOut.split(':').map(Number);
    // Calculate the difference in milliseconds
    const diffMilliseconds = (new Date(0, 0, 0, clockOutHours, clockOutMinutes).getTime() - new Date(0, 0, 0, clockInHours, clockInMinutes).getTime());
    // Convert milliseconds to hours and minutes
    const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    // Format the result
    const formattedDifference = `${diffHours}:${diffMinutes}`;
    return formattedDifference;
}
exports.default = timeDifferenceFinder;
//# sourceMappingURL=timeDifferenceFinder.js.map