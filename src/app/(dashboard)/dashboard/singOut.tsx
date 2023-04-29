"use client";
import { signOut } from "next-auth/react";
import { FC } from "react";

interface singOutProps {}

const singOut: FC<singOutProps> = ({}) => {
  return (
    <div onClick={() => signOut()} className="cursor-pointer bg-rose-500 p-4">
      singOut
    </div>
  );
};

export default singOut;
