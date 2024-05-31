import {
  Box,
  Group,
  NumberFormatter,
  Spoiler,
  Text,
  Title,
} from "@mantine/core";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoAlertCircle, IoCloseCircle } from "react-icons/io5";

import { TransactionType } from "../services/api/type";
import { formatDate } from "../utils/helpers";

const getIcon = (transaction: TransactionType) => {
  if (transaction.method === "reward")
    return <IoIosCheckmarkCircle color="#48b02c" size="calc(35px * 1.23)" />;
  switch (transaction.status) {
    case "success":
      return <IoIosCheckmarkCircle color="#48b02c" size="calc(35px * 1.23)" />;
    case "failed":
      return <IoCloseCircle color="red" size="calc(35px * 1.23)" />;
    case "pending":
      return <IoAlertCircle color="orange" size="calc(35px * 1.23)" />;
  }
};
interface TransactionProps {
  title: string;
  transaction: TransactionType;
}
const Transaction = ({ title, transaction }: TransactionProps) => {
  let description = "";
  switch (transaction.method) {
    case "withdraw":
      if (transaction.status === "failed")
        description =
          "Lý do :  Hệ thống đã huỷ lệnh rút của quý khách trước đó ,vui lòng vào web để kiểm tra số dư ,trân trọng cảm ơn !";
      break;
    case "win":
      description = "Win";
      break;
    case "lose":
      description = "Lose";
      break;
    case "game-pending":
      description = "Pending";
      break;
    case "reward":
      description = transaction.description;
      break;
  }

  return (
    <>
      <Group wrap="nowrap" justify="space-between" p="5px" gap="0">
        <Group gap={12}>
          {getIcon(transaction)}
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
                c={(() => {
                  switch (transaction.status) {
                    case "success":
                      return "green";
                    case "pending":
                      return "yellow";
                    case "failed":
                      return "red";
                  }
                })()}
                style={{ fontSize: "16px", lineHeight: "19px" }}
              >
                {transaction.status === "success" && "Thành công"}
                {transaction.status === "pending" && "Đang xử lý"}
                {transaction.status === "failed" && "Thất bại"}
              </Text>
            )}
            <Text
              style={{
                fontSize: "12px",
                lineHeight: "16px",
              }}
            >
              <Spoiler
                maxHeight={transaction.method === "withdraw" ? 100 : 16}
                showLabel="Show more"
                hideLabel="Hide"
                maw="80%"
              >
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
