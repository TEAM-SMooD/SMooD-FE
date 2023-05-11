import React, { useCallback, useRef, useState, useEffect } from "react";
// npm i @stomp/stompjs
// npm install sockjs-client
// npm i @types/stompjs
// npm i @types/sockjs-client --save
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

/*
let socketJs = new SockJs(연결할주소);
let stompClient = Stomp.over(SockJs);
// SockJd에 연결할 주소를 담아서 Stomp.over메소드로 감싼다. 이게 스톰프 클라이언트 !!!
// 한줄로쓰면 
let stompClient = Stomp.over(new SockJs(연결할주소)); 인셈

*/
const stompClient = Stomp.over(
    () => new SockJS("http://3.39.182.90:8080//ws-stomp")
);
// SockJS와 Stomp를 이용해서 웹 소켓 서버로 연결하고 메시지를 주고 받는 기능을 구현합니다.
const ChattingTest = () => {
    // 상태 변수 정의
    // -----------------------------------------------------------------------------------------
    // isJoin       채팅 참가 여부
    //              초기값은 false이며 연결 후 JOIN 메시지를 수신했을 때 true로 설정합니다.
    //              채팅 참가 후 닉네임을 변경할 수 없도록 하기 위해 사용합니다.
    // chatHistory  [ { type, sender, message }, { ... }, ... ] 형식의 채팅 내용을 저장하는 배열
    // sender       사용자 이름
    // message      사용자가 작성한 채팅 내용
    const [isJoin, setIsJoin] = useState(false);
    const [chatHistory, setChatHistory] = useState<object[]>([]); ///배열 선언이게 맞나 ?
    const [sender, setSender] = useState("dpwls");
    const [message, setMessage] = useState("");

    // ref 변수 정의
    // -----------------------------------------------------------------------------------------
    // refDialogDiv     채팅 내용 출력 영역을 자동 스크롤하기 위해서 사용합니다.
    // refSenderInput   사용자 이름 입력 창에 포커스를 부여하기 위해서 사용합니다.
    // refMessageInput  채팅 내용 입력 창에 포커스를 부여하기 위해서 사용합니다.
    // stompClient      스톰프 클라이언트의 상태를 유지시키지 위해서 사용합니다.
    const refDialogDiv = useRef<HTMLInputElement>(null);
    const refSenderInput = useRef<HTMLInputElement>(null); // = useRef();면 에러 https://driip.me/7126d5d5-1937-44a8-98ed-f9065a7c35b5
    const refMessageInput = useRef<HTMLTextAreaElement>(null);

    // const stompClient = useRef(null);

    // 채팅 참여
    // -----------------------------------------------------------------------------------------
    // 닉네임을 입력하고 참가 버튼을 클릭했을 때 호출합니다.
    // 웹 소켓 객체와 스톰프 클라이언트 객체를 생성하고((미리해놓음)), 서버(connect)와 연결을 시도합니다.
    // 서버와 연결 시 연결에 성공한 경우(onConnected)와 실패한 경우(onError)에 호출할 콜백 함수를
    // 등록합니다. (연결이 끊겼을 때 호출할 콜백 함수를 정의할 수도 있습니다.)
    const joinChatting = useCallback(
        ///채팅방입장시 그 채팅방 구독해야하는겨. 일단 연결시도임
        (e: any) => {
            e.preventDefault();

            if (!sender && refSenderInput.current) {
                alert("닉네임을 입력하세요.");
                refSenderInput.current.focus();
                return;
            }

            stompClient.connect({}, onConnected, onError);
            ///  연결시도. 첫인자: 같이전송할헤더, 성공하면실행할콜백함수, 실패시콜백함수
        },
        [sender]
    );

    // 연결에 성공한 경우
    // -----------------------------------------------------------------------------------------
    // 메시지 구독을 신청(subscribe)하고, 사용자 등록 메시지를 전송(send)합니다.
    // 메시지 구독을 신청할 때 메시지를 수신했을 때 호출할 콜백 함수(onMessageReceived)를 등록합니다.
    const onConnected = useCallback(() => {
        stompClient.subscribe("/topic/chatting", () => console.log("구독성공"));
        // stompClient.subscribe("/topic/chatting", onMessageReceived);
        // 구독할URI :
        // 두번재인자는 구독한 후에 실행할 함수 : 여기선 구독하고선은 메세지받는거
        stompClient.send(
            "/app/chat.addUser",
            {},
            JSON.stringify({ sender, type: "JOIN" })
        );
        // 인자. 전송할URI, 전송할때 헤더, 보낼데이터ㄹㄹ 설정하는 바디.JSON으로한다면 위코드처럼.
    }, [sender]);

    // 연결에 실패한 경우
    // -----------------------------------------------------------------------------------------
    // 서버 연결에 실패한 경우, 로그를 남깁니다.
    const onError = useCallback((error: any) => {
        console.log("연결실패", error);
    }, []);

    // 채팅 메시지를 전달하는 경우
    // -----------------------------------------------------------------------------------------
    // 메시지 입력창에 메시지를 입력하고 전송 버튼을 클릭했을 때 호출합니다.
    // 채팅 메시지를 전송(send)하고, 메시지 입력창에 내용을 지우고 포커스를 부여합니다.
    const sendMessage = useCallback(
        (e: any) => {
            e.preventDefault();

            if (stompClient) {
                stompClient.send(
                    "/app/chat.sendMessage",
                    {},
                    JSON.stringify({ sender, message, type: "CHAT" })
                );
            }

            setMessage("");
            // refMessageInput.current.focus(); ///굳이 포커스를 한번 더 해야할까?
        },
        [message]
    );

    // 메시지를 수신한 경우
    // -----------------------------------------------------------------------------------------
    // 메시지 구독(subscribe) 신청한 메시지가 수신되었을 때 호출됩니다.
    // 매개변수로 전달된 값(payload.body)을 이용해서 상태변수에 값을 설정합니다.
    // JOIN 메시지인 경우, 채팅 참가 상태를 변경하고,
    // 함께 전달된 이전 채팅 이력(history)을 chatHistory 상태변수에 설정합니다.
    // 그외 메시지인 경우, 메시지를 chatHistory 상태변수에 설정합니다.
    //
    // const onMessageReceived = useCallback(
    //     (payload: any) => {
    //         /////////payload의 타입이 무엇일까
    //         const message = JSON.parse(payload.body);

    //         if (message.type === "JOIN" && message.sender === sender) {
    //             setIsJoin(true);
    //             message.history.map((msg: string) =>
    //                 setChatHistory((chatHistory) => [...chatHistory, msg])
    //             );
    //         } else {
    //             setChatHistory((chatHistory) => [...chatHistory, message]);
    //         }
    //     },
    //     [sender]
    // );

    // 채팅 내용 출력 영역을 자동 스크롤
    // -----------------------------------------------------------------------------------------
    // 채팅 내용이 변경된 경우,
    // 출력 영역 보다 채팅 내용이 많은 경우 최신 내용이 보일 수 있도록 스크롤 다운합니다.
    useEffect(() => {
        if (refDialogDiv.current) {
            refDialogDiv.current.scroll({
                top: refDialogDiv.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chatHistory]);

    // <div id="dialog" ref={refDialogDiv}>
    //                     <div className="dialog-board">
    //                         {
    //                             /* 채팅 내용을 출력 */
    //                             chatHistory.map((item, idx) => (
    //                                 <div
    //                                     key={idx}
    //                                     className={
    //                                         item.sender === sender
    //                                             ? "me"
    //                                             : "other"
    //                                     }
    //                                 >
    //                                     <span>
    //                                         <b>{item.sender}</b>
    //                                     </span>
    //                                     <span className="date">
    //                                         {item.createdDt}
    //                                     </span>
    //                                     <br />
    //                                     <span>{item.message}</span>
    //                                 </div>
    //                             ))
    //                         }
    //                     </div>
    //                 </div>
    return (
        <>
            <div id="chat-wrap">
                <div id="chat">
                    {/* 주석 */}
                    <div id="divSender">
                        <label>닉네임</label>
                        <input
                            id="senderInput"
                            type="text"
                            placeholder="닉네임을 입력하세요."
                            maxLength={7}
                            ref={refSenderInput}
                            value={sender}
                            disabled={isJoin}
                            onChange={(e) => setSender(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    joinChatting(e);
                                }
                            }}
                        />
                        <input
                            type="button"
                            value="참가"
                            id="btnJoin"
                            disabled={isJoin}
                            onClick={joinChatting}
                        />
                    </div>
                    <div id="divMessage">
                        <label>메시지</label>
                        <textarea
                            id="messageInput"
                            value={message}
                            ref={refMessageInput}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    sendMessage(e);
                                }
                            }}
                        ></textarea>
                        <input
                            type="button"
                            value="전송"
                            id="btnSend"
                            onClick={sendMessage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChattingTest;
