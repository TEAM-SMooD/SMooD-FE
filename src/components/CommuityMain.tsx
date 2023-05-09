import React, { useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import { useNavigate } from "react-router-dom";
const CommunityMain = (dummy: any) => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ border: "1px solid var(--linegrey)" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        borderBottom: "1px solid var(--linegrey)",
                        justifyItems: "center",
                        alignItems: "center",
                        height: "45px",
                    }}
                >
                    <div>전체</div>
                    <div>자유 게시판</div>
                    <div>홍보 게시판</div>
                    <div>질문 게시판</div>
                    <div>글쓰기</div>
                </div>
                <div
                    style={{
                        width: "95%",
                        margin: "0 auto",
                        maxHeight: "64vh",
                        overflowY: "scroll",
                    }}
                    className={CommunityStyle.postListWrap}
                >
                    {dummy.dummy.map((e: any, i: number) => (
                        <div
                            key={i}
                            style={{
                                display: "grid",
                                gap: "7px",
                                padding: "13px 0px",
                                borderBottom: "1px solid var(--linegrey)",
                            }}
                        >
                            <div className={CommunityStyle.eachWriter}>
                                <div>👤 {e.name}</div>
                                <div className={CommunityStyle.storeTag}>
                                    {e.store}
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div
                                    onClick={() =>
                                        navigate(`./post/${e.postId}`)
                                    }
                                    style={{
                                        paddingLeft: "1.3rem",
                                        cursor: "pointer",
                                        maxWidth: "90%",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            paddingBottom: "5px",
                                        }}
                                    >
                                        {e.title}
                                    </div>
                                    <div className={CommunityStyle.lineWrap}>
                                        {e.contents}
                                    </div>
                                </div>
                                <div>💬 {e.reply.length}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CommunityMain;
