import React from "react";
import Header from "../../component/Header";
import Swal from "sweetalert2";
import axios from "../../services/api";
import { getToken } from "../../utils/helpers";
import { useForm } from "@mantine/form";
import {
  Button,
  Center,
  Group,
  NumberInput,
  Radio,
  Stack,
  Textarea,
} from "@mantine/core";

interface formValue {
  userId: number;
  amount: number;
  method: "deposit" | "reward";
  description: string;
}
const ManageUserPointPage = () => {
  const form = useForm<formValue>({
    mode: "controlled",
    initialValues: {
      userId: 0,
      amount: 0,
      method: "deposit",
      description:
        "Chúc mừng quý khách mang ID 0 đã trúng giải thưởng ngẫu nhiên trị giá 0 VNĐ. Vui òng liên hệ CSKI để biết thêm ch iết.",
    },
    validate: {
      amount: (amount) =>
        amount < 1 ? "Số tiền phải lớn hơn 0" : null,
    },
  });

  const handleOnFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { userId, amount, method, description } = form.getValues();
    if (!userId) {
      Swal.fire({
        icon: "error",
        text: "Không tìm thấy người dùng",
        confirmButtonColor: "#6EE3A5",
      });
      return;
    }
    if (method === "reward" && !description) {
      form.setFieldError("description", "Vui lòng điền lý do nhận thưởng");
      return;
    }
    if (form.validate().hasErrors) return;
    try {
      const token = getToken();

      await axios.post(
        `/users/${userId}/transactions`,
        {
          userId,
          amount,
          status: method === "deposit" ? "success" : "pending",
          method,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        text: "gửi từ thành công",
        confirmButtonColor: "#6EE3A5",
        timer: 2000,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Không thể gửi biểu mẫu",
        confirmButtonColor: "#6EE3A5",
      });
      console.log(err);
    }
  };

  return (
    <>
      <Header title="Thêm điểm người dùng" />
      <Stack gap={8} px={16} mt={16}>
        <NumberInput
          label="tên id người dùng"
          placeholder="nhập id người dùng"
          allowNegative={false}
          allowDecimal={false}
          hideControls
          withAsterisk
          key={form.key("userId")}
          {...form.getInputProps("userId")}
        />
        <NumberInput
          label="Số lượng:"
          placeholder="Nhập số lượng"
          allowNegative={false}
          allowDecimal={false}
          withAsterisk
          key={form.key("amount")}
          {...form.getInputProps("amount")}
        />
        <Radio.Group
          label="method:"
          name="method"
          withAsterisk
          key={form.key("method")}
          {...form.getInputProps("method")}
        >
          <Group>
            <Radio value="deposit" label="Deposit" />
            <Radio value="reward" label="Reward" />
          </Group>
        </Radio.Group>
        {form.getValues().method === "reward" && (
          <Textarea
            label="description:"
            name="description"
            autosize
            minRows={3}
            maxRows={6}
            withAsterisk
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
        )}
        <Center mt="16px">
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
            nộp
          </Button>
        </Center>
      </Stack>
    </>
  );
};

export default ManageUserPointPage;
