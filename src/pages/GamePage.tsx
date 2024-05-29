import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
import { SlArrowLeft } from "react-icons/sl";
import { IoIosAlert } from "react-icons/io";
import { getCurrentRound, getRandomDigitNumber } from "../utils/helpers";
import Countdown from "../component/Game/Countdown";
import { useState } from "react";
import { gamesStartDateTime } from "../config";

const GamePage = () => {
  const navigate = useNavigate();
  const { id: roomIdParam } = useParams();
  let roomId = parseInt(roomIdParam || "0");
  const { user } = useAppSelector((state) => state.user);

  const [roomNumberList, setRoomNumberList] = useState<number[]>(() => [
    getCurrentRound(1, gamesStartDateTime[0]),
    getCurrentRound(2, gamesStartDateTime[1]),
    getCurrentRound(3, gamesStartDateTime[2]),
  ]);
  const room5DigitNumber = getRandomDigitNumber(5).toString().split("");
  const availableRoomsId = [1, 2, 3];

  const onTimerEnd = () => {
    setRoomNumberList((rnl) => {
      let newList = [...rnl];
      newList[roomId - 1] = getCurrentRound(
        roomId,
        gamesStartDateTime[roomId - 1]
      );
      return newList;
    });
  };

  return (
    <>
      <Box bg="#87f3d9" h={150}>
        <Group justify="space-between" p={10}>
          <Group gap={4}>
            <SlArrowLeft size="24px" />
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              ID: {user?.id}
            </Text>
          </Group>
          <Group gap={50}>
            <Stack gap={0} align="center">
              <Text>Number: {roomNumberList[roomId - 1] + 3}</Text>
              <Countdown
                gameEndDateTime={
                  new Date(
                    new Date(gamesStartDateTime[roomId - 1]).getTime() +
                      (roomNumberList[roomId - 1] + 1) * 3 * 60 * 1000
                  )
                }
                onTimerEnd={onTimerEnd}
              />
            </Stack>
            <IoIosAlert
              color="red"
              size="24px"
              style={{ backgroundColor: "white", borderRadius: "100%" }}
            />
          </Group>
        </Group>
        <Group justify="space-between" px="35px">
          <Text fw={700}>Number: {roomNumberList[roomId - 1]}</Text>
          <Group gap={10}>
            {room5DigitNumber.map((digit, index) => (
              <Group
                key={index}
                justify="center"
                w={35}
                h={35}
                fw={700}
                style={{ borderRadius: "100%", border: "2px solid white" }}
              >
                {digit}
              </Group>
            ))}
          </Group>
        </Group>
      </Box>
      <Group
        justify="space-around"
        w="100%"
        h={40}
        style={{ boxShadow: "0 2px 8px 0 #7c7c7c80" }}
      >
        {availableRoomsId.map((room, index) => (
          <Button
            key={index}
            onClick={() => navigate(`/app/game/${room}`)}
            style={{
              backgroundColor: "#ecf5ff",
              color: "black",
              border: "1px solid #d6e8fe",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "700",
              width: "80px",
              height: "32px",
              boxSizing: "border-box",
              padding: "0",
            }}
          >
            PHÒNG {room}
          </Button>
        ))}
      </Group>
    </>
  );
};

export default GamePage;
