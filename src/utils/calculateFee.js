/**
 * Calculates parking fee based on hourly rate and duration in hours.
 * @param {number} pricePerHour - Cost per hour
 * @param {number} duration - Number of hours
 * @returns {number} Calculated total parking fee
 */
export const calculateParkingFee = (pricePerHour, duration) => {
  const rate = Number(pricePerHour) || 0;
  const hours = Number(duration) || 0;
  if (hours <= 0 || rate <= 0) return 0;
  return Math.round(rate * hours);
};

export default calculateParkingFee;
