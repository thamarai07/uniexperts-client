import { TimelineFilters } from "constants";
import { endOfMonth, endOfToday, endOfWeek, endOfYesterday, startOfMonth, startOfToday, startOfWeek, startOfYesterday } from "date-fns";

export const setDateRangeValueFromFilter = (value, defaultValue, cb) => {
    let startDate = defaultValue[0];
    let endDate = defaultValue[1];
    switch (value) {
        case TimelineFilters.Today:
            startDate = startOfToday();
            endDate = endOfToday();
            break;
        case TimelineFilters.Yesterday:
            startDate = startOfYesterday();
            endDate = endOfYesterday();
            break;
        case TimelineFilters.ThisWeek:
            startDate = startOfWeek(new Date());
            endDate = endOfWeek(new Date());
            break;
        case TimelineFilters.ThisMonth:
            startDate = startOfMonth(new Date());
            endDate = endOfMonth(new Date());
            break;
        case TimelineFilters.LastMonth:
            startDate = startOfMonth(new Date().setDate(0));
            endDate = endOfMonth(new Date().setDate(0));
            break;
        case TimelineFilters.None:
            startDate = null;
            endDate = null;
            break;
        default:
    }
    cb([startDate, endDate]);
};