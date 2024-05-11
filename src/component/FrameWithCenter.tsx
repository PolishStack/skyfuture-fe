import { Center, Flex, NavLink, Stack } from "@mantine/core";
import React from "react";
import { IoMdDownload } from "react-icons/io";
import { Link, NavLink as RouterNavLink } from "react-router-dom";

const FrameWithCenter = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <Center style={{ width: "100%", height: "100%" }} bg={"#f2f2f2"}>
        <Stack
          style={{
            width: "540px",
            height: "100vh",
            boxShadow:
              "0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
          bg={"white"}
        >
          <Center
            bg={"#87f3d9"}
            style={{ padding: "8px", fontSize: "18px", position: "relative" }}
          >
            <b>{title}</b>
            <Link
              to={"/individual"}
              style={{
                position: "absolute",
                right: "0",
                textDecorationLine: "none",
              }}
            >
              X
            </Link>
          </Center>
          {children}
          <Flex>
            <NavLink
              bg={"linear-gradient(180deg,#71d2a7,#94e3ce)"}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              renderRoot={({ _, ...others }) => (
                <RouterNavLink to={`/`} {...others} />
              )}
              label={"Homepage"}
              leftSection={<IoMdDownload />}
            />
            <NavLink
              bg={"linear-gradient(180deg,#71d2a7,#94e3ce)"}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              renderRoot={({ _, ...others }) => (
                <RouterNavLink to={`/individual`} {...others} />
              )}
              label={"individual"}
              leftSection={<IoMdDownload />}
            />
            <NavLink
              bg={"linear-gradient(180deg,#71d2a7,#94e3ce)"}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              renderRoot={({ _, ...others }) => (
                <RouterNavLink to={`/`} {...others} />
              )}
              label={"Customer Service"}
              leftSection={<IoMdDownload />}
            />
          </Flex>
        </Stack>
      </Center>
    </>
  );
};

export default FrameWithCenter;
