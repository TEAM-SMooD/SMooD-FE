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
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>끝</div>
            </div>

            <div className={CommunityStyle.chatroomInputWrap}>
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
export default Chatroom;
