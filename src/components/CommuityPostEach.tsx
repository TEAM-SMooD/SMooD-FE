import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommunityStyle from "../styles/CommunityStyle.module.css";

const CommunityPostEach = (posts: any) => {
    const path = useLocation();
    const spliturl = path.pathname.split("/");
    const pathid = spliturl[spliturl.length - 1];
    const data = posts.posts.filter((e: any) => e.postId == pathid)[0];
    const navigate = useNavigate();
    const [newreply, setNewreply] = useState("");
    function onchangeNewreply(e: React.FormEvent<HTMLInputElement>) {
        setNewreply(e.currentTarget.value);
    }
    function onsubmitNewreply(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        const postNewComment = async () => {
            try {
                const res = await axios.post(
                    `${
                        process.env.REACT_APP_SERVER_URL
                    }/comment/${sessionStorage.getItem("userId")}`,
                    {
                        contents: "",
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                return res;
            } catch (err) {
                console.log("postChatRoom ERR", err);
            }
        };
        postNewComment();
        setNewreply("");
    }

    return (
        <>
            {data && (
                <>
                    <div style={{ marginTop: "1rem" }}>
                        <div className={CommunityStyle.eachTopWrap}>
                            <div className={CommunityStyle.eachTitle}>
                                {data.title}
                            </div>
                            <div className={CommunityStyle.eachWriter}>
                                <div style={{ width: "1.3rem" }}>👤</div>
                                <div className={CommunityStyle.eachWriterInfo}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div>{data.nickname}</div>
                                        <div
                                            className={CommunityStyle.storeTag}
                                        >
                                            {data.store}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "0.7rem",
                                            color: "var(--grey)",
                                        }}
                                    >
                                        {data.date} {data.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={CommunityStyle.eachContentsWrap}>
                            <div className={CommunityStyle.eachContents}>
                                {data.contents}
                            </div>
                            {/* <div>💬 {data.reply.length}</div> */}
                        </div>
                        {/* <div className={CommunityStyle.eachReplyWrap}>
                    {data.reply.map((e: any, i: number) => (
                        <div key={i} className={CommunityStyle.eachReplyBox}>
                            <div className={CommunityStyle.eachWriter}>
                                <div style={{ width: "1.3rem" }}>🗣️ </div>
                                <div className={CommunityStyle.eachWriterInfo}>
                                    <div>{e.replyName}</div>
                                    <div
                                        style={{
                                            fontSize: "0.7rem",
                                            color: "var(--grey)",
                                        }}
                                    >
                                        {e.replyDateTime}
                                    </div>
                                </div>
                            </div>

                            <div className={CommunityStyle.eachReplyContents}>
                                {e.replyContents}
                            </div>
                        </div>
                    ))}
                </div> */}
                    </div>
                    <div>
                        <form
                            className={CommunityStyle.eachForm}
                            onClick={() => {
                                if (!sessionStorage.getItem("userId")) {
                                    alert("로그인 페이지로 이동합니다");
                                    navigate("/mylogin");
                                }
                            }}
                        >
                            <input
                                className={CommunityStyle.eachInputBox}
                                type="text"
                                onChange={onchangeNewreply}
                                value={newreply}
                                placeholder={
                                    sessionStorage.getItem("userId")
                                        ? "댓글을 남겨주세요"
                                        : "로그인 후 댓글을 남겨주세요"
                                }
                                disabled={
                                    sessionStorage.getItem("userId") == null
                                }
                            />
                            <button
                                onClick={(e: any) => {
                                    onsubmitNewreply(e);
                                }}
                                className={CommunityStyle.eachButton}
                                type="submit"
                            >
                                작성
                            </button>
                        </form>
                    </div>
                    <div
                        className={CommunityStyle.eachGoback}
                        onClick={() => navigate(-1)}
                    >
                        &lt; 목록으로
                    </div>
                </>
            )}
        </>
    );
};

export default CommunityPostEach;
