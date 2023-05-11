import React, { useCallback, useRef, useState, useEffect } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// SockJS와 Stomp를 이용해서 웹 소켓 서버로 연결하고 메시지를 주고 받는 기능을 구현합니다.
const Chatting2 = () => {
    // 상태 변수 정의
    // -----------------------------------------------------------------------------------------
    // isJoin       채팅 참가 여부
    //              초기값은 false이며 연결 후 JOIN 메시지를 수신했을 때 true로 설정합니다.
    //              채팅 참가 후 닉네임을 변경할 수 없도록 하기 위해 사용합니다.
    // chatHistory  [ { type, sender, message }, { ... }, ... ] 형식의 채팅 내용을 저장하는 배열
    // sender       사용자 이름
    // message      사용자가 작성한 채팅 내용
    const [isJoin, setIsJoin] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [sender, setSender] = useState("");
    const [message, setMessage] = useState("");

    // ref 변수 정의
    // -----------------------------------------------------------------------------------------
    // refDialogDiv     채팅 내용 출력 영역을 자동 스크롤하기 위해서 사용합니다.
    // refSenderInput   사용자 이름 입력 창에 포커스를 부여하기 위해서 사용합니다.
    // refMessageInput  채팅 내용 입력 창에 포커스를 부여하기 위해서 사용합니다.
    // stompClient      스톰프 클라이언트의 상태를 유지시키지 위해서 사용합니다.
    const refDialogDiv = useRef();
    const refSenderInput = useRef();
    const refMessageInput = useRef();
    const stompClient = useRef(null);

    // 채팅 참여
    // -----------------------------------------------------------------------------------------
    // 닉네임을 입력하고 참가 버튼을 클릭했을 때 호출합니다.
    // 웹 소켓 객체와 스톰프 클라이언트 객체를 생성하고, 서버(connect)와 연결을 시도합니다.
    // 서버와 연결 시 연결에 성공한 경우(onConnected)와 실패한 경우(onError)에 호출할 콜백 함수를
    // 등록합니다. (연결이 끊겼을 때 호출할 콜백 함수를 정의할 수도 있습니다.)
    const joinChatting = useCallback(
        (e) => {
            e.preventDefault();

            if (!sender) {
                alert("닉네임을 입력하세요.");
                refSenderInput.current.focus();
                return;
            }

            // index.html에서 <script> 태그를 이용해서 라이브러리를 가져온 경우 사용
            // const { SockJS, Stomp } = window;

            // https://stomp-js.github.io/stomp-websocket/codo/extra/docs-src/sockjs.md.html
            stompClient.current = Stomp.over(
                () => new SockJS("http://3.39.182.90:8080//ws-stomp")
            );
            // https://stomp-js.github.io/stomp-websocket/codo/extra/docs-src/Usage.md.html#toc_5
            stompClient.current.connect({}, onConnected, onError);
        },
        [sender]
    );

    // 연결에 성공한 경우
    // -----------------------------------------------------------------------------------------
    // 메시지 구독을 신청(subscribe)하고, 사용자 등록 메시지를 전송(send)합니다.
    // 메시지 구독을 신청할 때 메시지를 수신했을 때 호출할 콜백 함수(onMessageReceived)를 등록합니다.
    const onConnected = useCallback(() => {
        // https://stomp-js.github.io/stomp-websocket/codo/extra/docs-src/Usage.md.html#toc_9
        stompClient.current.subscribe("/topic/chatting", onMessageReceived);
        // https://stomp-js.github.io/stomp-websocket/codo/extra/docs-src/Usage.md.html#toc_8
        stompClient.current.send(
            "/app/chat.addUser",
            {},
            JSON.stringify({ sender, type: "JOIN" })
        );
    }, [sender]);

    // 연결에 실패한 경우
    // -----------------------------------------------------------------------------------------
    // 서버 연결에 실패한 경우, 로그를 남깁니다.
    const onError = useCallback((error) => {
        console.log("연결실패", error);
    }, []);

    // 채팅 메시지를 전달하는 경우
    // -----------------------------------------------------------------------------------------
    // 메시지 입력창에 메시지를 입력하고 전송 버튼을 클릭했을 때 호출합니다.
    // 채팅 메시지를 전송(send)하고, 메시지 입력창에 내용을 지우고 포커스를 부여합니다.
    const sendMessage = useCallback(
        (e) => {
            e.preventDefault();

            if (stompClient) {
                // https://stomp-js.github.io/stomp-websocket/codo/extra/docs-src/Usage.md.html#toc_8
                stompClient.current.send(
                    "/app/chat.sendMessage",
                    {},
                    JSON.stringify({ sender, message, type: "CHAT" })
                );
            }

            setMessage("");
            refMessageInput.current.focus();
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
    const onMessageReceived = useCallback(
        (payload) => {
            const message = JSON.parse(payload.body);

            if (message.type === "JOIN" && message.sender === sender) {
                setIsJoin(true);
                message.history.map((msg) =>
                    setChatHistory((chatHistory) => [...chatHistory, msg])
                );
            } else {
                setChatHistory((chatHistory) => [...chatHistory, message]);
            }
        },
        [sender]
    );

    // 채팅 내용 출력 영역을 자동 스크롤
    // -----------------------------------------------------------------------------------------
    // 채팅 내용이 변경된 경우,
    // 출력 영역 보다 채팅 내용이 많은 경우 최신 내용이 보일 수 있도록 스크롤 다운합니다.
    useEffect(() => {
        refDialogDiv.current.scroll({
            top: refDialogDiv.current.scrollHeight,
            behavior: "smooth",
        });
    }, [chatHistory]);

    return (
        <>
            <div id="chat-wrap">
                <div id="chat">
                    <div id="dialog" ref={refDialogDiv}>
                        <div className="dialog-board">
                            {
                                /* 채팅 내용을 출력 */
                                chatHistory.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={
                                            item.sender === sender
                                                ? "me"
                                                : "other"
                                        }
                                    >
                                        <span>
                                            <b>{item.sender}</b>
                                        </span>
                                        <span className="date">
                                            {item.createdDt}
                                        </span>
                                        <br />
                                        <span>{item.message}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
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

export default Chatting2;
