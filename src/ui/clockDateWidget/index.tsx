import React, { useEffect, useState } from "react";

function ClockDateWidget() {
  const [stateTime, setTime] = useState<string>();
  const [stateDate, setDate] = useState<string>();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();

      const dateLocale = date.toLocaleDateString();
      if (dateLocale !== stateDate) {
        setDate(dateLocale);
      }

      const timeLocale = date.toLocaleTimeString();
      if (timeLocale !== stateTime) {
        setTime(timeLocale);
      }
    }, 1000);
  }, []);

  return (
    <div>
      <div>{stateTime}</div>
      <div>{stateDate}</div>
    </div>
  );
}

export default ClockDateWidget;
