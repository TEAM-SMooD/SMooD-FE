import React, { useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import { BsChevronCompactRight } from "react-icons/bs";
import axios from "axios";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const stompClient = Stomp.over(
    () => new SockJS(`${process.env.REACT_APP_WS_URL}`)
);
const ChatLiEach = (e: any) => {
    // console.log("ChatLiEach호출", e);
    const [chatLastChat, setchatLastChat] = useState("");

    const getLastchat = async (eachRoomId: string) => {
        try {
            const resLast = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/chatting`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                    params: {
                        roomId: eachRoomId,
                    },
                }
            );
            setchatLastChat(
                resLast.data.body.result[resLast.data.body.result.length - 1]
                    .message
            );
            // console.log(
            //     e.e.roomName,
            //     "resLastRESR 마지막톡res",
            //     resLast.data.body.result[resLast.data.body.result.length - 1]
            //         .message
            // );
        } catch {
            console.log("resLastRESR 마지막톡res 없음", e.e.roomName);
        }
    };

    useEffect(() => {
        getLastchat(e.e.roomId);
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
                <div className={CommunityStyle.chatLiTitle}>{e.e.roomName}</div>
                <div className={CommunityStyle.chatLiText}>{chatLastChat}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <BsChevronCompactRight />
            </div>
        </div>
    );
};
export default ChatLiEach;
