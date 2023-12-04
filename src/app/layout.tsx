"use client";

import "./globals.css";

import { AuthProvider, useAuth } from "@/config/auth";
import { useEffect, useState } from "react";

import Header from "./components/header";
import Image from "next/image";
import { Inter } from "next/font/google";
import { MdPassword } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Toaster
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className=" pt-12 min-h-screen  ">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
