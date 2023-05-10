import React, { useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import { BsChevronCompactRight } from "react-icons/bs";

const ChatLiEach = (e: any) => {
    return (
        <div className={CommunityStyle.chatLiEach}>
            <div
                style={{
                    margin: "0 5px",
                }}
            >
                👥
            </div>
            <div style={{ flex: "1 1 0px" }}>
                <div className={CommunityStyle.chatLiTitle}>
                    {e.e.chatroomTitle}
                </div>
                <div className={CommunityStyle.chatLiText}>
                    {e.e.chatroomText}
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <BsChevronCompactRight />
            </div>
        </div>
    );
};
export default ChatLiEach;
