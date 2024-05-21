export default function getISOWeeks() {
  function getStartOfISOWeek(week, year) {
    let simple = new Date(year, 0, 1 + (week - 1) * 7);
    let dow = simple.getDay();
    let ISOWeekStart = simple;

    if (dow <= 4) {
      ISOWeekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
      ISOWeekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }

    ISOWeekStart.setHours(0, 0, 0, 0);
    return ISOWeekStart;
  }

  function getEndOfISOWeek(startOfWeek) {
    let endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    return endOfWeek;
  }
  let currentDate = new Date();

  let currentISOWeek = getISOWeekNumber(currentDate);

  let targetISOWeek = currentISOWeek - 3;

  let targetYear = currentDate.getFullYear();

  if (targetISOWeek < 1) {
    targetYear--;
    targetISOWeek = getISOWeeksInYear(targetYear) + targetISOWeek;
  }

  function getISOWeekNumber(date) {
    let d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    let yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  function getISOWeeksInYear(year) {
    let d = new Date(year, 11, 31);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    let weekNumber = Math.ceil(((d - new Date(year, 0, 1)) / 86400000 + 1) / 7);
    return weekNumber === 1 ? 52 : weekNumber;
  }
  let startOfFourWeeksAgo = getStartOfISOWeek(targetISOWeek, targetYear);
  let endOfCurrentWeek = getEndOfISOWeek(
    getStartOfISOWeek(currentISOWeek, currentDate.getFullYear())
  );

  let startOfCurrentWeek = getStartOfISOWeek(
    currentISOWeek,
    currentDate.getFullYear()
  );

  return { startOfFourWeeksAgo, startOfCurrentWeek, endOfCurrentWeek };
}
