import { useEffect, useState } from "react";
import Header from "../../component/Header";
import { Badge, Button, Card, Flex, SimpleGrid, Stack } from "@mantine/core";
import { TransactionType } from "../../services/api/type";
import Swal from "sweetalert2";
import axios from "../../services/api";
import { getToken } from "../../utils/helpers";

const ManageTransactionPage = () => {
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    []
  );
  const [callFetch, setCallFetch] = useState(false);

  const refetchTransaction = () => {
    setCallFetch(!callFetch);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = getToken();

        const res = await axios.get(
          "/transactions?method=withdraw&status=pending",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { result } = res.data;
        setTransactions(result);
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: "EN: Load transaction failed",
          confirmButtonColor: "#6ee3a5",
        });
      }
    })();
  }, [callFetch]);

  const convertDate = (date: string) => {
    return new Date(date).toLocaleString("th-TH");
  };

  const handleUpdateStatusTransaction = async (
    transaction: TransactionType,
    status: string
  ) => {
    try {
      const token = getToken();

      await axios.put(
        `/users/${transaction.userId}/transactions/${transaction.id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refetchTransaction()
      
      Swal.fire({
        icon: "success",
        text: `EN: Update status transaction success`,
        confirmButtonColor: "#6ee3a5",
      })

    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        text: "EN: Approve transaction failed, please try again",
        confirmButtonColor: "#6ee3a5",
      });
    }
  };

  return (
    <div>
      <Header title="EN: Admin Manage Transaction" />
      <Stack gap="16px" style={{ padding: "16px 24px 24px 24px" }}>
        <Flex justify={"end"}>
          <Button color="cyan" onClick={refetchTransaction}>
            Refresh
          </Button>
        </Flex>
        <SimpleGrid cols={2}>
          {transactions?.map((transaction) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={transaction.id}
            >
              <Stack>
                <Flex justify={"space-between"} align={"center"}>
                  <p>User id: {transaction.userId}</p>
                  <Badge color="yellow">{transaction.status}</Badge>
                </Flex>
                <p>Method: {transaction.method}</p>
                <p>Amount: {transaction.amount * -1}</p>
                <p>Date: {convertDate(transaction.createdAt)}</p>
              </Stack>

              <Flex gap={"xs"}>
                <Button
                  color="green"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() =>
                    handleUpdateStatusTransaction(transaction, "success")
                  }
                >
                  Approve
                </Button>
                <Button
                  color="red"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() =>
                    handleUpdateStatusTransaction(transaction, "failed")
                  }
                >
                  Reject
                </Button>
              </Flex>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </div>
  );
};

export default ManageTransactionPage;
