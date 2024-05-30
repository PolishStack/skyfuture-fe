import {
  Box,
  Group,
  NumberFormatter,
  Spoiler,
  Text,
  Title,
} from "@mantine/core";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle, IoTimerSharp } from "react-icons/io5";

import { TransactionStatusType, TransactionType } from "../services/api/type";
import { formatDate } from "../utils/helpers";

interface TransactionProps {
  title: string;
  transaction: TransactionType;
}
const Transaction = ({ title, transaction }: TransactionProps) => {
  let description = "";
  if (transaction.method === "win") {
    description = "Win";
  } else if (transaction.method === "lose") {
    description = "Lose";
  } else if (transaction.method === "game-pending") {
    description = "Pending";
  }
  if (transaction.method === "reward") description = transaction.description;
  const getIcon = (status: TransactionStatusType) => {
    switch (status) {
      case "success":
        return (
          <IoIosCheckmarkCircle color="#48b02c" size="calc(35px * 1.23)" />
        );
      case "failed":
        return <IoCloseCircle color="red" size="calc(35px * 1.23)" />;
      case "pending":
        return <IoTimerSharp color="grey" size="calc(35px * 1.23)" />;
    }
  };
  return (
    <>
      <Group wrap="nowrap" justify="space-between" p="5px" gap="0">
        <Group gap={12}>
          {getIcon(transaction.status)}
          <Box ml="4px">
            <Title
              order={6}
              fs="16px"
              style={{ fontSize: "16px", lineHeight: "19px" }}
            >
              {title}
            </Title>
            <Text style={{ fontSize: "12px", lineHeight: "16px" }}>
              {formatDate(transaction.updatedAt)}
            </Text>
            {(transaction.method === "deposit" ||
              transaction.method === "withdraw") && (
              <Text
                fw="bold"
                c="green"
                style={{ fontSize: "16px", lineHeight: "19px" }}
              >
                {transaction.status === "success" && "Thành công"}
                {transaction.status === "pending" && "Đang xử lý !"}
                {transaction.status === "failed" && "Thất bại"}
              </Text>
            )}
            <Text
              style={{
                fontSize: "12px",
                lineHeight: "16px",
              }}
            >
              <Spoiler maxHeight={16} showLabel="Show more" hideLabel="Hide">
                {description && description}
              </Spoiler>
            </Text>
          </Box>
        </Group>
        {transaction.method !== "game-pending" ? (
          <Text c={transaction.amount > 0 ? "green" : "red"} fw="bold">
            <NumberFormatter
              prefix={transaction.amount > 0 ? "+" : ""}
              value={
                transaction.method === "win"
                  ? transaction.amount / 2
                  : transaction.amount
              }
              thousandSeparator
            />
          </Text>
        ) : (
          <Text c="gray" fw="bold">
            <NumberFormatter
              value={Math.abs(transaction.amount)}
              thousandSeparator
            />
          </Text>
        )}
      </Group>
      <hr style={{ margin: "0" }} />
    </>
  );
};

export default Transaction;
