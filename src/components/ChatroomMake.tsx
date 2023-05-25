import React, { useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import { postChatRoom } from "../api/chatAxios";

interface ChatroomProps {
    chatEach: number;
    setChatEach: React.Dispatch<React.SetStateAction<number>>;
    setReloading: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [chatRoomName, setChatRoomName] = useState("");

    function handleSubmitInput(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        postChatRoom(chatStore, chatRoomName, props);
    }
    return (
        <>
            <div style={{ background: "white", height: "340px" }}>
                <form className={CommunityStyle.makeForm}>
                    <div className={CommunityStyle.makeSelectInputWrap}>
                        <select
                            className={CommunityStyle.makeSelect}
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
                            className={CommunityStyle.makeInput}
                            name="chatName"
                            value={chatRoomName}
                            type="text"
                            onChange={(e) => {
                                setChatRoomName(e.currentTarget.value);
                            }}
                            placeholder="채팅방 이름을 지어주세요"
                        />
                    </div>
                    <div className={CommunityStyle.btnWrap}>
                        <button
                            className={CommunityStyle.makeBtn}
                            type="submit"
                            onClick={(e: any) => {
                                handleSubmitInput(e);
                            }}
                            disabled={chatRoomName == ""}
                        >
                            만들기
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default ChatroomMake;
