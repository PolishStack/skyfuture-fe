import Header from "../component/Header";
import { Box, Button, Center, Input, Stack } from "@mantine/core";
import { useAppSelector } from "../hooks/store";

const WithdrawPointPage = () => {
  const { point: userPoint } = useAppSelector((state) => state.user);
  return (
    <>
      <Header title="Rút điểm" />
      <Stack style={{ height: "100vh", padding: "20px 24px 0px 24px" }}>
        <Box>
          <p style={{ margin: "0px" }}>Số điểm hiện có: {userPoint} đ</p>
          <Input placeholder="Nhập số điểm cần rút" />
        </Box>
        <Center>
          <Button
            variant="gradient"
            style={{ paddingLeft: "25px", paddingRight: "25px" }}
            gradient={{
              from: "teal",
              to: "rgba(240, 240, 240, 1)",
              deg: 180,
            }}
          >
            Xác nhận
          </Button>
        </Center>
      </Stack>
    </>
  );
};

export default WithdrawPointPage;
