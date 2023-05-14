import React, { useEffect, useRef, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";

const Chatroom = () => {
    const [inputchat, setInputchat] = useState("");
    function handleChangeChat(e: React.FormEvent<HTMLInputElement>) {
        setInputchat(e.currentTarget.value);
    }
    function handleSubmitChat(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        console.log("채팅전송"); //서버연결 필요!
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
        scrollToBottom();
    });
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
                    <div className={CommunityStyle.chatMe}>내가하는말</div>
                </div>
                <div className={CommunityStyle.chatTheyWrap}>
                    <div className={CommunityStyle.chatThey}>1</div>
                    <div className={CommunityStyle.chatThey}>2</div>
                    <div className={CommunityStyle.chatThey}>3</div>
                    <div className={CommunityStyle.chatThey}>14</div>
                </div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
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
