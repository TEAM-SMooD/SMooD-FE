import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";

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
    const [chatName, setChatname] = useState("");

    const postChatRoom = async () => {
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
            props.setReloading(true);
            console.log(res.data);
            return res;
        } catch (err) {
            console.log("postChatRoom ERR", err);
        }
    }; // 이건 useCallback 처리하면 chatName 변경을 감지를 못함 !
    function handleSubmitInput(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        postChatRoom();
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
                            value={chatName}
                            type="text"
                            onChange={(e) => {
                                setChatname(e.currentTarget.value);
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
                            disabled={chatName == ""}
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
