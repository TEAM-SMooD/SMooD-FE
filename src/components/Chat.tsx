import React, { useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import chatlogo from "../assets/main_logo_smood.png";
import mainchatlogo from "../assets/main_logo_chat.png";
import { VscChromeClose, VscChevronLeft } from "react-icons/vsc";
import { CgChevronLeft } from "react-icons/cg";
import { BsChevronCompactRight } from "react-icons/bs";

const chatListDummy = {
    data: [
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
    const ChatLiEach = (e: any) => {
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
                    <div className={CommunityStyle.chatRoomTitle}>
                        {e.e.chatroomTitle}
                    </div>
                    <div className={CommunityStyle.chatRoomText}>
                        {e.e.chatroomText}
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <BsChevronCompactRight />
                </div>
            </div>
        );
    };
    const ChatEachPage = () => {
        const [inputchat, setInputchat] = useState("");
        function handleChangeChat(e: React.FormEvent<HTMLInputElement>) {
            setInputchat(e.currentTarget.value);
        }
        function handleSubmitChat(e: React.FormEvent<HTMLInputElement>) {
            e.preventDefault();
            console.log("채팅전송"); //서버연결 필요!
            setInputchat("");
        }
        return (
            <>
                <div className={CommunityStyle.chatEachContents}>
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
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>끝</div>
                </div>

                <div className={CommunityStyle.chatEachInput}>
                    <form>
                        <input
                            type="text"
                            onChange={handleChangeChat}
                            value={inputchat}
                        ></input>
                        <button
                            type="submit"
                            onClick={(e: any) => {
                                handleSubmitChat(e);
                            }}
                        >
                            전송
                        </button>
                    </form>
                </div>
            </>
        );
    };
    return (
        <>
            <div className={CommunityStyle.chatFloating}>
                {chatopen ? (
                    <div className={CommunityStyle.chatScreenWrap}>
                        <div className={CommunityStyle.chat1}>
                            <div className={CommunityStyle.chatHeader}>
                                <div
                                    style={{
                                        position: "fixed",
                                        background: "rgba(247, 247, 248, 1)",
                                        width: "100%",
                                    }}
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
                                    style={{
                                        cursor: "pointer",
                                        position: "fixed",
                                        right: "10px",
                                    }}
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
                                <ChatEachPage />
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
