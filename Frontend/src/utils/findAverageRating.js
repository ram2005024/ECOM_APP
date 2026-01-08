export const findAverageRating = async (rating) => {
  console.log("Average part rating is: ", rating);
  const sum = rating.reduce((acc, i) => i + acc, 0);
  const finalRating = sum / rating.length;

  return Math.floor(Number(finalRating));
};
export const findAverageRatingFromReviews = (review) => {
  if (review.length == 0) return null;
  const rating = review.map((i) => Number(i.rating));
  const sum = rating.reduce((acc, i) => i + acc, 0);
  const finalRating = sum / rating.length;
  return Math.floor(Number(finalRating));
};
