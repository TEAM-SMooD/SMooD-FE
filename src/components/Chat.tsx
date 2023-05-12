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

const chatListDummy = {
    data: [
        {
            chatroomId: 1,
            chatroomTitle: "광진구연합",
            chatroomText: "네 ~",
        },
        {
            chatroomId: 1,
            chatroomTitle: "광진구연합",
            chatroomText: "네 ~",
        },
        {
            chatroomId: 1,
            chatroomTitle: "광진구연합",
            chatroomText: "네 ~",
        },
        {
            chatroomId: 1,
            chatroomTitle: "광진구연합",
            chatroomText: "네 ~",
        },
        {
            chatroomId: 1,
            chatroomTitle: "광진구연합",
            chatroomText: "네 ~",
        },
        {
            chatroomId: 2,
            chatroomTitle: "카페사장모임",
            chatroomText: "ㅇㅋ",
        },
        {
            chatroomId: 3,
            chatroomTitle: "20대",
            chatroomText: "이공이공",
        },
    ],
};

const stompClient = Stomp.over(
    () => new SockJS(`${process.env.REACT_APP_WS_URL}`)
);
const Chat = () => {
    const [chatopen, setChatopen] = useState(false);
    const [chatEach, setChatEach] = useState(0); //목록화면에서 0 , 각각톡방안들어가면 톡방번호
    const navigate = useNavigate();
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
            console.log(res.data.body);
        } catch (err) {
            console.log("ERR", err);
        }
    }, []);
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            getChatRooms();
        }
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
                                                {chatListDummy.data.map(
                                                    (e: any, i: number) => (
                                                        <li
                                                            onClick={() =>
                                                                setChatEach(
                                                                    e.chatroomId
                                                                )
                                                            }
                                                            key={i}
                                                        >
                                                            <ChatLiEach e={e} />
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
                                <Chatroom />
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
                                getChatRooms();
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
