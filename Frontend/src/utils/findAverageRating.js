export const findAverageRating = async (rating) => {
  const sum = rating.reduce((acc, i) => i + acc, 0);
  const finalRating = sum / rating.length;
  return Math.floor(Number(finalRating));
};
