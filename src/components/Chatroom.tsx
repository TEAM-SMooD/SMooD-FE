import React, { useCallback, useEffect, useRef, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

const Chatroom = (chatEach: any) => {
    console.log("CHATREOOMEACH'", chatEach);
    const [inputchat, setInputchat] = useState("");
    const [chatAll, setChatAll] = useState([]);
    console.log("chalall", chatAll);
    function handleChangeChat(e: React.FormEvent<HTMLInputElement>) {
        setInputchat(e.currentTarget.value);
    }
    function handleSubmitChat(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        sendMessage(e);
        console.log("채팅전송"); //서버연결 필요!
        // getChatting();
        setInputchat("");
    }
    const messageBoxRef = useRef<HTMLDivElement>(null);
    // 채팅창은 항상 아래로
    const scrollToBottom = () => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop =
                messageBoxRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        console.log("지금실행");
        scrollToBottom();
    }, []);
    const stompClient = Stomp.over(
        () => new SockJS(`${process.env.REACT_APP_WS_URL}`)
    );

    const sendMessage = (e: any) => {
        e.preventDefault();
        stompClient.connect(
            {},
            () => {
                console.log(chatEach.chatEach, "보낼메세지", inputchat);
                if (stompClient) {
                    stompClient.send(
                        "/pub/chatting/project",
                        {},
                        JSON.stringify({
                            senderLoginId: sessionStorage.getItem("userId"),
                            nickname: sessionStorage.getItem("nickname"),
                            message: inputchat,
                            roomId: chatEach.chatEach,
                        })
                    );
                }
                // getChatting();
            },
            () => {
                console.log("senMEssageconnect에러");
            }
        );
    };

    const getChatting = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/chatting`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                    params: {
                        roomId: chatEach.chatEach,
                    },
                }
            );
            console.log("getchatting특정채팅방조회", res.data);
            setChatAll(res.data.body.result);
        } catch (err) {
            console.log("getChatRoomsERR", err);
        }
    };
    // useEffect(() => {
    //     getChatting();
    // }, []);
    // getChatting();
    return (
        <>
            <div
                className={CommunityStyle.chatroomContents}
                ref={messageBoxRef}
            >
                <div>시작</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>

                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>

                <div>1</div>
                <div className={CommunityStyle.chatMeWrap}>
                    <div className={CommunityStyle.chatMe}>zxczx</div>
                </div>
                <div className={CommunityStyle.chatTheyWrap}>
                    <div className={CommunityStyle.chatThey}>1</div>
                    <div className={CommunityStyle.chatThey}>2</div>
                    <div className={CommunityStyle.chatThey}>3</div>
                    <div className={CommunityStyle.chatThey}>14</div>
                </div>
                {chatAll &&
                    chatAll.map((e: any, i: number) =>
                        e.senderLoginId == sessionStorage.getItem("userId") ? (
                            <div className={CommunityStyle.chatMeWrap} key={i}>
                                <div className={CommunityStyle.chatMe}>
                                    {e.message}
                                </div>
                                <div className={CommunityStyle.chatMeTime}>
                                    {e.dateTime}
                                </div>
                            </div>
                        ) : (
                            <div
                                className={CommunityStyle.chatTheyWrap}
                                key={i}
                            >
                                <div className={CommunityStyle.chatThey}>
                                    {e.message}
                                </div>
                                <div className={CommunityStyle.chatTheyTime}>
                                    {e.dateTime}
                                </div>
                            </div>
                        )
                    )}

                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>끝</div>
            </div>

            <div className={CommunityStyle.chatroomInputWrap}>
                <form style={{ height: "100%" }}>
                    <input
                        type="text"
                        onChange={handleChangeChat}
                        value={inputchat}
                        className={CommunityStyle.sendInput}
                    ></input>
                    <button
                        type="submit"
                        onClick={(e: any) => {
                            handleSubmitChat(e);
                        }}
                        className={CommunityStyle.sendBtn}
                    >
                        전송
                    </button>
                </form>
            </div>
        </>
    );
};
export default Chatroom;
