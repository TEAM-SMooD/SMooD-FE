import React, { useEffect, useRef, useState } from "react";
import {
    ModalBackGround,
    ModalContainer,
    ModalWrap,
    Progress,
    ProgressBg,
} from "../styles/StoreModalST";
import ic_closeX from "../assets/ic_closeX.png";
import StoreModalStyle from "../styles/StoreModal.module.css";
import KakaoMap from "./KakaoMap";
import { getModalStore } from "../api/reportAxios";
import IframeTableu from "./IframeTableu";
import logo_tasty from "../assets/logo_tasty.png";

interface StoreModalProps {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalStoreId: number; //보여줄 가게 가게번호
}
const StoreModal = (props: StoreModalProps) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const resizeListener = () => {
        setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);

    interface storelistI {
        keyword: string;
        review: string;
    }
    interface storeI {
        url: string[];
        list: storelistI[];
        possitive: number;
        location_x: number;
        location_y: number;
        topKeyword: string[];
    }
    const [storeData, setStoreData] = useState<storeI>();
    // keyword: ["분위기 좋은", "힙함", "맛집"],
    // url: [
    //     "https://public.tableau.com/views/_16850810670700/_?:language=ko-KR&publish=yes&:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=true&행정동=가회동&업종=동남아시아&상가업소번호=MA010120220800040531&상가업소번호=MA010120220800040531",
    //     "https://public.tableau.com/views/_16850810670700/_?:language=ko-KR&publish=yes&:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=true&행정동=가회동&업종=동남아시아&상가업소번호=MA010120220800040531&상가업소번호=MA010120220800040531",
    // ],
    // review: [
    //     {
    //         kw: "분위기좋은",
    //         re: "이아아아 분위기가좋아ㅛ 아아아ㅏ아",
    //     },
    //     {
    //         kw: "힙함",
    //         re: "힙해여 아아아ㅏ아",
    //     },
    //     {
    //         kw: "ㄱ",
    //         re: "ㄱ 아아아ㅏ아",
    //     },
    //     {
    //         kw: "ㄴ",
    //         re: "ㄴ 아아아ㅏ아",
    //     },
    //     {
    //         kw: "ㄷ",
    //         re: "ㄷ 아아아ㅏ아",
    //     },
    //     {
    //         kw: "ㄹ",
    //         re: "ㄹ 아아아ㅏ아",
    //     },
    //     {
    //         kw: "ㅁ",
    //         re: "ㅁ 아아아ㅏ아",
    //     },
    //     {
    //         kw: "ㅂ",
    //         re: "ㅂ 아아아ㅏ아",
    //     },
    //     {
    //         kw: "ㅅ",
    //         re: "ㅅ 아아아ㅏ아",
    //     },
    //     {
    //         kw: "ㅇ",
    //         re: "ㅇ 아아아ㅏ아",
    //     },
    // ],
    // crd: [37.55049472619646, 127.07427075510395],
    // pct: 88.8,
    useEffect(() => {
        getModalStore(props.modalStoreId).then((e) => {
            setStoreData(e);
            console.log(e);
        });
    });

    return (
        <ModalWrap>
            <ModalBackGround onClick={() => props.setModalOpen(false)} />
            <ModalContainer>
                {storeData && (
                    <>
                        <div className={StoreModalStyle.headerRed}>
                            <img
                                src={ic_closeX}
                                style={{ height: "80%" }}
                                onClick={() => props.setModalOpen(false)}
                            />
                        </div>
                        <div className={StoreModalStyle.title}>
                            <div style={{ fontSize: "1.4rem" }}>
                                {props.modalStoreId}
                            </div>
                            <div className={StoreModalStyle.tagsWrap}>
                                {storeData.topKeyword.map(
                                    (e: string, i: number) => (
                                        <div
                                            className={StoreModalStyle.tagEach}
                                            key={i}
                                        >
                                            {e}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className={StoreModalStyle.mainWrap}>
                            <div className={StoreModalStyle.mainEachWrap}>
                                <div className={StoreModalStyle.mainEachTitle}>
                                    키워드
                                </div>
                                <div>
                                    <div style={{ display: "flex" }}>
                                        <IframeTableu
                                            size="50"
                                            src={storeData.url[0]}
                                        />
                                        <IframeTableu
                                            size="50"
                                            src={storeData.url[1]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={StoreModalStyle.mainEachWrap}>
                                <div className={StoreModalStyle.mainEachTitle}>
                                    키워드 리뷰
                                </div>
                                <div className={StoreModalStyle.pctWrap}>
                                    <img
                                        src={logo_tasty}
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                        }}
                                    />
                                    <div className={StoreModalStyle.pctRight}>
                                        <div
                                            className={StoreModalStyle.pctRTop}
                                        >
                                            <div>긍정리뷰</div>
                                            <div>{storeData.possitive}%</div>
                                        </div>
                                        <div>
                                            <ProgressBg>
                                                <Progress
                                                    pct={storeData.possitive}
                                                />
                                            </ProgressBg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {storeData.list.map((e: any, i: number) => (
                                        <div
                                            className={
                                                StoreModalStyle.mainReviewEach
                                            }
                                            key={i}
                                        >
                                            <div
                                                className={
                                                    StoreModalStyle.reviewKeyword
                                                }
                                            >
                                                #{e.keyword}
                                            </div>
                                            <div
                                                className={
                                                    StoreModalStyle.reviewSentence
                                                }
                                            >
                                                {e.review}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={StoreModalStyle.mainEachWrap}>
                                <div>
                                    <KakaoMap
                                        elementsId="Storemap"
                                        mapWidth={innerWidth * 0.53}
                                        mapHeight={258}
                                        crdnt={[
                                            storeData.location_x,
                                            storeData.location_y,
                                        ]}
                                        isForStore={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </ModalContainer>
        </ModalWrap>
    );
};

export default StoreModal;
