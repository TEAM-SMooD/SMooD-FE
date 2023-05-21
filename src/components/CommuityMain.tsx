import React, { useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import comment from "../assets/comment.png";

const CommunityBoardAll = (posts: any) => {
    const navigate = useNavigate();
    const handleEditPost = () => {};
    const handleDeletePost = async (postId: number) => {
        try {
            const res = await axios.delete(
                `${process.env.REACT_APP_SERVER_URL}/post/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            window.location.replace("/community"); //새로고침
        } catch (err) {
            console.log("handleDeletePost ERR", err);
        }
        // 목록페이지로 navigate .. !?!
    };
    return (
        <>
            {posts.posts.map((e: any, i: number) => (
                <div
                    key={i}
                    style={{
                        display: "grid",
                        gap: "7px",
                        padding: "13px 0px",
                        borderBottom: "1px solid var(--linegrey)",
                        position: "relative",
                    }}
                >
                    <div className={CommunityStyle.eachWriter}>
                        <div style={{ width: "1.3rem" }}>👤</div>
                        <div className={CommunityStyle.eachWriterInfo}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <div>{e.nickname}</div>
                                <div className={CommunityStyle.storeTag}>
                                    {e.store}
                                </div>
                            </div>

                            <div
                                style={{
                                    fontSize: "0.7rem",
                                    color: "var(--grey)",
                                }}
                            >
                                {e.date} {e.time}
                            </div>
                        </div>
                        {sessionStorage.getItem("token") &&
                            sessionStorage.getItem("userName") ==
                                e.nickname && (
                                <div className={CommunityStyle.editDelete}>
                                    <div onClick={handleEditPost}>수정</div>
                                    <div
                                        onClick={() =>
                                            handleDeletePost(e.postId)
                                        }
                                    >
                                        {" "}
                                        삭제
                                    </div>
                                </div>
                            )}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                        onClick={() => navigate(`./post/${e.postId}`)}
                    >
                        <div
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
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img
                                src={comment}
                                style={{
                                    transform: "scaleX(-1)",
                                    width: "1.2rem",
                                }}
                            />{" "}
                            {e.count}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

const CommunityBoarWrite = () => {
    const [selectedWriteBoard, setSelectedWriteBoard] = useState(1);
    const [selectedStore, setSelectedStore] = useState("한식");
    const [selectedWriteTitle, setSelectedWriteTitle] = useState("");
    const [selectedWriteContents, setSelectedWriteContents] = useState("");
    const navigate = useNavigate();

    function handleSubmitInput(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        const postPost = async () => {
            try {
                const res = await axios.post(
                    `${
                        process.env.REACT_APP_SERVER_URL
                    }/post/${sessionStorage.getItem("userId")}`,
                    {
                        category: selectedWriteBoard,
                        contents: selectedWriteContents,
                        store: selectedStore,
                        title: selectedWriteTitle,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                console.log("ASFAAAAA", res);
                window.location.replace("/community"); //새로고침
                return res;
            } catch (err) {
                console.log("postPost ERR", err);
            }
        };
        postPost();
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
                        <option value="1">자유게시판 </option>
                        <option value="2">홍보게시판 </option>
                        <option value="3">질문게시판 </option>
                    </select>
                </div>
                <div className={CommunityStyle.writeBlock}>
                    <div className={CommunityStyle.left}>업종 선택</div>
                    <select
                        onClick={(e: any) =>
                            setSelectedStore(e.currentTarget.value)
                        }
                        className={CommunityStyle.writeSelect}
                    >
                        <option value="한식">한식 </option>
                        <option value="중식">중식 </option>
                        <option value="일식">일식 </option>
                        <option value="서양식">서양식 </option>
                        <option value="분식">분식 </option>
                        <option value="패스트푸드">패스트푸드 </option>
                        <option value="동남아시아">동남아시아 </option>
                        <option value="주점">주점 </option>
                        <option value="중식">중식 </option>
                    </select>
                </div>
                <div className={CommunityStyle.writeBlock}>
                    <div className={CommunityStyle.left}>제목</div>
                    <input
                        className={CommunityStyle.writeTitle}
                        onChange={(e: any) =>
                            setSelectedWriteTitle(e.currentTarget.value)
                        }
                    />
                </div>
                <div className={CommunityStyle.writeBlock}>
                    <div className={CommunityStyle.left}>내용</div>
                    <input
                        className={CommunityStyle.writeContents}
                        onChange={(e: any) =>
                            setSelectedWriteContents(e.currentTarget.value)
                        }
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
                            selectedWriteTitle == "" ||
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

const CommunityMain = (posts: any) => {
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
                        posts.posts.length > 0 && (
                            <CommunityBoardAll posts={posts.posts} />
                        )
                    ) : selectedBoard == 1 ? (
                        <CommunityBoardAll posts={posts} />
                    ) : selectedBoard == 2 ? (
                        <CommunityBoardAll posts={posts} />
                    ) : selectedBoard == 3 ? (
                        <CommunityBoardAll posts={posts} />
                    ) : (
                        <CommunityBoarWrite />
                    )}
                </div>
            </div>
        </>
    );
};

export default CommunityMain;
