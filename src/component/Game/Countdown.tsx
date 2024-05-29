import { BackgroundImage, Group } from "@mantine/core";
import { useState, useEffect } from "react";

interface CountdownProps {
  gameEndDateTime: Date;
  onTimerEnd: () => void;
}

const Countdown = ({ gameEndDateTime, onTimerEnd }: CountdownProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const difference = gameEndDateTime.getTime() - currentTime.getTime();
  const getRemainingTime = (difference: number) => {
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = getRemainingTime(difference);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  useEffect(() => {
    if (difference <= 0) onTimerEnd();
  });

  return (
    <Group gap={0} wrap="nowrap">
      <BackgroundImage
        w="40px"
        h="35px"
        src="/timer-bg.png"
        style={{
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "LCD",
          color: "#535d76",
          fontWeight: "700",
        }}
      >
        {formattedHours}
      </BackgroundImage>
      <BackgroundImage
        w="40px"
        h="35px"
        src="/timer-bg.png"
        style={{
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "LCD",
          color: "#535d76",
          fontWeight: "700",
        }}
      >
        {formattedMinutes}
      </BackgroundImage>
      <BackgroundImage
        w="40px"
        h="35px"
        src="/timer-bg.png"
        style={{
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "LCD",
          color: "#535d76",
          fontWeight: "700",
        }}
      >
        {formattedSeconds}
      </BackgroundImage>
    </Group>
  );
};

export default Countdown;
