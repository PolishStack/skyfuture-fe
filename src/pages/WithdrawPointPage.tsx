import Header from "../component/Header";
import { Box, Button, Center, Input, Stack } from "@mantine/core";
import { useAppSelector } from "../hooks/store";

const WithdrawPointPage = () => {
  const { point: userPoint } = useAppSelector((state) => state.user);
  return (
    <>
      <Header title="Draw points" />
      <Stack style={{ height: "100vh", padding: "20px 24px 0px 24px" }}>
        <Box>
          <p style={{ margin: "0px" }}>Avalible points: {userPoint} đ</p>
          <Input placeholder="Enter the number of points to withdraw" />
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
            Confirm
          </Button>
        </Center>
      </Stack>
    </>
  );
};

export default WithdrawPointPage;
