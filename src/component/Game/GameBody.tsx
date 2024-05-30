import {
  Button,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { useAppSelector } from "../../hooks/store";

interface GameBody {
  left: string;
  right: string;
  roomNumber: number;
  onSubmit: (side: boolean, amount: number) => void;
}
const GameBody = ({ left, right, roomNumber, onSubmit }: GameBody) => {
  const { user } = useAppSelector((state) => state.user);
  const [selectedSide, setSelectedSide] = useState<boolean | null>(null);
  const [amount, setAmount] = useState<number>(100);
  const amountChoiceList = [100, 500, 1000, 10000, 20000];
  return (
    <Group mt={18} gap={0}>
      <SimpleGrid cols={2} w="100%" style={{ gap: "0" }}>
        <Button
          onClick={() => setSelectedSide(false)}
          style={{
            flexGrow: "1",
            border:
              selectedSide === false
                ? "1px solid #88ffce"
                : "1px solid #e8ffea",
            color: selectedSide === false ? "white" : "#f44336",
            backgroundColor: selectedSide === false ? "#00AD13" : "#D4FED8",
            height: "83px",
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          {left}
        </Button>
        <Button
          onClick={() => setSelectedSide(true)}
          style={{
            flexGrow: "1",
            border:
              selectedSide === true ? "1px solid #88ffce" : "1px solid #e8ffea",
            color: selectedSide === true ? "white" : "#f44336",
            backgroundColor: selectedSide === true ? "#00AD13" : "#D4FED8",
            height: "83px",
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          {right}
        </Button>
      </SimpleGrid>

      {selectedSide !== null && (
        <Stack
          pos="absolute"
          bottom="0px"
          w="100%"
          bg="#87f3d9"
          p={15}
          gap={15}
        >
          <Group w="100%" justify="space-between">
            {amountChoiceList.map((amountChoice) => (
              <Button
                key={amountChoice}
                onClick={() => setAmount(amountChoice)}
                bg={
                  amount === amountChoice
                    ? "#678cf0"
                    : "linear-gradient(#fff,#f7f8fd 19%,#fcfdff 69%,#fcfdff)"
                }
                c={amount === amountChoice ? "#fff" : "#535d76"}
                p="0 14px"
                h={28}
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  outline:
                    amount === amountChoice ? "none" : "1px solid #c9cae491",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
              >
                {amountChoice}
              </Button>
            ))}
          </Group>
          <Group w="100%" justify="space-between">
            <Button
              onClick={() => setSelectedSide(null)}
              leftSection={<BsTrash3 size={14} color="#555" />}
              variant="transparent"
              color="#555"
              h={19}
              w={83}
              p={0}
              styles={{ section: { marginRight: "3px" } }}
            >
              Đóng cửa
            </Button>
            <NumberInput
              allowNegative={false}
              allowDecimal={false}
              hideControls
              value={amount}
              onChange={(value) => {
                if (typeof value === "string") value = parseInt(value);
                setAmount(value);
              }}
              w={120}
              h={35}
            />
            <Button
              onClick={() => onSubmit(selectedSide, amount)}
              bg="url(/button-background.png) 0 0/cover no-repeat"
              c="#fff"
              p="0 12px"
              h={35}
              style={{
                fontSize: "13px",
                fontWeight: "normal",
                border: "none",
                borderRadius: "5px",
                boxSizing: "border-box",
              }}
            >
              Xác nhận
            </Button>
          </Group>
          <Group w="100%" justify="space-between">
            <Text fw="bold" style={{ fontSize: "14px" }}>
              Number: {roomNumber}
            </Text>
            <Text fw="bold" style={{ fontSize: "14px" }}>
              Số dư: {user?.point}
            </Text>
          </Group>
        </Stack>
      )}
    </Group>
  );
};

export default GameBody;
