import React, { useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import chatlogo from "../assets/main_logo_smood.png";
import mainchatlogo from "../assets/main_logo_chat.png";
import { VscChromeClose, VscChevronLeft } from "react-icons/vsc";
import { CgChevronLeft } from "react-icons/cg";
import Chatroom from "./Chatroom";
import ChatLiEach from "./ChatLiEach";

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

const Chat = () => {
    const [chatopen, setChatopen] = useState(false);
    const [chatEach, setChatEach] = useState(0);

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
                                <div className={CommunityStyle.chatBodyWrap}>
                                    <div className={CommunityStyle.chatBody}>
                                        <div
                                            className={
                                                CommunityStyle.chatBodyList
                                            }
                                        >
                                            <div>채팅방 목록</div>
                                        </div>

                                        <ol className={CommunityStyle.chatOl}>
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
                            ) : (
                                <Chatroom />
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        className={CommunityStyle.chatIconWrap}
                        onClick={() => setChatopen(!chatopen)}
                    >
                        <img src={mainchatlogo} style={{ width: "35px" }} />
                    </div>
                )}
            </div>
        </>
    );
};
export default Chat;
