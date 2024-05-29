import { Badge, Skeleton, Stack } from "@mantine/core";
import Header from "../component/Header";
import { TransactionType } from "../services/api/type";
import Transaction from "../component/Transaction";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../services/api";
import { getToken } from "../utils/helpers";
import { useAppSelector } from "../hooks/store";

const DepositHistoryPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [depositList, setDepositList] = useState<TransactionType[] | null>(
    null
  );

  useEffect(() => {
    if (user)
      (async () => {
        try {
          const token = getToken();
          let {
            data: { result: transactionList },
          } = (await axios.get(`/users/${user.id}/transactions`, {
            params: { method: "deposit" },
            headers: { Authorization: `Bearer ${token}` },
          })) as { data: { result: TransactionType[] } };

          setDepositList(
            transactionList.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
          );
        } catch (err) {
          Swal.fire({
            icon: "error",
            text: "EN: failed to load deposit history",
            confirmButtonColor: "#6EE3A5",
          });
          console.log(err);
        }
      })();
  }, [user]);
  return (
    <>
      <Header title="Lịch sử giao dịch" />
      <Stack gap="0">
        {depositList ? (
          depositList.length > 0 ? (
            depositList.map((transaction) => (
              <Transaction
                key={transaction.id}
                title="NẠP"
                transaction={transaction}
              />
            ))
          ) : (
            <Badge variant="light" color="grey" mx="auto" mt="lg">
              EN: No history
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

export default DepositHistoryPage;
