import React, { Suspense } from "react";
import Header from "~/components/Header";
const Chat = React.lazy(() => import("~/components/Chat"));

const ChatPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<>loading...</>}>
        <Chat />
      </Suspense>
    </div>
  );
};

export default ChatPage;
