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
import img_keywordChange from "../assets/home/keywordChange.png";
import img_keywordRank from "../assets/home/keywordRank.png";
import img_wordCloud from "../assets/home/wordCloud.png";
import piechart from "../assets/home/piechart.png";
import siteStores from "../assets/home/siteStores.png";
import reportDaypeople from "../assets/home/reportDaypeople.png";
import reportSales from "../assets/home/reportSales.png";
import reportInfra from "../assets/home/reportInfra.png";
import reportTimesales from "../assets/home/reportTimesales.png";
import reportPopulationIcon from "../assets/home/reportPopulationIcon.png";
import reportMarket from "../assets/home/reportMarket.png";
import reportCommunity from "../assets/home/reportCommunity.png";
import talk1 from "../assets/home/talk1.png";
import talk2 from "../assets/home/talk2.png";

import HomeStyle from "../styles/HomeStyle.module.css";
import useTitle from "../hooks/useTitle";
import Layout from "./Layout";

const Home = () => {
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(0);
    const changeTitle = useTitle("");
    useEffect(() => {
        changeTitle("SMooD");
    });

    const [num, setNum] = useState(0);
    const [numflag, setNumflag] = useState("down");
    const [numflag2, setNumflag2] = useState("right");

    setTimeout(() => {
        if (numflag == "down") {
            setNum(num + 1);
        } else {
            setNum(num - 1);
        }
        if (num == 0) {
            setNumflag("down");
        } else if (num == 300) {
            setNumflag("up");
        }

        if (num == 0) {
            setNumflag2("right");
        } else if (num == 300) {
            setNumflag2("left");
        }
        if (numflag2 == "right") {
            setNum(num + 1);
        } else {
            setNum(num - 1);
        }
    }, 10);

    const Sec3Component = (props: {
        title: string;
        content: string;
        src: any;
    }) => {
        return (
            <>
                <div className={HomeStyle.sec3GridEach}>
                    <div className={HomeStyle.sec1EachWrap}>
                        <div className={HomeStyle.sec1Title}>{props.title}</div>
                        <div>{props.content}</div>
                    </div>
                    <div className={HomeStyle.sec3ImgWrap}>
                        <img
                            src={props.src}
                            style={{ maxWidth: "240px", maxHeight: "120px" }}
                        />
                    </div>
                </div>
            </>
        );
    };
    return (
        <Layout idx={0}>
            <StHome>
                {/* <div>
                <StCreamImg src={home_cream} />
            </div> */}
                <div className={HomeStyle.logoWrap}>
                    {/* <StLogo src={home_logo} /> */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <strong
                            style={{ fontSize: "3.5rem", wordSpacing: "-8px" }}
                        >
                            <span style={{ color: "var(--red)" }}>S</span>tart
                            your{" "}
                            <span style={{ color: "var(--red)" }}>MooD</span>
                        </strong>
                        <div style={{ fontSize: "1.2rem" }}>
                            창업할 동네의 상권 분위기를 한눈에 알아보세요
                        </div>
                    </div>
                    <div style={{ height: "50px" }}>
                        <div
                            className={HomeStyle.btnFloat}
                            onClick={() => navigate("/concept")}
                            onMouseOver={() => setIsHover(1)}
                            onMouseOut={() => setIsHover(0)}
                        >
                            분석 보러가기
                        </div>
                    </div>
                </div>
                {/* // */}
                <div className={HomeStyle.section1}>
                    <div className={HomeStyle.section1Inner}>
                        <div
                            style={{
                                paddingLeft: "10%",
                            }}
                        >
                            <div>
                                <div className={HomeStyle.secInfoEng}>
                                    Keyword Analysis Report
                                </div>
                                <div className={HomeStyle.secInfoTitle}>
                                    키워드 분석 리포트
                                </div>
                                {/* <div>
                                    선택한 지역의 지금 뜨고 있는 업종은
                                    무엇일까요? 매출과 점포 수로 보는 뜨는
                                    업종과 각 업종 카테고리별 뜨는 업종 순위를
                                    알아보세요!{" "}
                                </div> */}
                                <div>
                                    창업하고 싶은 지역과 업종의 분위기는
                                    어떨까요?
                                </div>
                                <div>
                                    20만개의 리뷰를 분석하여 생생하고 정확한
                                    트렌드를 제공합니다
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                overflow: "hidden",
                                height: "440px",
                                marginLeft: "10%",
                            }}
                        >
                            <SThorizonalMove number={num}>
                                <div className={HomeStyle.sec1GridEach}>
                                    <div className={HomeStyle.sec1EachWrap}>
                                        <div className={HomeStyle.sec1Title}>
                                            워드클라우드
                                        </div>
                                        <div>
                                            핵심 키워드를 한눈에 파악할 수
                                            있어요
                                        </div>
                                    </div>
                                    <div className={HomeStyle.sec1ImgWrap}>
                                        <img
                                            src={img_wordCloud}
                                            style={{ width: "70%" }}
                                        />
                                    </div>
                                </div>
                                <div className={HomeStyle.sec1GridEach}>
                                    <div className={HomeStyle.sec1EachWrap}>
                                        <div className={HomeStyle.sec1Title}>
                                            키워드 변화
                                        </div>
                                        <div>
                                            분기별 키워드 변화 비교해 보세요
                                        </div>
                                    </div>
                                    <div className={HomeStyle.sec1ImgWrap}>
                                        <img
                                            src={img_keywordChange}
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                                <div className={HomeStyle.sec1GridEach}>
                                    <div className={HomeStyle.sec1EachWrap}>
                                        <div className={HomeStyle.sec1Title}>
                                            키워드 순위
                                        </div>
                                        <div>잘나가는 가게의 리뷰 분석 </div>
                                    </div>
                                    <div className={HomeStyle.sec1ImgWrap}>
                                        <img
                                            src={img_keywordRank}
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                            </SThorizonalMove>
                        </div>
                    </div>
                </div>
                <div className={HomeStyle.section2}>
                    <div className={HomeStyle.section2Inner}>
                        <div
                            className={HomeStyle.sectioin2Each}
                            style={{ height: "440px" }}
                        >
                            <div className={HomeStyle.sec1EachWrap}>
                                <div className={HomeStyle.sec1Title}>
                                    #맛있는 #분위기 키워드를 가진
                                </div>
                                <div>카페가 많은 지역</div>
                            </div>
                            <div className={HomeStyle.sec1ImgWrap}>
                                <img src={piechart} style={{ width: "60%" }} />
                            </div>
                        </div>
                        <div style={{ maxWidth: "33%" }}>
                            <div className={HomeStyle.secInfoEng}>
                                Find Commercial Area
                            </div>
                            <div className={HomeStyle.secInfoTitle}>
                                창업 지역 추천
                            </div>
                            <div>어디에 내 가게를 내면 좋을까요?</div>
                        </div>
                        <div
                            className={HomeStyle.sectioin2Each}
                            style={{ height: "440px" }}
                        >
                            <div className={HomeStyle.sec1EachWrap}>
                                <div className={HomeStyle.sec1Title}>
                                    #맛있는 #분위기 의 양식 음식점
                                </div>
                                <div>단골 많은 가게들</div>
                            </div>
                            <div className={HomeStyle.sec1ImgWrap}>
                                <img
                                    src={siteStores}
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={HomeStyle.section1}>
                    <div className={HomeStyle.section1Inner}>
                        <div
                            style={{
                                paddingLeft: "10%",
                            }}
                        >
                            <div>
                                <div className={HomeStyle.secInfoEng}>
                                    Commercial Area Report
                                </div>
                                <div className={HomeStyle.secInfoTitle}>
                                    지역 상권 보고서
                                </div>
                                <div>
                                    창업할 지역에 대해 인구 분석, 주변 시설
                                    현황, 매출 분석 등 다양한 상권 정보를
                                    제공합니다
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                overflow: "hidden",
                                height: "600px",
                                position: "relative",
                                top: "-70px",
                                right: "-20%",
                            }}
                        >
                            <STVerticallMove number={num}>
                                <Sec3Component
                                    title="인구 보고서"
                                    content="선택한 지역의 인구 분석을 받아보세요"
                                    src={reportPopulationIcon}
                                />
                                <Sec3Component
                                    title="성수 1가 제1동"
                                    content="여성은 20대가, 남성은 30대의
                                    유동인구가 가장 많아요"
                                    src={reportDaypeople}
                                />
                                <Sec3Component
                                    title="주변 시설 현황"
                                    content="주변 시설과 배후지 주변 시설 현황을 알 수 있어요"
                                    src={reportInfra}
                                />
                            </STVerticallMove>
                            <STVerticallMove2 number={num}>
                                <Sec3Component
                                    title="시간별 월 평균 매출 정보"
                                    content="17~21시에 매출이 가장 높아요"
                                    src={reportTimesales}
                                />
                                <Sec3Component
                                    title="매출 분석"
                                    content="월 평균, 일 평균, 최고 매출 시간대
                                    까지 파악할 수 있어요"
                                    src={reportSales}
                                />
                                <Sec3Component
                                    title="상권 정보"
                                    content="개폐업 정보와 상권 변화 지표 대시보드를 확인하세요 "
                                    src={reportMarket}
                                />
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
                        <div
                            className={HomeStyle.sectioin2Each}
                            style={{ height: "440px" }}
                        >
                            <div className={HomeStyle.sec1EachWrap}>
                                <div className={HomeStyle.sec1Title}>
                                    게시판
                                </div>
                                <div>
                                    자유롭게 소통하며 질문을 남기거나 가게를
                                    홍보할 수 있어요
                                </div>
                            </div>
                            <div className={HomeStyle.sec1ImgWrap}>
                                <img
                                    src={reportCommunity}
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </div>
                        <div style={{ maxWidth: "33%" }}>
                            <div className={HomeStyle.secInfoEng}>
                                Community
                            </div>
                            <div className={HomeStyle.secInfoTitle}>
                                커뮤니티
                            </div>
                            <div>다른 예비 창업자들과 함께해요</div>
                        </div>
                        <div
                            className={HomeStyle.sectioin2Each}
                            style={{ height: "440px" }}
                        >
                            <div className={HomeStyle.sec1EachWrap}>
                                <div className={HomeStyle.sec1Title}>
                                    스무디톡
                                </div>
                                <div>
                                    채팅에 참여해 많은 사장님, 예비 사장님들과
                                    정보를 공유해보세요
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                            >
                                <div className={HomeStyle.sec1ImgWrap}>
                                    <img
                                        src={talk1}
                                        style={{ height: "280px" }}
                                    />
                                </div>
                                <div className={HomeStyle.sec1ImgWrap}>
                                    <img
                                        src={talk2}
                                        style={{ height: "280px" }}
                                    />
                                </div>
                            </div>
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
        </Layout>
    );
};
export default Home;
