import { useState, useEffect } from "react";

const timerSecs = 30;
const TelegramButton = () => {
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setNotification(true), timerSecs * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <a
      className="button__tg"
      href="https://t.me/DeMurk"
      target="_blank"
      rel="noreferrer"
      onClick={() => setNotification(false)}
    >
      <img src="img/tg_icon.png" alt="" />
      {notification ? <div className="notification">1</div> : null}
    </a>
  );
};

export default TelegramButton;
