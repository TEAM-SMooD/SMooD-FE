import React, { useCallback, useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import chatlogo from "../assets/main_logo_smood.png";
import mainchatlogo from "../assets/main_logo_chat.png";
import { VscChromeClose, VscChevronLeft } from "react-icons/vsc";
import { CgChevronLeft } from "react-icons/cg";
import Chatroom from "./Chatroom";
import ChatLiEach from "./ChatLiEach";
import ChatroomMake from "./ChatroomMake";
import { useNavigate } from "react-router-dom";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { BsChevronCompactRight } from "react-icons/bs";

const stompClient = Stomp.over(
    () => new SockJS(`${process.env.REACT_APP_WS_URL}`)
);
const Chat = () => {
    const [chatopen, setChatopen] = useState(false);
    const [chatEach, setChatEach] = useState(0); //목록화면에서 0 , 각각톡방안들어가면 톡방번호
    const navigate = useNavigate();
    const [chatRooms, setChatRooms] = useState([]);
    const [chatLastChat, setchatLastChat] = useState<string[]>(["!"]);
    console.log("chatLastChat", chatLastChat);
    const getLastchat = async (eachRoomId: string) => {
        const resLast = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/chatting`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                params: {
                    roomId: eachRoomId,
                },
            }
        );
        setchatLastChat([
            ...chatLastChat,
            resLast.data.body.result[resLast.data.body.result.length - 1]
                .message,
        ]);
        console.log(
            "resLastRESR 마지막톡res",
            resLast.data.body.result[resLast.data.body.result.length - 1]
                .message
        );
        // setchatLastChat([...chatLastChat, resLast.data.body.messages]);
    };

    const getChatRooms = useCallback(async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/chat/rooms`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log("getChatRooms res", res.data.body.result);
            setChatRooms(res.data.body.result);
            res.data.body.result.map((e: any, i: number) => {
                console.log("e.roomID :", e.roomId);
                getLastchat(e.roomId);
            });
        } catch (err) {
            console.log("getChatRoomsERR", err);
        }
    }, []);
    const joinChatting = useCallback((e: any) => {
        console.log("JJJONOONININI", e);
        stompClient.connect({}, onConnected, onError);
        setChatEach(
            e.roomId
            // !!!!!!!!!!!룸아이디고쳐조 근데 인덱스시작 0부터면 안됨.. chatEach==0인건 채팅첫화면이라고 설정해서
        );
        // stompClient.connect({}, onConnected(e.roomId), onError);
        ///  연결시도. 첫인자: 같이전송할헤더, 성공하면실행할콜백함수, 실패시콜백함수
    }, []);

    // 연결에 성공한 경우
    const onConnected = useCallback((roomId: any) => {
        console.log("채팅방 onConnected!");
        stompClient.subscribe("/sub/chatting/", onMessageReceived);
    }, []);
    const onMessageReceived = useCallback((payload: any) => {
        /////////payload의 타입이 무엇일까
        const message = JSON.parse(payload.body);
        console.log("onMessageReceived ㅅㅅ서ㅓㅇ공");
        // if (message.type === "JOIN" && message.sender === sender) {
        //     setIsJoin(true);
        //     message.history.map((msg: string) =>
        //         setChatHistory((chatHistory) => [...chatHistory, msg])
        //     );
        // } else {
        //     setChatHistory((chatHistory) => [...chatHistory, message]);
        // }
    }, []);
    // 연결에 실패한 경우
    const onError = useCallback((error: any) => {
        console.log("연결실패", error);
    }, []);

    useEffect(() => {
        getChatRooms();
    }, [chatEach]);
    // 플로팅 버튼 눌렀을때 로그인되잇는 상황이라면 getChatRooms()가 실행될수있게 이렇게 빼냄

    // useEffect(() => {
    //     const getChatRooms = async () => {
    //         try {
    //             const res = await axios.get(
    //                 `${process.env.REACT_APP_SERVER_URL}/chat/rooms`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${sessionStorage.getItem(
    //                             "token"
    //                         )}`,
    //                     },
    //                 }
    //             );
    //             console.log(res);
    //         } catch (err) {
    //             console.log("ERR", err);
    //         }
    //     };
    //     getChatRooms();
    // }, []);
    return (
        <>
            <div className={CommunityStyle.chatFloating}>
                {chatopen ? (
                    <div className={CommunityStyle.chatScreenWrap}>
                        <div className={CommunityStyle.chatInnerWrap}>
                            <div className={CommunityStyle.chatHeader}>
                                <div
                                    className={
                                        CommunityStyle.chatHeaderInnerWrap
                                    }
                                >
                                    <div
                                        className={
                                            CommunityStyle.chatHeaderLeft
                                        }
                                    >
                                        {chatEach == 0 ? (
                                            <img
                                                src={chatlogo}
                                                style={{
                                                    width: "2rem",
                                                    margin: " 0 0.5rem",
                                                }}
                                            />
                                        ) : (
                                            <CgChevronLeft
                                                onClick={() => setChatEach(0)}
                                                style={{
                                                    width: "2rem",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        )}
                                        <h3>스무디톡</h3>
                                    </div>
                                </div>
                                <div
                                    onClick={() => {
                                        setChatopen(!chatopen);
                                        setChatEach(0);
                                    }}
                                    className={CommunityStyle.chatClosebtnWrap}
                                >
                                    <VscChromeClose />
                                </div>
                            </div>
                            {chatEach == 0 ? (
                                <>
                                    <div
                                        className={CommunityStyle.chatBodyWrap}
                                    >
                                        <div
                                            className={CommunityStyle.chatBody}
                                        >
                                            <div
                                                className={
                                                    CommunityStyle.chatBodyList
                                                }
                                            >
                                                <div>채팅방 목록</div>
                                            </div>

                                            <ol
                                                className={
                                                    CommunityStyle.chatOl
                                                }
                                            >
                                                {chatRooms &&
                                                    chatRooms.map(
                                                        (e: any, i: number) => (
                                                            <li
                                                                onClick={() => {
                                                                    joinChatting(
                                                                        e
                                                                    );
                                                                }}
                                                                key={i}
                                                            >
                                                                <div
                                                                    className={
                                                                        CommunityStyle.chatLiEach
                                                                    }
                                                                >
                                                                    <div
                                                                        style={{
                                                                            margin: "0 5px",
                                                                        }}
                                                                    >
                                                                        👥
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            flex: "1 1 0px",
                                                                        }}
                                                                    >
                                                                        <div
                                                                            className={
                                                                                CommunityStyle.chatLiTitle
                                                                            }
                                                                        >
                                                                            {
                                                                                e.roomName
                                                                            }
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                CommunityStyle.chatLiText
                                                                            }
                                                                        >
                                                                            {
                                                                                chatLastChat[1]
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            alignItems:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <BsChevronCompactRight />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                            </ol>
                                        </div>
                                    </div>
                                    <div
                                        className={CommunityStyle.chatBodyWrap}
                                    >
                                        <div
                                            className={CommunityStyle.chatBody}
                                        >
                                            <div
                                                className={
                                                    CommunityStyle.chatBodyList
                                                }
                                            >
                                                새로운 채팅방을 만들 수 있어요!
                                            </div>
                                            <div>
                                                <div
                                                    onClick={() => {
                                                        if (
                                                            !sessionStorage.getItem(
                                                                "userId"
                                                            )
                                                        ) {
                                                            alert(
                                                                "로그인이 필요한 기능입니다. 로그인 페이지로 이동합니다"
                                                            );
                                                            navigate(
                                                                "/mylogin"
                                                            );
                                                        } else {
                                                            setChatEach(-1);
                                                        }
                                                    }}
                                                    className={
                                                        CommunityStyle.makenewchat
                                                    }
                                                >
                                                    ➕ 새로운 채팅방 만들기
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : chatEach == -1 ? (
                                // 채팅방 만들기인경우
                                <ChatroomMake
                                    chatEach={chatEach}
                                    setChatEach={setChatEach}
                                />
                            ) : (
                                // 어떤 채팅방 하나 들어간 경우
                                <Chatroom
                                    chatEach={chatEach}
                                    stompClient={stompClient}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    // 채팅플로팅아이콘만 있는 상태 (=초기상태)
                    <div
                        className={CommunityStyle.chatIconWrap}
                        onClick={() => {
                            if (sessionStorage.getItem("token")) {
                                setChatopen(!chatopen);
                            } else {
                                alert(
                                    "로그인이 필요한 기능입니다. 로그인 페이지로 이동합니다"
                                );
                                navigate("/mylogin");
                            }
                        }}
                    >
                        <img src={mainchatlogo} style={{ width: "35px" }} />
                    </div>
                )}
            </div>
        </>
    );
};
export default Chat;
