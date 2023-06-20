import { useEffect, useState } from "react";

function ClockDateWidget() {
  const [stateTime, setTime] = useState<string>();
  const [stateDate, setDate] = useState<string>();

  const updateDate = () => {
    const date = new Date();

    const dateLocale = date.toLocaleDateString();
    if (dateLocale !== stateDate) {
      setDate(dateLocale);
    }

    const timeLocale = date.toLocaleTimeString("RU-ru", {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (timeLocale !== stateTime) {
      setTime(timeLocale);
    }
  };

  useEffect(() => {
    updateDate();

    setInterval(() => {
      updateDate();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>{stateTime}</div>
      <div>{stateDate}</div>
    </>
  );
}

export default ClockDateWidget;
