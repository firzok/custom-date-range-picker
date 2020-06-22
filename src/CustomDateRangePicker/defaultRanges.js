import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  isSameDay,
  startOfYear,
  endOfYear,
  startOfDecade,
  endOfDecade,
  addYears
} from "date-fns";

const defineds = {
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),

  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),

  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),

  startOfLast7Days: startOfDay(addDays(endOfDay(addDays(new Date(), -1)), -6)),
  endOfLast7Days: startOfDay(addDays(new Date(), -1)),

  startOfLast30Days: startOfDay(addDays(new Date(), -30)),
  endOfLast30Days: endOfDay(addDays(new Date(), -1)),

  startOfYear: startOfYear(new Date()),
  endOfYear: endOfDay(new Date()),

  startOfLifetime: startOfDay(addYears(new Date(), -100)),
  endOfLifetime: endOfDay(new Date())
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  }
};

export function createStaticRanges(ranges) {
  return ranges.map(range => ({ ...staticRangeHandler, ...range }));
}

export const defaultStaticRanges = createStaticRanges([
  {
    label: "Today",
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday
    })
  },
  {
    label: "Yesterday",
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday
    })
  },
  {
    label: "Last 7 days",
    range: () => ({
      startDate: defineds.startOfLast7Days,
      endDate: defineds.endOfLast7Days
    })
  },
  {
    label: "Last 30 days",
    range: () => ({
      startDate: defineds.startOfLast30Days,
      endDate: defineds.endOfLast30Days
    })
  },
  {
    label: "Last Month",
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth
    })
  },
  {
    label: "This Year",
    range: () => ({
      startDate: defineds.startOfYear,
      endDate: defineds.endOfYear
    })
  },
  {
    label: "Lifetime",
    range: () => ({
      startDate: defineds.startOfLifetime,
      endDate: defineds.endOfLifetime
    })
  }
]);

export const defaultInputRanges = [];
