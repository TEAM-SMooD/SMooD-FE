import React, { useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import { BsChevronCompactRight } from "react-icons/bs";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getLastchat } from "../api/chatAxios";

const stompClient = Stomp.over(
    () => new SockJS(`${process.env.REACT_APP_WS_URL}`)
);
const ChatLiEach = ({ eachChat }: any) => {
    const [chatLastChat, setchatLastChat] = useState("");
    useEffect(() => {
        getLastchat(eachChat.roomId).then((e) => setchatLastChat(e));
    }, []);

    return (
        <div className={CommunityStyle.chatLiEach}>
            <div
                style={{
                    margin: "0 5px",
                }}
            >
                👥
            </div>
            <div style={{ flex: "1 1 0px" }}>
                <div className={CommunityStyle.chatLiTitle}>
                    {eachChat.roomName}
                </div>
                <div className={CommunityStyle.chatLiText}>{chatLastChat}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <BsChevronCompactRight />
            </div>
        </div>
    );
};
export default ChatLiEach;
