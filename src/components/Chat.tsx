import React, { useCallback, useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import chatlogo from "../assets/main_logo_smood.png";
import mainchatlogo from "../assets/main_logo_chat.png";
import { VscChromeClose } from "react-icons/vsc";
import { CgChevronLeft } from "react-icons/cg";
import ic_trashbin from "../assets/ic_trashbin.png";
import Chatroom from "./Chatroom";
import ChatLiEach from "./ChatLiEach";
import ChatroomMake from "./ChatroomMake";
import { useNavigate } from "react-router-dom";
import { deleteChatRoom, getChatRooms } from "../api/chatAxios";

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
const stompClient = Stomp.over(
    () => new SockJS(`${process.env.REACT_APP_WS_URL}`)
);

const Chat = () => {
    const [chatopen, setChatopen] = useState(false);
    const [chatEach, setChatEach] = useState(0); //목록화면에서 0 , 각각톡방안들어가면 톡방번호
    const navigate = useNavigate();
    const [chatRooms, setChatRooms] = useState([]);
    const [reloading, setReloading] = useState(true);

    const joinChatting = useCallback((e: any) => {
        console.log("joinChatting", e);
        setChatEach(e.roomId);
    }, []);

    // 연결에 성공한 경우
    const onConnected = (roomId: any) => {
        console.log("채팅방 onConnected!");
        stompClient.subscribe("/sub/chatting/" + roomId, onMessageReceived);
    };
    const onMessageReceived = (payload: any) => {
        console.log(JSON.parse(payload.body).message);
        console.log("구독했잖아 !!!!!!!!!!!");
    };

    // 연결에 실패한 경우
    const onError = useCallback((error: any) => {
        console.log("연결실패", error);
    }, []);

    useEffect(() => {
        if (reloading && sessionStorage.getItem("token")) {
            getChatRooms().then((e) => {
                setChatRooms(e);
            });
            setReloading(false);
        }
    }, [reloading]);

    // 플로팅 버튼 눌렀을때 로그인되잇는 상황이라면 getChatRooms()가 실행될수있게 이렇게 빼냄

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
                                            //prettier-ignore
                                            <img src={chatlogo} style={{ width: "2rem", margin: " 0 0.5rem", }}/>
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
                                    {chatEach == 0 ? (
                                        <VscChromeClose />
                                    ) : (
                                        <img
                                            src={ic_trashbin}
                                            style={{ width: "1rem" }}
                                            onClick={async () => {
                                                deleteChatRoom(chatEach);
                                            }}
                                        />
                                    )}
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
                                                                    setReloading(
                                                                        true
                                                                    );
                                                                }}
                                                                key={i}
                                                            >
                                                                <ChatLiEach
                                                                    eachChat={e}
                                                                />
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
                                    setReloading={setReloading}
                                />
                            ) : (
                                // 어떤 채팅방 하나 들어간 경우
                                <Chatroom
                                    chatRoomId={chatEach}
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
