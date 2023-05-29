import React, { useEffect, useState, useRef, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import home_cream from "../assets/home_cream.jpg";
import home_logo from "../assets/home_logo.png";
import home_ic_store from "../assets/home_ic_store.png";
import home_ic_store_red from "../assets/home_ic_store_red.png";
import home_ic_map from "../assets/home_ic_map.png";
import home_ic_map_red from "../assets/home_ic_map_red.png";
import {
    StHome,
    StCreamImg,
    StLogo,
    SThomeBtn,
    SThomeIc,
    STVerticallMove,
    STVerticallMove2,
    SThorizonalMove,
} from "../styles/HomeST";
import HomeStyle from "../styles/HomeStyle.module.css";
import useTitle from "../hooks/useTitle";

const Home = () => {
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(0);
    const changeTitle = useTitle("");
    useEffect(() => {
        changeTitle("SMooD");
    });
    const refElement = useRef<HTMLDivElement>(null);
    const [num, setNum] = useState(0);
    const [numflag, setNumflag] = useState("down");
    const [numflag2, setNumflag2] = useState("right");
    setTimeout(() => {
        if (numflag == "down") {
            setNum(num + 1);
        } else {
            setNum(num - 1);
        }
        if (num == -30) {
            setNumflag("down");
        } else if (num == 300) {
            setNumflag("up");
        }
        if (numflag2 == "right") {
            setNum(num + 1);
        } else {
            setNum(num - 1);
        }
        if (num == -10) {
            setNumflag2("right");
        } else if (num == 300) {
            setNumflag2("left");
        }
    }, 7);

    return (
        <StHome>
            {/* <div>
                <StCreamImg src={home_cream} />
            </div> */}
            <div className={HomeStyle.logoWrap}>
                <StLogo src={home_logo} />
                <div>
                    <strong>설명 타이틀 !</strong>
                    <div>설명 아래</div>
                </div>
                <div
                    className={HomeStyle.goBtn}
                    onClick={() => navigate("/concept")}
                    onMouseOver={() => setIsHover(1)}
                    onMouseOut={() => setIsHover(0)}
                >
                    <div>분석 보러가기</div>
                </div>
            </div>
            {/* // */}
            <div className={HomeStyle.section1}>
                <div className={HomeStyle.section1Inner}>
                    <div
                        style={{
                            width: "calc(40% - 10px)",
                            paddingLeft: "10%",
                        }}
                    >
                        <div>
                            <div>컨셉추천</div>
                            <div>컨셉추천보고서 설명</div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            overflow: "hidden",
                            height: "300px",
                            marginLeft: "10%",
                        }}
                    >
                        <SThorizonalMove number={num}>
                            <div className={HomeStyle.sec1GridEach}>
                                관심 있는 지역과 업종에서 인기많은 키워드 파악
                            </div>
                            <div className={HomeStyle.sec1GridEach}>22</div>
                            <div className={HomeStyle.sec1GridEach}>333</div>
                        </SThorizonalMove>
                    </div>
                </div>
            </div>
            <div className={HomeStyle.section2} ref={refElement}>
                <div className={HomeStyle.section2Inner}>
                    <div className={HomeStyle.sectioin2Each}>
                        <div>1</div>
                        <div>111 설명</div>
                    </div>
                    <div>
                        <div>지역추천</div>
                        <div>지역추천보고서 설명</div>
                    </div>
                    <div className={HomeStyle.sectioin2Each}>
                        <div>1</div>
                        <div>111 설명</div>
                    </div>
                </div>
            </div>
            <div className={HomeStyle.section1} style={{ padding: 0 }}>
                <div className={HomeStyle.section1Inner}>
                    <div
                        style={{
                            width: "calc(40% - 10px)",
                            paddingLeft: "10%",
                        }}
                    >
                        <div>
                            <div>지역상권보고서</div>
                            <div>보고서세버ㅓ너너ㅓㄴ째 설명</div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            overflow: "hidden",
                            height: "600px",
                        }}
                    >
                        <STVerticallMove number={num}>
                            <div className={HomeStyle.sec3GridEach}>
                                관심 있는 지역과 업종에서 인기많은 키워드 파악
                            </div>
                            <div className={HomeStyle.sec3GridEach}>22</div>
                            <div className={HomeStyle.sec3GridEach}>333</div>
                        </STVerticallMove>
                        <STVerticallMove2 number={num}>
                            <div className={HomeStyle.sec3GridEach}>4</div>
                            <div className={HomeStyle.sec3GridEach}>5</div>
                            <div className={HomeStyle.sec3GridEach}>6</div>
                        </STVerticallMove2>
                    </div>
                    {/* <div className={HomeStyle.sec3Grid} ref={sec1ref}>
                        <div className={HomeStyle.sec1GridEach} ref={sec1ref0}>
                            관심 있는 지역과 업종에서 인기많은 키워드 파악
                        </div>
                        <div className={HomeStyle.sec1GridEach} ref={sec1ref1}>
                            22
                        </div>
                        <div className={HomeStyle.sec1GridEach} ref={sec1ref2}>
                            333
                        </div>
                    </div> */}
                </div>
            </div>
            <div className={HomeStyle.section2}>
                <div className={HomeStyle.section2Inner}>
                    <div className={HomeStyle.sectioin2Each}>
                        <div>1</div>
                        <div>111 설명</div>
                    </div>
                    <div>
                        <div>커뮤니티</div>
                        <div>커뮤 설명</div>
                    </div>
                    <div className={HomeStyle.sectioin2Each}>
                        <div>1</div>
                        <div>111 설명</div>
                    </div>
                </div>
            </div>
            {/* // */}
            {/* <div
                style={{
                    display: "flex",
                    gap: "100px",
                    marginTop: "3rem",
                    width: "100%",
                }}
            >
                <SThomeBtn
                    onClick={() => navigate("/concept")}
                    onMouseOver={() => setIsHover(1)}
                    onMouseOut={() => setIsHover(0)}
                >
                    {isHover == 1 ? (
                        <SThomeIc src={home_ic_store_red} />
                    ) : (
                        <SThomeIc src={home_ic_store} />
                    )}
                    <div style={{ fontSize: "2rem", padding: "25px 0px 20px" }}>
                        컨셉 추천
                    </div>
                    <div>가게 컨셉을 아직 못 정했어요</div>
                </SThomeBtn>
                <SThomeBtn
                    onClick={() => navigate("/site")}
                    onMouseOver={() => setIsHover(2)}
                    onMouseOut={() => setIsHover(0)}
                >
                    {isHover == 2 ? (
                        <SThomeIc src={home_ic_map_red} />
                    ) : (
                        <SThomeIc src={home_ic_map} />
                    )}
                    <div style={{ fontSize: "2rem", padding: "25px 0px 20px" }}>
                        지역 추천
                    </div>
                    <div>어디에 내 가게를 내면 좋을까요?</div>
                </SThomeBtn>
            </div> */}
        </StHome>
    );
};
export default Home;
