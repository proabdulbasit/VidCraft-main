// "use client";

import React, { useEffect, useState } from "react";
import { Navbar, Button, Text } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.js";
import { useRouter } from "next/navigation";
import Link from 'next/link'

export default function NavbarComponent() {
  const router = useRouter();
  const { pathname, setPathname } = useState("/");

  useEffect(() => {
    if (router.asPath !== router.route) {
      setPathname(router.pathname);
      console.log("router", router.pathname);
    }
  }, [router]);

  return (
    <Navbar variant="static">
      <Navbar.Brand>
        <Navbar.Content>
          <Navbar.Link href="/">
            <AcmeLogo />
            <Text b color="inherit" hideIn="xs">
              ACME
            </Text>
          </Navbar.Link>
        </Navbar.Content>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="/features" isActive={pathname === "/features"}>
          Features
        </Navbar.Link>
        <Navbar.Link href="/pricing" isActive={pathname === "/pricing"}>
          Pricing
        </Navbar.Link>
        <Navbar.Link
          href="/create-videos"
          isActive={pathname === "/create-videos"}
        >
          Create Videos
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="/login">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="/signup">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
