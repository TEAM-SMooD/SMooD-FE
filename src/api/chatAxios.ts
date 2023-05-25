import { customAxios } from "./customAxios";

export const getChatRooms = async () => {
    try {
        const res = await customAxios().get(
            `${process.env.REACT_APP_SERVER_URL}/chat/rooms`
        );
        console.log("getChatRooms res", res.data.body.result);
        return res.data.body.result;
    } catch (err) {
        console.log("getChatRoomsERR", err);
    }
};

export const getLastchat = async (eachRoomId: string) => {
    try {
        const resLast = await customAxios().get(`/chatting`, {
            params: {
                roomId: eachRoomId,
            },
        });
        // console.log(resLast);
        return resLast.data.body.result[resLast.data.body.result.length - 1]
            .message;
    } catch (err) {
        // console.log("resLastRESR 마지막톡res 없음", err);
    }
};
export const getChatting = async (chatRoomId: string) => {
    try {
        const res = await customAxios().get(`/chatting`, {
            params: {
                roomId: chatRoomId,
                size: 30,
            },
        });
        console.log("getchatting특정채팅방조회", res.data);
        return res.data.body.result;
    } catch (err) {
        console.log("getChatRoomsERR", err);
    }
};
export const postChatRoom = async (
    chatStore: string,
    roomName: string,
    props: any
) => {
    try {
        const res = await customAxios().post(`/chat/room`, {
            category: chatStore,
            roomName: roomName,
            userId: sessionStorage.getItem("userId"),
        });
        props.setChatEach(0);
        props.setReloading(true);
        return res;
    } catch (err) {
        console.log("postChatRoom ERR", err);
    }
};
