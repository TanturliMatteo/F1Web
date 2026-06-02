const isRaceCompleted = (date: string) => {
  return new Date(date) < new Date();
};

export default isRaceCompleted;
