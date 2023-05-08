import AddFriendClient from "@/components/AddFriendClient";
import { FC } from "react";

const page: FC = () => {
  return (
    <main className="pt-8">
      <h1 className="font-bold text-5xl mb-8 text-center">Add a friend</h1>
      <AddFriendClient />
    </main>
  );
};

export default page;
