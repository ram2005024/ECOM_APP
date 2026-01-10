export const getSubscriptionTime = (time) => {
  const endTime = new Date(time.trialEnd);
  const remainingTime = endTime - new Date();

  if (remainingTime <= 0) return { days: 0, hours: 0, mins: 0, seconds: 0 };
  //Convert into days hours and seconds;
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  return { days, hours, mins, seconds };
};
