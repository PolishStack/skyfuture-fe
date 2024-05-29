export const getToken = () => {
  const token = localStorage.getItem("token") ?? "";
  if (token == "") {
    throw new Error("Not found token");
  }
  return token;
};

export const formatDate = (date: string | Date) => {
  if (typeof date === "string") date = new Date(date);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const loopString = (text: string, numRepetitions: number) => {
  if (numRepetitions <= 0) {
    return text;
  }

  // Use repeat() method (modern browsers)
  if (typeof text.repeat === "function") {
    return text.repeat(numRepetitions);
  }

  let repeatedText = "";
  for (let i = 0; i < numRepetitions; i++) {
    repeatedText += text;
  }
  return repeatedText;
};

export const getRandomDigitNumber = (digit: number) => {
  const max = parseInt(loopString("9", digit));
  const random = Math.floor(Math.random() * max);
  return random.toString().padStart(digit, "0");
};

export const getCurrentRound = (
  roomId: number,
  startDateTime: Date | string
) => {
  if (typeof startDateTime === "string")
    startDateTime = new Date(startDateTime);
  // Get the current date and time
  const now = new Date();

  // Calculate the elapsed time in milliseconds
  const elapsedTime = now.getTime() - startDateTime.getTime();

  // Define the game duration in milliseconds (3 minutes)
  const gameDuration = import.meta.env.VITE_GAME_DURATION_MINUTE * 60 * 1000; // game minutes * 60 seconds/minute * 1000 milliseconds/second

  // Calculate the number of rounds (rounded down to whole rounds)
  const currentRound =
    (Math.floor(elapsedTime / gameDuration) + roomId - 1) * 3;
  return currentRound;
};

export const getGameEndTime = (gameStartTime: Date): Date => {
  const gameDuration = 3 * 60 * 1000;
  const gameEndTime = new Date(
    gameStartTime.getTime() +
      Math.ceil(
        (new Date().getTime() - gameStartTime.getTime()) / gameDuration
      ) *
        gameDuration
  );
  return gameEndTime;
};
