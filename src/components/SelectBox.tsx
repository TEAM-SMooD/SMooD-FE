import React, { useEffect, useState } from "react";
import {
    STselectbox,
    STselectWrap,
    STicons,
    STStoreDropdown,
    STDistritDropdown,
    STConceptDropdown,
} from "../styles/SelectST";
import ic_concept from "../assets/ic_concept.png";
import ic_arrow from "../assets/ic_arrow.png";
import { useRecoilState } from "recoil";
import {
    SiteOpenedSelect,
    SiteSelectedStore,
    SiteSelectedRestaurant,
    AnalysisSelectedDistrict,
    selectedDistrictCrdnt,
} from "../state/atom";
import {
    districtArr,
    storeArr,
    restaurantArr,
    conceptArr,
    crdntList,
} from "../data/concepmodalData";
import SelectStyle from "../styles/SelectBox.module.css";

export const handleSelectDropdownEach = (
    id: string,
    each: string,
    handelClick: () => void
) => {
    return (
        <div
            key={each}
            onClick={handelClick}
            className={
                id == "store"
                    ? `${SelectStyle.store}`
                    : id == "restaurant"
                    ? `${SelectStyle.restaurant}`
                    : ""
            }
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
            }}
        >
            {each}
        </div>
    );
};
interface SelectBoxProps {
    openId?: number;
    dropdownId?: string;
    handleOnclick: () => void;
    state: any;
    changeState: React.Dispatch<React.SetStateAction<string>>;
    // ? 붙이면안됨! Cannot invoke an object which is possibly 'undefined'.ts(2722)
    openedSelect: number;
    setOpenedSelect: React.Dispatch<React.SetStateAction<number>>;
    concept?: boolean;
}
interface StoreSelectBoxProps {
    openId?: number;
    dropdownId?: string;
    handleOnclick: () => void;
    state: any;
    changeState: React.Dispatch<React.SetStateAction<string>>;
    resState: string;
    resChangeState: React.Dispatch<React.SetStateAction<string>>;
    openedSelect: number;
    setOpenedSelect: React.Dispatch<React.SetStateAction<number>>;
    concept?: boolean;
}

const StoreSelectBox = (props: StoreSelectBoxProps) => {
    const [selectedStore, setSelectedStore] = useRecoilState(SiteSelectedStore);
    const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
        SiteSelectedRestaurant
    );
    useEffect(() => {
        if (props.openedSelect == 1) {
            if (props.state == "카페") {
                props.setOpenedSelect(0);
            } else if (props.resState != "") {
                props.setOpenedSelect(0);
            }
        }
    }, [props.state, props.resState]);
    return (
        <>
            <STselectbox
                isOpen={props.openedSelect == props.openId}
                concept={props.concept}
            >
                <STselectWrap onClick={props.handleOnclick}>
                    <STicons src={ic_concept} />
                    <div>
                        {props.state} {props.resState ? " | " : ""}
                        {props.resState ? props.resState : ""}
                    </div>
                    <img
                        src={ic_arrow}
                        style={{
                            display:
                                props.openedSelect == props.openId
                                    ? "none"
                                    : "",
                            rotate: "180deg",
                            width: "24px",
                        }}
                    />
                </STselectWrap>
                {props.openedSelect == props.openId ? (
                    props.state == "음식점" ? (
                        <STStoreDropdown>
                            {restaurantArr.map((each, i) =>
                                handleSelectDropdownEach(
                                    "restaurant",
                                    each,
                                    () => props.resChangeState(each)
                                )
                            )}
                        </STStoreDropdown>
                    ) : (
                        <STStoreDropdown>
                            {storeArr.map((each, i) =>
                                handleSelectDropdownEach("store", each, () =>
                                    props.changeState(each)
                                )
                            )}
                        </STStoreDropdown>
                    )
                ) : (
                    ""
                )}
            </STselectbox>
        </>
    );
};
const ConceptSelectBox = (props: SelectBoxProps) => {
    return (
        <>
            <STselectbox isOpen={props.openedSelect == props.openId}>
                <STselectWrap onClick={props.handleOnclick}>
                    <STicons src={ic_concept} />
                    <div>
                        {props.state.length == 1
                            ? "컨셉을 선택해주세요"
                            : props.state.map((e: string) =>
                                  e != "" ? e + " | " : ""
                              )}
                    </div>
                    <img
                        src={ic_arrow}
                        style={{
                            display:
                                props.openedSelect == props.openId
                                    ? "none"
                                    : "",
                            rotate: "180deg",
                            width: "24px",
                        }}
                    />
                </STselectWrap>
                {props.openedSelect == props.openId ? (
                    <STConceptDropdown>
                        {conceptArr.map((each, i) =>
                            handleSelectDropdownEach("concept", each, () => {
                                props.changeState(each);
                            })
                        )}
                    </STConceptDropdown>
                ) : (
                    ""
                )}
            </STselectbox>
        </>
    );
};
const DistrictSelectBox = (props: SelectBoxProps) => {
    const [crdnt, setCrdnt] = useRecoilState(selectedDistrictCrdnt);

    useEffect(() => {
        if (props.openedSelect == 3) {
            if (props.state != "지역을 선택하세요") {
                props.setOpenedSelect(0);
            }
        }
    }, [props.state]);

    return (
        <>
            <STselectbox
                isOpen={props.openedSelect == props.openId}
                concept={props.concept}
            >
                <STselectWrap onClick={props.handleOnclick}>
                    <STicons src={ic_concept} />
                    <div>{props.state}</div>
                    <img
                        src={ic_arrow}
                        style={{
                            display:
                                props.openedSelect == props.openId
                                    ? "none"
                                    : "",
                            rotate: "180deg",
                            width: "24px",
                        }}
                    />
                </STselectWrap>
                {props.openedSelect == props.openId ? (
                    <STDistritDropdown>
                        {districtArr.map((each, i) =>
                            handleSelectDropdownEach("store", each, () => {
                                props.changeState(each);
                                if (props.concept) {
                                    setCrdnt(crdntList[each]);
                                }
                            })
                        )}
                    </STDistritDropdown>
                ) : (
                    ""
                )}
            </STselectbox>
        </>
    );
};

export { StoreSelectBox, ConceptSelectBox, DistrictSelectBox };
