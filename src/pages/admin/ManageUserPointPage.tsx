import React from "react";
import Header from "../../component/Header";
import Swal from "sweetalert2";
import axios from "../../services/api";
import { getToken } from "../../utils/helpers";
import { useForm } from "@mantine/form";
import { Box, Button, Center, NumberInput } from "@mantine/core";

const ManageUserPointPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      userId: null,
      amount: 0,
      method: "",
    },
  });

  const handleOnFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { userId, amount } = form.getValues();
    if (!userId) {
      Swal.fire({
        icon: "error",
        text: "Không tìm thấy người dùng",
        confirmButtonColor: "#6EE3A5",
      });
      return;
    }
    if (amount < 1) {
      Swal.fire({
        icon: "error",
        text: "Rút tiền phải lớn hơn 0",
        confirmButtonColor: "#6EE3A5",
      });
      return;
    }

    try {
      const token = getToken();
      await axios.post(
        `/users/${userId}/transactions`,
        {
          amount,
          status: "success",
          method: "withdraw",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        text: "Tạo yêu cầu rút tiền thành công",
        confirmButtonColor: "#6EE3A5",
        timer: 2000,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Không thể tạo yêu cầu rút tiền thành công",
        confirmButtonColor: "#6EE3A5",
      });
      console.log(err);
    }
  };
  return (
    <>
      <Header title="EN: Add user point" />
      <Box>
        <NumberInput
          placeholder="Nhập số điểm cần rút"
          withAsterisk
          allowNegative={false}
          allowDecimal={false}
          hideControls
          key={form.key("userId")}
          {...form.getInputProps("userId")}
        />
        <NumberInput
          placeholder="Nhập số điểm cần rút"
          withAsterisk
          allowNegative={false}
          allowDecimal={false}
          key={form.key("amount")}
          {...form.getInputProps("amount")}
        />
      </Box>
      <Center>
        <Button
          onClick={(e) => handleOnFormSubmit(e)}
          variant="gradient"
          style={{ paddingLeft: "25px", paddingRight: "25px" }}
          gradient={{
            from: "teal",
            to: "rgba(240, 240, 240, 1)",
            deg: 180,
          }}
        >
          EN: submit
        </Button>
      </Center>
    </>
  );
};

export default ManageUserPointPage;
