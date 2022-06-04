// import DatePicker from "react-datetime";
// import "react-datetime/css/react-datetime.css";

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function DateCheck() {
  // disable the list of custom dates

  //   const customDates = ["2022-05-26"];

  //   for (let i = 0; i < customDates.length; i++) {
  //     customDates[i] = customDates[i].split("T")[0];
  //   }
  //   console.log(customDates);

  //   const disableCustomDt = (current) => {
  //     return !customDates.includes(current.format("YYYY-MM-DD"));
  //   };

  const [date, setDate] = useState(new Date());
  const handleChange = (date) => setDate(date);

  return (
    <div className="App">
      <p className="title">Disable past dates:</p>
      {/* <DatePicker
        timeFormat={false}
        // isValidDate={disableCustomDt}
        excludeDateIn
        tervals={[{ start: "2022-05-26", end: "2022-05-26" }]}
      /> */}

      <DatePicker
        className="border"
        selected={date}
        onChange={handleChange}
        excludeDateIntervals={[
          {
            start: new Date("2022-05-26T00:00:00.000Z"),
            end: new Date("2022-05-28T00:00:00.000Z"),
          },
        ]}
      />
    </div>
  );
}

export default DateCheck;
