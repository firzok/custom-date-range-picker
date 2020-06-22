import React, { useEffect, useState } from "react";
import coreStyles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { generateStyles } from "./utils";
import {
  addDays,
  format,
  addYears,
  isSameMonth,
  setMonth,
  min,
  max,
  setDay,
  isSameDay
} from "date-fns";

export function DateRangeButton(props) {
  const [range, setRange] = useState(1);

  useEffect(() => {
    setRange(props.range);
  }, [props.range]);
  let dateRange = props.dateRange[0];
  let lastPossibleSelection = isSameDay(dateRange.endDate, new Date());

  let today = new Date();

  let styles = generateStyles([coreStyles, props.classNames]);

  function formatDate(value, dateDisplayFormat, dateOptions) {
    if (value) {
      return String(format(value, dateDisplayFormat, dateOptions));
    }
    return "";
  }

  const changeShownDate = (focusedDate, value, type, mode = "set") => {
    const { minDate, maxDate, onDateChange } = props;
    const modeMapper = {
      dayOffset: date => addDays(date, value),

      set: () => value
    };

    const newStartDate = min([max([modeMapper[mode](focusedDate.startDate), minDate]), maxDate]);
    const newEndDate = min([max([modeMapper[mode](focusedDate.endDate), minDate]), maxDate]);

    onDateChange([{ ...dateRange, startDate: newStartDate, endDate: newEndDate }]);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", width: "fit-content", cursor: "pointer" }}>
      <span style={{ display: "flex", alignItems: "center" }} onClick={props.onClick}>
        <FontAwesomeIcon icon={faCalendarAlt} style={{ color: "grey", margin: "0 1rem 0 1rem" }} />

        <h4>
          {isSameDay(today, dateRange.startDate)
            ? "Today"
            : formatDate(dateRange.startDate, props.dateDisplayFormat)}
          {isSameDay(today, dateRange.startDate) ? ", " : " - "}
          {isSameDay(today, dateRange.endDate)
            ? isSameDay(today, dateRange.startDate)
              ? formatDate(dateRange.startDate, props.dateDisplayFormat)
              : "Today"
            : formatDate(dateRange.endDate, props.dateDisplayFormat)}{" "}
        </h4>
      </span>

      <span style={{ display: "flex" }}>
        <button
          type="button"
          className={classnames(styles.nextPrevButton, styles.prevButton)}
          onClick={() => {
            changeShownDate(dateRange, -range, "start", "dayOffset");
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          type="button"
          className={classnames(styles.nextPrevButton, styles.prevButton)}
          onClick={() => {
            changeShownDate(dateRange, +range, "end", "dayOffset");
          }}
          disabled={lastPossibleSelection}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            style={{ color: lastPossibleSelection ? "grey" : "black" }}
          />
        </button>
      </span>
    </div>
  );
}

DateRangeButton.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: "MMM dd, yyyy",
  minDate: addYears(new Date(), -100),
  maxDate: new Date()
};
