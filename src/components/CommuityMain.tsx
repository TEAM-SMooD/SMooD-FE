import React, { useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import { useNavigate } from "react-router-dom";
const CommunityMain = (dummy: any) => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        borderBottom: "1px solid grey",
                        paddingBottom: "10px",
                        justifyItems: "center",
                    }}
                >
                    <div>전체</div>
                    <div>자유 게시판</div>
                    <div>홍보</div>
                    <div>질문</div>
                    <div>글쓰기</div>
                </div>
                <div style={{ width: "95%", margin: "0 auto" }}>
                    {dummy.dummy.map((e: any, i: number) => (
                        <div
                            key={i}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "100px 1fr 30px",
                                gap: "10px",
                                marginTop: "10px",
                                paddingBottom: "10px",
                                borderBottom: "1px solid grey",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <div>{e.name}</div>
                                <div
                                    style={{
                                        border: "1px solid red",
                                        borderRadius: "40px",
                                        padding: "3px",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    {e.store}
                                </div>
                            </div>
                            <div onClick={() => navigate(`./post/${e.postId}`)}>
                                <div style={{ fontWeight: "bold" }}>
                                    {e.title}
                                </div>
                                <div className={CommunityStyle.lineWrap}>
                                    {e.contents}
                                </div>
                            </div>
                            <div>💬 {e.reply.length}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CommunityMain;
