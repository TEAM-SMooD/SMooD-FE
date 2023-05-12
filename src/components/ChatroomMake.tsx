import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

    const postChatRoom = useCallback(async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/chat/room`,
                {
                    category: chatStore,
                    id: 1,
                    roomId: "1",
                    roomName: chatName,
                    userId: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            props.setChatEach(0);
            console.log(res.data);
            return res;
        } catch (err) {
            console.log("postChatRoom ERR", err);
        }
    }, []);
    function handleSubmitInput(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        postChatRoom();
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
