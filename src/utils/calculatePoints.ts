/**
 * Get the start date of the current season based on today's date
 */
function getSeasonStart(date: Date): Date {
  const year = date.getFullYear();

  const spring = new Date(year, 2, 1);   // March 1
  const summer = new Date(year, 5, 1);   // June 1
  const autumn = new Date(year, 8, 1);   // September 1
  const winter = new Date(year, 11, 1);  // December 1

  if (date >= winter) return winter;
  if (date >= autumn) return autumn;
  if (date >= summer) return summer;
  if (date >= spring) return spring;

  // If it's January or February → we are still in Winter (previous year)
  return new Date(year - 1, 11, 1);
}

/**
 * Return the day number within the current season (Day 1, Day 2, ...).
 */
function getDayOfSeason(date: Date): number {
  const seasonStart = getSeasonStart(date);
  const diffMs = date.getTime() - seasonStart.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

/**
 * Calculate today's points according to the given rules.
 */
export function getPointsForToday(): string {
  const today = new Date();
  const day = getDayOfSeason(today);

  if (day === 1) return "2";
  if (day === 2) return "3";

  const points: number[] = [2, 3];

  for (let i = 2; i < day; i++) {
    points[i] = points[i - 1] * 0.6 + points[i - 2] * 1;
  }

  // ✅ Correct: Keep value as a number
  const todayPoints = Math.round(points[day - 1]);

  // ✅ Only format at the end
  return todayPoints >= 1000 ? `${Math.round(todayPoints / 1000)}K` : todayPoints.toString();
}