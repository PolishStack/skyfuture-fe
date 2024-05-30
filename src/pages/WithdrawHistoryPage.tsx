import { useEffect, useState } from "react";
import Header from "../component/Header";
import { useAppSelector } from "../hooks/store";
import { TransactionType } from "../services/api/type";
import { getToken } from "../utils/helpers";
import axios from "../services/api";
import Swal from "sweetalert2";
import { Badge, Skeleton, Stack } from "@mantine/core";
import Transaction from "../component/Transaction";

const WithdrawHistoryPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [withdrawList, setWithdrawList] = useState<TransactionType[] | null>(
    null
  );

  useEffect(() => {
    if (user)
      (async () => {
        try {
          const token = getToken();
          const {
            data: { result: transactionList },
          } = (await axios.get(`/users/${user.id}/transactions`, {
            params: { method: "withdraw" },
            headers: { Authorization: `Bearer ${token}` },
          })) as { data: { result: TransactionType[] } };

          setWithdrawList(
            transactionList.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
          );
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: "Không thể mở trang lịch sử rút tiền",
            confirmButtonColor: "#6EE3A5",
          });
          console.log(err);
        }
      })();
  }, [user]);
  return (
    <>
      <Header title="Lịch sử rút điểm" />
      <Stack gap="0">
        {withdrawList ? (
          withdrawList.length > 0 ? (
            withdrawList.map((transaction) => (
              <Transaction
                key={transaction.id}
                title="RÚT"
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

export default WithdrawHistoryPage;
