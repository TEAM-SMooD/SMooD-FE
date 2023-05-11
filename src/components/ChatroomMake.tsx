import React, { useEffect, useRef, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";

interface ChatroomProps {
    chatEach: number;
    setChatEach: React.Dispatch<React.SetStateAction<number>>;
}
const ChatroomMake = (props: ChatroomProps) => {
    const storeOption = [
        { id: 0, store: "카페" },
        { id: 1, store: "한식" },
        { id: 2, store: "중식" },
        { id: 3, store: "일식" },
        { id: 4, store: "분식" },
        { id: 5, store: "서양식" },
        { id: 6, store: "동남아시아" },
        { id: 7, store: "패스트푸드" },
        { id: 8, store: "주점" },
    ];
    const [chatStore, setChatstore] = useState("카페"); //디폴트
    const [chatName, setChatname] = useState("");

    function handleSubmitInput(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        console.log("채팅방개설!"); //서버연결 필요!
        console.log(
            chatName,
            chatStore,
            sessionStorage.getItem("userId"),
            sessionStorage.getItem("token")
        );
        setChatname("");
    }
    return (
        <>
            <div style={{ background: "white", height: "340px" }}>
                <form>
                    <select
                        onChange={(e: any) =>
                            setChatstore(e.currentTarget.value)
                        }
                        // value={chatStore}
                    >
                        {storeOption.map((e: any) => (
                            <option key={e.id} value={e.store}>
                                {e.store}
                            </option>
                        ))}
                    </select>
                    <input
                        name="chatName"
                        value={chatName}
                        type="text"
                        onChange={(e) => {
                            setChatname(e.currentTarget.value);
                        }}
                        placeholder="채팅방 이름을 지어주세요"
                    />
                    <button
                        type="submit"
                        onClick={(e: any) => {
                            props.setChatEach(0);
                            handleSubmitInput(e);
                        }}
                        disabled={chatName == ""}
                    >
                        전송
                    </button>
                </form>
            </div>
        </>
    );
};
export default ChatroomMake;
