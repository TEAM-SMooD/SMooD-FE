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
    const [chatLastChat, setchatLastChat] = useState<string[]>([]);

    // const getLastchat = async (e: any) => {
    //     const resLast = await axios.get(
    //         `${process.env.REACT_APP_SERVER_URL}/api/chatting`,
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //             },
    //             params: {
    //                 roomId: e.e.roomId,
    //             },
    //         }
    //     );
    //     console.log("asdfadsfdasfafdresesss", resLast);
    //     setchatLastChat([...chatLastChat, "마지마악"]);
    //     // setchatLastChat([...chatLastChat, resLast.data.body.messages]); //지금은 빈배열이라
    // };
    // useEffect(() => {
    //     getLastchat(e);
    // }, []);
    // console.log("CHATLIEACH", e, i, chatLastChat);
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
                <div className={CommunityStyle.chatLiText}>
                    {/* {chatLastChat[-1]} */}
                    마지막챗,,,, {/* {e.e.chatroomText} */}
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <BsChevronCompactRight />
            </div>
        </div>
    );
};
export default ChatLiEach;
