import { useEffect, useState } from "react";
import Header from "../../component/Header";
import {
  Autocomplete,
  Badge,
  Button,
  Card,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import Swal from "sweetalert2";
import axios from "../../services/api";
import { getToken } from "../../utils/helpers";
import { User } from "../../features/user/type";
import { useNavigate } from "react-router-dom";

const ManageUsersPage = () => {
  const [users, setUsers] = useState<User[] | null>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const token = getToken();

        const res = await axios.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { result } = res.data;
        setUsers(result);
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          text: "Tải giao dịch không thành công",
          confirmButtonColor: "#6ee3a5",
        });
      }
    })();
  }, []);

  return (
    <div>
      <Header title="Quản lý người dùng" />
      <Stack gap="16px" style={{ padding: "16px 24px 24px 24px" }}>
        <Autocomplete
          data={users ? users.map((user) => user.id.toString()) : []}
          value={selectedUserId.toString()}
          onChange={setSelectedUserId}
          limit={5}
        />
        {users === null ? (
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} h={176}>
                <Card shadow="sm" padding="lg" radius="md"></Card>
              </Skeleton>
            ))}
          </SimpleGrid>
        ) : users.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {users
              .slice(0, Math.min(users.length, 50))
              .filter((user) => user.id.toString().includes(selectedUserId))
              .map((user) => (
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  key={user.id}
                >
                  <Stack gap={4}>
                    <Text>User id: {user.id}</Text>
                    <Text>Phone: {user.phone}</Text>
                    <Text>Point: {user.point}</Text>
                  </Stack>
                  <Flex gap={"xs"}>
                    <Button
                      color="blue"
                      fullWidth
                      mt="md"
                      radius="md"
                      onClick={() =>
                        navigate(`/app/admin/manage-user/${user.id}`)
                      }
                    >
                      More
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
    </div>
  );
};

export default ManageUsersPage;
