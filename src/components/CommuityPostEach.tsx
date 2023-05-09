import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CommunityStyle from "../styles/CommunityStyle.module.css";

const CommunityPostEach = (dummy: any) => {
    const path = useLocation();
    const spliturl = path.pathname.split("/");
    const pathid = spliturl[spliturl.length - 1];
    const data = dummy.dummy[parseInt(pathid) - 1];
    const navigate = useNavigate();
    const [newreply, setNewreply] = useState("");
    function onchangeNewreply(e: React.FormEvent<HTMLInputElement>) {
        setNewreply(e.currentTarget.value);
    }
    function onsubmitNewreply(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        console.log("제출", newreply); // 서버 연결 필 !
        setNewreply("");
    }
    return (
        <>
            <div style={{ marginTop: "1rem" }}>
                <div className={CommunityStyle.eachTopWrap}>
                    <div className={CommunityStyle.eachTitle}>{data.title}</div>
                    <div className={CommunityStyle.eachWriter}>
                        <div>👤 {data.name}</div>
                        <div className={CommunityStyle.storeTag}>
                            {data.store}
                        </div>
                    </div>
                </div>
                <div className={CommunityStyle.eachContentsWrap}>
                    <div className={CommunityStyle.eachContents}>
                        {data.contents}
                    </div>
                    <div>💬 {data.reply.length}</div>
                </div>
                <div className={CommunityStyle.eachReplyWrap}>
                    {data.reply.map((e: any, i: number) => (
                        <div key={i} className={CommunityStyle.eachReplyBox}>
                            <div>🗣️ {e.replyName}</div>
                            <div className={CommunityStyle.eachReplyContents}>
                                {e.replyContents}
                            </div>
                        </div>
                    ))}
                </div>
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
                        disabled={sessionStorage.getItem("userId") == null}
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
    );
};

export default CommunityPostEach;
