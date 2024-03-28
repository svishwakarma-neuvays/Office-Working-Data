const epochTime1 = 1702301400000;  // first epoch time
const epochTime2 = 1702301905094;  // second epoch time

// Calculate the difference in milliseconds
const timeDifferenceInMilliseconds = epochTime2 - epochTime1;

// Convert milliseconds to hours
const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

console.log('Time Difference in Hours:', timeDifferenceInHours);
