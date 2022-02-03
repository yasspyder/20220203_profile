import { List } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Chat } from "./chat";

export const ChatList = () => {
  const [chats] = useState(["room1", "room2", "room3"]);

  const { roomId } = useParams();

  return (
    <List component="nav">
      {chats.map((chat) => (
        <Link key={chat} to={`/chat/${chat}`}>
          <Chat title={chat} selected={roomId === chat} />
        </Link>
      ))}
    </List>
  );
};
