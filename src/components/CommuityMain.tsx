import React, { useEffect, useState } from "react";
import CommunityStyle from "../styles/CommunityStyle.module.css";
import { useNavigate } from "react-router-dom";
import comment from "../assets/comment.png";
import { deletePost, getPostCategory, postPost } from "../api/communityAxios";

const CommunityBoard = (posts: any) => {
    const navigate = useNavigate();
    const handleEditPost = () => {};

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
                            sessionStorage.getItem("nickname") ==
                                e.nickname && (
                                <div className={CommunityStyle.editDelete}>
                                    {/* <div onClick={handleEditPost}>수정</div> */}
                                    <div onClick={() => deletePost(e.postId)}>
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
const CommunityBoardCategory = ({ selectedCategory }: any) => {
    const [categoryPosts, setCategoryPosts] = useState([]);
    useEffect(() => {
        getPostCategory(selectedCategory).then((e) => {
            setCategoryPosts(e);
        });
    }, [selectedCategory]);
    return <CommunityBoard posts={categoryPosts} />;
};
const CommunityBoardWrite = () => {
    const [writeCategory, setWriteCategory] = useState(1);
    const [writeStore, setWriteStore] = useState("한식");
    const [writeTitle, setWriteTitle] = useState("");
    const [writeContents, setWriteContents] = useState("");
    const navigate = useNavigate();

    function handleSubmitInput(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        postPost(writeCategory, writeContents, writeStore, writeTitle);
    }
    return (
        <>
            <div className={CommunityStyle.postListWrap}>
                <div className={CommunityStyle.writeBlock}>
                    <div className={CommunityStyle.left}>게시판 선택</div>
                    <select
                        onChange={(e: any) => {
                            //onClick아니고 onChange임~
                            setWriteCategory(e.currentTarget.value);
                        }}
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
                        onChange={(e: any) =>
                            setWriteStore(e.currentTarget.value)
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
                            setWriteTitle(e.currentTarget.value)
                        }
                    />
                </div>
                <div className={CommunityStyle.writeBlock}>
                    <div className={CommunityStyle.left}>내용</div>
                    <input
                        className={CommunityStyle.writeContents}
                        onChange={(e: any) =>
                            setWriteContents(e.currentTarget.value)
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
                        disabled={writeTitle == "" || writeContents == ""}
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
    const [selectedCategory, setSelectedCategory] = useState(0); //0전체 1자유2홍보3질문 4글쓰기
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
                    <div
                        onClick={() => setSelectedCategory(0)}
                        style={{
                            color: selectedCategory == 0 ? "var(--red)" : "",
                        }}
                    >
                        전체
                    </div>
                    <div
                        onClick={() => setSelectedCategory(1)}
                        style={{
                            color: selectedCategory == 1 ? "var(--red)" : "",
                        }}
                    >
                        자유 게시판
                    </div>
                    <div
                        onClick={() => setSelectedCategory(2)}
                        style={{
                            color: selectedCategory == 2 ? "var(--red)" : "",
                        }}
                    >
                        홍보 게시판
                    </div>
                    <div
                        onClick={() => setSelectedCategory(3)}
                        style={{
                            color: selectedCategory == 3 ? "var(--red)" : "",
                        }}
                    >
                        질문 게시판
                    </div>
                    <div
                        onClick={() => {
                            if (sessionStorage.getItem("token")) {
                                setSelectedCategory(4);
                            } else {
                                alert("로그인 후 이용해주세요");
                                navigate("/mylogin");
                            }
                        }}
                        style={{
                            color: selectedCategory == 4 ? "var(--red)" : "",
                        }}
                    >
                        글쓰기
                    </div>
                </div>
                <div className={CommunityStyle.postListWrap}>
                    {selectedCategory == 0 ? (
                        posts.posts.length > 0 && (
                            <CommunityBoard posts={posts.posts} />
                        )
                    ) : selectedCategory == 4 ? (
                        <CommunityBoardWrite />
                    ) : (
                        <CommunityBoardCategory
                            selectedCategory={selectedCategory}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default CommunityMain;
