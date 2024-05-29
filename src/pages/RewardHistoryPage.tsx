import { useEffect, useState } from "react";
import Header from "../component/Header";
import { useAppSelector } from "../hooks/store";
import { TransactionType } from "../services/api/type";
import { getToken } from "../utils/helpers";
import axios from "../services/api";
import Swal from "sweetalert2";
import { Badge, Skeleton, Stack } from "@mantine/core";
import Transaction from "../component/Transaction";

const RewardHistoryPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [rewardList, setRewardList] = useState<TransactionType[] | null>(null);

  useEffect(() => {
    if (user)
      (async () => {
        try {
          const token = getToken();
          const {
            data: { result: transactionList },
          } = (await axios.get(`/users/${user.id}/transactions`, {
            params: { method: "reward" },
            headers: { Authorization: `Bearer ${token}` },
          })) as { data: { result: TransactionType[] } };

          setRewardList(
            transactionList.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
          );
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: "Không thể mở trang Lịch sử giải thưởng",
            confirmButtonColor: "#6EE3A5",
          });
          console.log(err);
        }
      })();
  }, [user]);
  return (
    <>
      <Header title="Lịch sử nhận thưởng" />
      <Stack gap="0">
        {rewardList ? (
          rewardList.length > 0 ? (
            rewardList.map((transaction) => (
              <Transaction
                key={transaction.id}
                title="thưởng"
                transaction={transaction}
              />
            ))
          ) : (
            <Badge variant="light" color="grey" mx="auto" mt="lg">
              Không tìm thấy tiền sử
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

export default RewardHistoryPage;
