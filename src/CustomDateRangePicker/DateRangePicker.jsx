import React, { Component } from "react";
import DefinedRange from "./DefinedRange.jsx";
import DateRange from "./DateRange.jsx";
import { findNextRangeIndex, generateStyles } from "./utils";
import coreStyles from "./styles";
import PropTypes from "prop-types";
import classnames from "classnames";

export class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedRange: [findNextRangeIndex(props.ranges), 0],
      isOpen: true
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }

  render() {
    const { focusedRange } = this.state;
    let styles = generateStyles([coreStyles, this.props.classNames]);

    return (
      <div className={classnames(this.styles.dateRangePickerWrapper, this.props.className)}>
        <span style={{ borderRight: "thin solid #B6BBCD" }}>
          <DateRange
            onRangeFocusChange={focusedRange => this.setState({ focusedRange })}
            focusedRange={focusedRange}
            {...this.props}
            ref={t => (this.dateRange = t)}
            className={undefined}
          />
          <span style={{ display: "flex" }}>
            <button
              type="button"
              className={classnames(styles.nextPrevButton)}
              style={{ width: "100px" }}
              onClick={() =>
                this.props.setDateRange([
                  {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: "selection",
                    showDateDisplay: false
                  }
                ])
              }
            >
              Clear selection
            </button>
            <button
              type="button"
              className={classnames(styles.nextPrevButton)}
              style={{ width: "100px", marginLeft: "auto", color: "#F39C15" }}
              onClick={() => this.props.confirmSelection()}
            >
              Apply
            </button>
          </span>
        </span>

        <DefinedRange
          focusedRange={focusedRange}
          onPreviewChange={value => this.dateRange.updatePreview(value)}
          {...this.props}
          range={this.props.ranges[focusedRange[0]]}
          className={undefined}
        />
      </div>
    );
  }
}

DateRangePicker.defaultProps = {
  showSelectionPreview: true,
  moveRangeOnFirstSelection: false,
  months: 2,
  ranges: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  },
  direction: "horizontal",
  maxDate: new Date(),
  rangeColors: ["#F39C15"]
};

DateRangePicker.propTypes = {
  ...DateRange.propTypes,
  ...DefinedRange.propTypes,
  className: PropTypes.string
};

export default DateRangePicker;
