import { Button, Stack, Title } from "@mantine/core";
import { AiOutlinePartition } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";
import { SlPresent } from "react-icons/sl";
import { Link } from "react-router-dom";

const UserHistoryList = ({ userId }: { userId: number }) => {
  const menuList = [
    {
      title: "Lịch sử tham gia",
      href: `/app/admin/manage-user/${userId}/participation_history`,
      icon: <AiOutlinePartition />,
    },
    {
      title: "Lịch sử nhận thưởng",
      href: `/app/admin/manage-user/${userId}/reward_history`,
      icon: <SlPresent />,
    },
    {
      title: "Lịch sử nạp",
      href: `/app/admin/manage-user/${userId}/deposit_history`,
      icon: <PiHandDeposit />,
    },
    {
      title: "Lịch sử rút",
      href: `/app/admin/manage-user/${userId}/withdrawal_history`,
      icon: <PiHandWithdraw />,
    },
  ];
  return (
    <>
      <Title order={3} ta="center" mt={24}>
        User's history
      </Title>
      <Stack
        style={{
          fontSize: "18px",
          height: "100%",
          marginTop: "8px",
        }}
        gap={3}
      >
        {menuList.map(
          (menu: { title: string; href: string; icon: React.ReactNode }) => (
            <Link
              to={menu.title !== "Đăng xuất" ? menu.href : ""}
              style={{ textDecorationLine: "none" }}
              key={menu.href}
            >
              <Button
                fullWidth
                leftSection={menu.icon}
                variant="transparent"
                justify="flex-start"
                size="lg"
                color="#444"
                style={{
                  fontSize: "16px",
                  fontWeight: "normal",
                  position: "relative",
                }}
              >
                {menu.title}
                <IoIosArrowForward
                  style={{ position: "absolute", right: "26px" }}
                />
              </Button>
            </Link>
          )
        )}
      </Stack>
    </>
  );
};

export default UserHistoryList;
