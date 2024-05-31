import { useEffect, useState } from "react";
import Header from "../../component/Header";
import {
  Badge,
  Button,
  Card,
  Flex,
  Modal,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { TransactionType } from "../../services/api/type";
import Swal from "sweetalert2";
import axios from "../../services/api";
import { getToken } from "../../utils/helpers";
import { useDisclosure } from "@mantine/hooks";
import { User } from "../../features/user/type";

const ManageTransactionPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[] | null>(
    null
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);
  const [callFetch, setCallFetch] = useState(false);
  const [
    openedApproveModal,
    { open: openApproveModal, close: closeApproveModal },
  ] = useDisclosure(false);
  const [
    openedRejectModal,
    { open: openRejectModal, close: closeRejectModal },
  ] = useDisclosure(false);

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
          text: "Tải giao dịch không thành công",
          confirmButtonColor: "#6ee3a5",
        });
      }
    })();
  }, [callFetch]);

  const convertDate = (date: string) => {
    return new Date(date).toLocaleString("th-TH");
  };

  const handleUpdateStatusTransaction = async (status: string) => {
    try {
      const token = getToken();

      await axios.put(
        `/users/${selectedTransaction?.userId}/transactions/${selectedTransaction?.id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refetchTransaction();

      if (status == "success") {
        closeApproveModal();
      } else if (status == "failed") {
        closeRejectModal();
      }

      Swal.fire({
        icon: "success",
        text: `Cập nhật trạng thái giao dịch thành công`,
        confirmButtonColor: "#6ee3a5",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        text: "Phê duyệt giao dịch không thành công, vui lòng thử lại",
        confirmButtonColor: "#6ee3a5",
      });
    }
  };

  const handleApproveTransaction = async (transactinon: TransactionType) => {
    try {
      const token = getToken();
      const res = await axios.get(`/users/${transactinon.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { result } = res.data;
      setSelectedUser(result);
      setSelectedTransaction(transactinon);
      openApproveModal();
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        text: "EN: Failed to load bank information",
        confirmButtonColor: "#6ee3a5",
      });
    }
  };

  return (
    <div>
      <Header title="Quản trị viên Quản lý giao dịch" />
      <Stack gap="16px" style={{ padding: "16px 24px 24px 24px" }}>
        <Flex justify={"end"}>
          <Button color="cyan" onClick={refetchTransaction}>
            Refresh
          </Button>
        </Flex>
        {transactions === null ? (
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} h={176}>
                <Card shadow="sm" padding="lg" radius="md"></Card>
              </Skeleton>
            ))}
          </SimpleGrid>
        ) : transactions.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {transactions.map((transaction) => (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                key={transaction.id}
              >
                <Stack gap={4}>
                  <Flex justify={"space-between"} align={"center"}>
                    <Text>User id: {transaction.userId}</Text>
                    <Badge color="yellow">{transaction.status}</Badge>
                  </Flex>
                  <Text>Method: {transaction.method}</Text>
                  <Text>Amount: {transaction.amount * -1}</Text>
                  <Text>Date: {convertDate(transaction.createdAt)}</Text>
                </Stack>

                <Flex gap={"xs"}>
                  <Button
                    color="green"
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={() => handleApproveTransaction(transaction)}
                  >
                    Approve
                  </Button>
                  <Button
                    color="red"
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={() => {
                      setSelectedTransaction(transaction);
                      openRejectModal();
                    }}
                  >
                    Reject
                  </Button>
                </Flex>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Badge variant="light" color="grey" mx="auto" mt="lg">
            Không tìm thấy thông tin
          </Badge>
        )}
      </Stack>

      <Modal
        opened={openedApproveModal}
        onClose={closeApproveModal}
        title={<h3>EN: Confirm approve transaction</h3>}
        centered
      >
        <Stack>
          <Flex align={"center"} gap={10}>
            <h4>EN: Bank name:</h4>
            <p>{selectedUser?.bankName}</p>
          </Flex>
          <Flex align={"center"} gap={10}>
            <h4>EN: Account number:</h4>
            <p>{selectedUser?.accountNumber}</p>
          </Flex>
          <Flex align={"center"} gap={10}>
            <h4>EN: Account holder:</h4>
            <p>{selectedUser?.accountHolder}</p>
          </Flex>
          <Flex align={"center"} justify={"end"} gap={10}>
            <Button
              color="green"
              onClick={() => handleUpdateStatusTransaction("success")}
            >
              Confirm
            </Button>
            <Button color="red" onClick={closeApproveModal}>
              Cancel
            </Button>
          </Flex>
        </Stack>
      </Modal>

      <Modal
        opened={openedRejectModal}
        onClose={closeRejectModal}
        title={<h3>EN: Confirm reject transaction</h3>}
        centered
      >
        <Stack>
          <p>EN: Are you sure to reject this transacion ?</p>
          <Flex align={"center"} justify={"end"} gap={10}>
            <Button
              color="green"
              onClick={() => handleUpdateStatusTransaction("failed")}
            >
              Confirm
            </Button>
            <Button color="red" onClick={closeRejectModal}>
              Cancel
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </div>
  );
};

export default ManageTransactionPage;
