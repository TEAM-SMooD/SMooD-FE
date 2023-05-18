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
        setInputchat("");
    }
    const messageBoxRef = useRef<HTMLDivElement>(null);
    const here = useRef<HTMLDivElement>(null);
    const inputfocusRef = useRef<HTMLInputElement>(null);
    if (inputfocusRef.current) {
        inputfocusRef.current.focus();
    }
    // 채팅창은 항상 아래로
    const scrollToBottom = () => {
        console.log("ASDFADFDSAFASDFD", here.current);
        // if (here.current) {
        //     here.current.scrollIntoView();
        // }
        // console.log(messageBoxRef.current, "CCCUCUCUUCUCUC");
        // if (messageBoxRef.current) {
        //     console.log(messageBoxRef.current.scrollTop);
        //     console.log(messageBoxRef.current.scrollHeight);

        //     messageBoxRef.current.scrollTop = 300;
        //     // messageBoxRef.current.scrollHeight;
        //     console.log(messageBoxRef.current.scrollTop);
        // }
    };

    if (messageBoxRef.current) {
        console.log(messageBoxRef.current, "CCCUCUCUUCUCUC");
        console.log(messageBoxRef.current.scrollTop);
        console.log(messageBoxRef.current.scrollHeight);
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
    const stompClient = Stomp.over(
        () => new SockJS(`${process.env.REACT_APP_WS_URL}`)
    );

    // 연결에 성공한 경우
    const onConnected = (roomId: any) => {
        console.log("채팅방 onConnected!");
        getChatting();
        stompClient.subscribe("/sub/chatting/" + roomId, onMessageReceived);
    };
    const onMessageReceived = (payload: any) => {
        console.log(JSON.parse(payload.body).message);
        console.log("구독했잖아 !!!!!!!!!!!");
        getChatting();
    };

    // 연결에 실패한 경우
    const onError = useCallback((error: any) => {
        console.log("연결실패", error);
    }, []);
    useEffect(() => {
        stompClient.connect({}, () => onConnected(chatEach.chatEach), onError);
    }, []);

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
            },
            () => {
                console.log("senMEssageconnect에러");
            }
        );
    };

    const getChatting = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/chatting`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                    params: {
                        roomId: chatEach.chatEach,
                        size: 30,
                    },
                }
            );
            console.log("getchatting특정채팅방조회", res.data);
            setChatAll(res.data.body.result);
        } catch (err) {
            console.log("getChatRoomsERR", err);
        }
    };
    return (
        <>
            <div
                className={CommunityStyle.chatroomContents}
                ref={messageBoxRef}
            >
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
                                <div className={CommunityStyle.chatTheyWho}>
                                    {e.nickname}
                                </div>
                                <div
                                    className={CommunityStyle.chatTheyContents}
                                >
                                    <div className={CommunityStyle.chatThey}>
                                        {e.message}
                                    </div>
                                    <div
                                        className={CommunityStyle.chatTheyTime}
                                    >
                                        {e.dateTime}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
            </div>

            <div className={CommunityStyle.chatroomInputWrap}>
                <form style={{ height: "100%" }}>
                    <input
                        type="text"
                        onChange={handleChangeChat}
                        value={inputchat}
                        className={CommunityStyle.sendInput}
                        ref={inputfocusRef}
                    ></input>
                    <button
                        type="submit"
                        onClick={(e: any) => {
                            handleSubmitChat(e);
                        }}
                        className={CommunityStyle.sendBtn}
                        disabled={inputchat == ""}
                    >
                        전송
                    </button>
                </form>
            </div>
        </>
    );
};
export default Chatroom;
