import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Input, InputAdornment } from "@mui/material";
import { Send } from "@mui/icons-material";
// import PropTypes from "prop-types";
import { Message } from "./message";
import { useStyles } from "./use-styles";

const BOT_ANSWER = {
  0: "0000",
  1: "11111",
  2: "2222",
  3: "3333",
  4: "4444",
};

const getBotAnswer = (message) => {
  const answers = {
    0: "0000",
    1: "11111",
    2: "2222",
    3: "3333",
    4: "4444",
  };

  return answers[message] || "not found answer";
};
// @TODO сделать value для каждой комнаты отдельно
// @TODO в сообщениях выводить дату сообщения (date-fns/moment js)

// ! все состояние подянть наверх !
// @TODO в названия комнат выводить послежнее сообщение комнаты

export const MessageList = () => {
  const s = useStyles();
  const { roomId } = useParams();
  const ref = useRef(null);

  const [messageList, setMessageList] = useState({
    room1: [
      { author: "User", message: "value 1", date: new Date() },
      { author: "Bot", message: "value 2", date: new Date() },
    ],
  });
  const [value, setValue] = useState("");

  const sendMessage = useCallback(
    (message, author = "User") => {
      if (message) {
        setMessageList((state) => ({
          ...state,
          [roomId]: [
            ...(state[roomId] ?? []),
            { author, message, date: new Date() },
          ],
        }));
        setValue("");
      }
    },
    [roomId]
  );

  const handlePressInput = ({ code }) => {
    if (code === "Enter") {
      sendMessage(value);
    }
  };

  const handleScrollBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    handleScrollBottom();
  }, [messageList, handleScrollBottom]);

  useEffect(() => {
    const messages = messageList[roomId] ?? [];
    const lastMessage = messages[messages.length - 1];

    if (messages.length && lastMessage.author === "User") {
      setTimeout(() => {
        sendMessage(getBotAnswer(lastMessage.message), "Bot");
        // sendMessage(BOT_ANSWER[Math.floor(Math.random() * 4)], "Bot");
      }, 500);
    }
  }, [messageList, roomId, sendMessage]);

  const messages = messageList[roomId] ?? [];

  return (
    <>
      <div ref={ref}>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>

      <Input
        className={s.input}
        fullWidth
        placeholder="Введите сообщение..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handlePressInput}
        endAdornment={
          <InputAdornment position="end">
            {value && (
              <Send onClick={() => sendMessage(value)} className={s.icon} />
            )}
          </InputAdornment>
        }
      />
    </>
  );
};

// MessageList.propTypes = {
//   test1: PropTypes.number.isRequired,
//   test2: PropTypes.array.isRequired,
//   test3: PropTypes.bool.isRequired,
//   test4: PropTypes.shape({
//     id: PropTypes.bool.isRequired,
//   }).isRequired,
//   test5: PropTypes.func.isRequired,
// };
