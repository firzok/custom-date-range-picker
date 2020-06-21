import React from "react";
import { DateRangePicker } from "./CustomDateRangePicker/DateRangePicker";
import { DateRangeButton } from "./CustomDateRangePicker/DateRangeButton";
import { useState } from "react";
import "./App.css";

function App(props) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      showDateDisplay: false
    }
  ]);

  const [isOpen, setIsOpen] = useState(true);
  const [range, setRange] = useState(1);

  let today = new Date();

  function selectDateRange(newSelection) {
    if (newSelection[0].endDate > today) {
      newSelection[0].endDate = today;
    }
    setDateRange(newSelection);
  }

  return isOpen ? (
    <div>
      <DateRangePicker
        className="custom"
        onChange={item => selectDateRange([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={dateRange}
        direction="horizontal"
        maxDate={today}
        rangeColors={["#F39C15"]}
        color={"#E9650D"}
        setDateRange={setDateRange}
        confirmSelection={() => setIsOpen(prevState => !prevState)}
        setRange={setRange}
      />
    </div>
  ) : (
    <DateRangeButton
      dateRange={dateRange}
      onClick={() => setIsOpen(prevState => !prevState)}
      onDateChange={selectDateRange}
      range={range}
    />
  );
}

export default App;
