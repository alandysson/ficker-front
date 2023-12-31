// "use client";
import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ConfigProvider } from "antd";
import StyledComponentsRegistry from "./lib/AntdRegistry";
import theme from "./theme/themeConfig";
import { MainProvider } from "@/context";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ficker",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <MainProvider>
      <ConfigProvider theme={theme}>
        <body>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </ConfigProvider>
    </MainProvider>
  </html>
);

export default RootLayout;
