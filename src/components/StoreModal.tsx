import React, { useEffect, useRef, useState } from "react";
import {
    ModalBackGround,
    ModalContainer,
    ModalWrap,
} from "../styles/StoreModalST";
import { colors } from "../styles/designSystem";
import ic_closeX from "../assets/ic_closeX.png";
import StoreModalStyle from "../styles/StoreModal.module.css";
import KakaoMap from "./KakaoMap";

interface StoreModalProps {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const StoreModal = (props: StoreModalProps) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const resizeListener = () => {
        setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
    return (
        <ModalWrap>
            <ModalBackGround onClick={() => props.setModalOpen(false)} />
            <ModalContainer>
                <div className={StoreModalStyle.headerRed}>
                    <img
                        src={ic_closeX}
                        style={{ height: "80%" }}
                        onClick={() => props.setModalOpen(false)}
                    />
                </div>
                <div className={StoreModalStyle.title}>
                    <div style={{ fontSize: "1.4rem" }}>가게이름</div>
                    <div className={StoreModalStyle.tagsWrap}>
                        {["#분위기좋은", "#데이트", "#인스타"].map(
                            (e: string, i: number) => (
                                <div
                                    className={StoreModalStyle.tagEach}
                                    key={e}
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
                        <div
                            className={StoreModalStyle.mainKeywordContentsWrap}
                        >
                            <div>키워드그래프</div>
                            <div>워드클라우드</div>
                        </div>
                    </div>
                    <div className={StoreModalStyle.mainEachWrap}>
                        <div className={StoreModalStyle.mainEachTitle}>
                            키워드 리뷰
                        </div>
                        <div>
                            <div className={StoreModalStyle.mainReviewEach}>
                                <div>#분위기좋은</div>
                                <div>내용</div>
                                <div>내용</div>
                            </div>
                            <div className={StoreModalStyle.mainReviewEach}>
                                <div>#데이트</div>
                                <div>내용</div>
                                <div>내용</div>
                            </div>
                        </div>
                    </div>
                    <div className={StoreModalStyle.mainEachWrap}>
                        <div>
                            <KakaoMap
                                elementsId="Storemap"
                                mapWidth={innerWidth * 0.53}
                                mapHeight={258}
                                crdnt={[37.55049472619646, 127.07427075510395]}
                                isForStore={1}
                            />
                        </div>
                    </div>
                </div>
            </ModalContainer>
        </ModalWrap>
    );
};

export default StoreModal;
