import { useEffect, useState } from "react";
import Header from "../component/Header";
import { GamePendingType, TransactionType } from "../services/api/type";
import { getToken } from "../utils/helpers";
import { useAppSelector } from "../hooks/store";
import axios from "../services/api";
import Swal from "sweetalert2";
import { Badge, Skeleton, Stack } from "@mantine/core";
import Transaction from "../component/Transaction";

const ParticipationHistoryPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [depositList, setDepositList] = useState<TransactionType[] | null>(
    null
  );

  useEffect(() => {
    if (user)
      (async () => {
        try {
          const token = getToken();
          const {
            data: {
              result: {
                transaction: transactionList,
                betInfomation: gamePendingList,
              },
            },
          } = (await axios.get(`/users/${user.id}/game-history`, {
            headers: { Authorization: `Bearer ${token}` },
          })) as {
            data: {
              result: {
                transaction: TransactionType[];
                betInfomation: GamePendingType[];
              };
            };
          };

          const participleList = transactionList
            .concat(
              gamePendingList.map(
                (gamePending): TransactionType => ({
                  id: `game-pending-${gamePending.id}`,
                  userId: gamePending.userId,
                  amount: gamePending.amount,
                  description: gamePending.label,
                  status: "pending",
                  method: "game-pending",
                  createdAt: gamePending.createdAt,
                  updatedAt: gamePending.updatedAt,
                  label: gamePending.label,
                })
              )
            )
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            );

          setDepositList(participleList);
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: "không tải được lịch sử phân từ",
            confirmButtonColor: "#6EE3A5",
          });
          console.log(err);
        }
      })();
  }, [user]);
  return (
    <>
      <Header title="Lịch sử tham gia" />
      <Stack gap="0">
        {depositList ? (
          depositList.length > 0 ? (
            depositList.map((transaction) => (
              <Transaction
                key={transaction.id}
                title={transaction.description}
                transaction={transaction}
              />
            ))
          ) : (
            <Badge variant="light" color="grey" mx="auto" mt="lg">
              Không tìm thấy lịch sử
            </Badge>
          )
        ) : (
          <>
            <Skeleton height={80} mb={4} width="100%" />
            <Skeleton height={80} mb={4} width="100%" />
            <Skeleton height={80} mb={4} width="100%" />
          </>
        )}
      </Stack>
    </>
  );
};

export default ParticipationHistoryPage;
