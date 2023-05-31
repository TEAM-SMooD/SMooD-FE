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
        name: string;
        url: string[];
        list: storelistI[];
        positive: number;
        location_x: number;
        location_y: number;
        topKeyword: string[];
    }
    const [storeData, setStoreData] = useState<storeI>();

    useEffect(() => {
        getModalStore(props.modalStoreId).then((e) => {
            setStoreData(e);
        });
    }, [props.modalOpen]);

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
                                {storeData.name}
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
                                            <div>{storeData.positive}%</div>
                                        </div>
                                        <div>
                                            <ProgressBg>
                                                <Progress
                                                    pct={storeData.positive}
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
