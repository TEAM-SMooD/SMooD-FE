// '''
// npm i @stomp/stompjs
// npm install sockjs-client
// npm i @types/stompjs
// npm i @types/sockjs-client --save
// '''
import SockJS from "sockjs-client";
import StompJs from "@stomp/stompjs";
import { useEffect, useRef } from "react";

// function CreateReadChat() {
//   const client = useRef({});

// const connect = () => { // 연결할 때
//   client.current = new StompJs.Client({
//     brokerURL: 'ws://localhost:8787/ws',
//     onConnect: () => {
//       subscribe(); // 연결 성공 시 구독하는 로직 실행
//     },
//   );
//   client.current.activate(); // 클라이언트 활성화
// };

// const disconnect = () => { // 연결이 끊겼을 때
//   client.current.deactivate();
// };

// useEffect(() => {
//   connect();

//   return () => disconnect();
// }, []);

// const client = new StompJs.Client({
//     brokerURL: "ws://3.39.182.90:8080/api/ws",
//     connectHeaders: {
//         login: "user",
//         passcode: "password",
//     },
//     debug: function (str) {
//         console.log(str);
//     },
//     reconnectDelay: 5000,
//     heartbeatIncoming: 4000,
//     heartbeatOutgoing: 4000,
// });

// client.onConnect = function (frame) {
//     // Do something, all subscribes must be done is this callback
//     // This is needed because this will be executed after a (re)connect
// };

// client.onStompError = function (frame) {
//     // Will be invoked in case of error encountered at Broker
//     // Bad login/passcode typically will cause an error
//     // Complaint brokers will set `message` header with a brief message. Body may contain details.
//     // Compliant brokers will terminate the connection after any error
//     console.log("Broker reported error: " + frame.headers["message"]);
//     console.log("Additional details: " + frame.body);
// };

// client.activate();
