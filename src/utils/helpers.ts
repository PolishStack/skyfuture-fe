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
  const gameDuration = import.meta.env.VITE_GAME_DURATION_MINUTE * 60 * 1000;
  const gamePast = Math.floor(elapsedTime / gameDuration);
  // Calculate the number of rounds (rounded down to whole rounds)
  const currentRound = gamePast * 3 - (3 - roomId);
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

export const hashToSixDigits = async (number: number) => {
  // Convert the number to a string (assuming it's an integer)
  const numberString = String(number);

  // Create a TextEncoder to encode the string as a Uint8Array
  const textEncoder = new TextEncoder();
  const data = textEncoder.encode(numberString);

  // Crypto API: Get a SHA-256 digest
  const crypto = window.crypto; // Handle browser compatibility
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash buffer to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Extract first digit and truncate to last five digits
  const firstDigit = numberString[0];
  const lastFiveDigits = hashHex.slice(-5);

  // Combine and return the six-digit hash
  return firstDigit + lastFiveDigits;
};

export const charToSingleDigit = (char: string) => {
  if (!isNaN(parseInt(char))) return char;
  const charCode = char.charCodeAt(0); // Get the character code
  const digit = charCode - 48; // Subtract the code of '0' to get the digit value
  return digit.toString()[0];
};
