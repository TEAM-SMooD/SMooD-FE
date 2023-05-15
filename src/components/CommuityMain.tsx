import React, { useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import { useNavigate } from "react-router-dom";

const CommunityBoardAll = (dummy: any) => {
    const navigate = useNavigate();

    return (
        <>
            {dummy.dummy.dummy.map((e: any, i: number) => (
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
                        <div className={CommunityStyle.storeTag}>{e.store}</div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            onClick={() => navigate(`./post/${e.postId}`)}
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
        </>
    );
};
const CommunityBoarWrite = () => {
    const [selectedWriteBoard, setSelectedWriteBoard] = useState("자유게시판");
    const [selectedWriteTitle, setSelectedWriteTitle] = useState("");
    const [selectedWriteContents, setSelectedWriteContents] = useState("");
    function handleSubmitInput(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        //서버보내는POST!!
    }
    return (
        <>
            <div className={CommunityStyle.postListWrap}>
                <div className={CommunityStyle.writeBlock}>
                    <div className={CommunityStyle.left}>게시판 선택</div>
                    <select
                        onClick={(e: any) =>
                            setSelectedWriteBoard(e.currentTarget.value)
                        }
                        className={CommunityStyle.writeSelect}
                    >
                        <option value="자유게시판">자유게시판 </option>
                        <option value="홍보게시판">홍보게시판 </option>
                        <option value="질문게시판">질문게시판 </option>
                    </select>
                </div>
                <div className={CommunityStyle.writeBlock}>
                    <div className={CommunityStyle.left}>제목</div>
                    <input
                        className={CommunityStyle.writeTitle}
                        onChange={(e: any) => setSelectedWriteTitle(e)}
                    />
                </div>
                <div className={CommunityStyle.writeBlock}>
                    <div className={CommunityStyle.left}>내용</div>
                    <input
                        className={CommunityStyle.writeContents}
                        onChange={(e: any) => setSelectedWriteContents(e)}
                    />
                </div>
                <div
                    className={CommunityStyle.btnWrap}
                    style={{ margin: "1rem 0" }}
                >
                    <button
                        className={CommunityStyle.makeBtn}
                        style={{ width: "50%", height: "2rem" }}
                        disabled={
                            selectedWriteTitle == "" &&
                            selectedWriteContents == ""
                        }
                        onClick={(e: any) => handleSubmitInput(e)}
                    >
                        글쓰기
                    </button>
                </div>
            </div>
        </>
    );
};

const CommunityMain = (dummy: any) => {
    const [selectedBoard, setSelectedBoard] = useState(0); //0전체 1자유2홍보3질문 4글쓰기
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
                    <div
                        onClick={() => setSelectedBoard(0)}
                        style={{
                            color: selectedBoard == 0 ? "var(--red)" : "",
                        }}
                    >
                        전체
                    </div>
                    <div
                        onClick={() => setSelectedBoard(1)}
                        style={{
                            color: selectedBoard == 1 ? "var(--red)" : "",
                        }}
                    >
                        자유 게시판
                    </div>
                    <div
                        onClick={() => setSelectedBoard(2)}
                        style={{
                            color: selectedBoard == 2 ? "var(--red)" : "",
                        }}
                    >
                        홍보 게시판
                    </div>
                    <div
                        onClick={() => setSelectedBoard(3)}
                        style={{
                            color: selectedBoard == 3 ? "var(--red)" : "",
                        }}
                    >
                        질문 게시판
                    </div>
                    <div
                        onClick={() => setSelectedBoard(4)}
                        style={{
                            color: selectedBoard == 4 ? "var(--red)" : "",
                        }}
                    >
                        글쓰기
                    </div>
                </div>
                <div className={CommunityStyle.postListWrap}>
                    {selectedBoard == 0 ? (
                        <CommunityBoardAll dummy={dummy} />
                    ) : selectedBoard == 1 ? (
                        ""
                    ) : selectedBoard == 2 ? (
                        ""
                    ) : selectedBoard == 3 ? (
                        ""
                    ) : (
                        <CommunityBoarWrite />
                    )}
                </div>
            </div>
        </>
    );
};

export default CommunityMain;
