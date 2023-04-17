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
    SiteSelectedStore,
    SiteSelectedConcept,
    SiteOpenedSelect,
    SiteSelectedDistrict,
    SiteSelectedRestaurant,
} from "../state/atom";
import {
    districtArr,
    sungsuArr,
    bukchonArr,
    shinchonArr,
    storeArr,
    restaurantArr,
    conceptArr,
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
}
interface StoreSelectBoxProps {
    openId?: number;
    dropdownId?: string;
    handleOnclick: () => void;
    state: any;
    changeState: React.Dispatch<React.SetStateAction<string>>;
    resState: string;
    resChangeState: React.Dispatch<React.SetStateAction<string>>;
}

const StoreSelectBox = (props: StoreSelectBoxProps) => {
    const [openedSelect, setOpenedSelect] = useRecoilState(SiteOpenedSelect);

    useEffect(() => {
        if (props.state == "카페") {
            setOpenedSelect(0);
        } else if (props.resState != "") {
            setOpenedSelect(0);
        }
    }, [props.state, props.resState]);
    console.log(openedSelect, props.state, props.resState);
    return (
        <>
            <STselectbox isOpen={openedSelect == props.openId}>
                <STselectWrap onClick={props.handleOnclick}>
                    <STicons src={ic_concept} />
                    <div>
                        {props.state} {props.resState ? " | " : ""}
                        {props.resState ? props.resState : ""}
                    </div>
                    <img
                        src={ic_arrow}
                        style={{
                            rotate: "180deg",
                            width: "24px",
                        }}
                    />
                </STselectWrap>
                {openedSelect == props.openId ? (
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
    const [selectedConcept, setSelectedConcept] =
        useRecoilState(SiteSelectedConcept);
    const [openedSelect, setOpenedSelect] = useRecoilState(SiteOpenedSelect);

    console.log(selectedConcept);
    return (
        <>
            <STselectbox isOpen={openedSelect == props.openId}>
                <STselectWrap onClick={props.handleOnclick}>
                    <STicons src={ic_concept} />
                    <div>
                        {selectedConcept.length == 1
                            ? "컨셉을 선택해주세요"
                            : selectedConcept.map((e: string) =>
                                  e != "" ? e + " | " : ""
                              )}
                    </div>
                    <img
                        src={ic_arrow}
                        style={{
                            rotate: "180deg",
                            width: "24px",
                        }}
                    />
                </STselectWrap>
                {openedSelect == props.openId ? (
                    <STConceptDropdown>
                        {conceptArr.map((each, i) =>
                            handleSelectDropdownEach("concept", each, () => {
                                if (selectedConcept.includes(each)) {
                                    const changeConcept =
                                        selectedConcept.filter(
                                            (e) => e != each
                                        );
                                    setSelectedConcept(changeConcept);
                                } else {
                                    setSelectedConcept((prev) => [
                                        ...prev,
                                        each,
                                    ]);
                                }
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
    const [openedSelect, setOpenedSelect] = useRecoilState(SiteOpenedSelect);

    useEffect(() => {
        setOpenedSelect(0);
    }, [props.state]);

    return (
        <>
            <STselectbox isOpen={openedSelect == props.openId}>
                <STselectWrap onClick={props.handleOnclick}>
                    <STicons src={ic_concept} />
                    <div>{props.state}</div>
                    <img
                        src={ic_arrow}
                        style={{
                            rotate: "180deg",
                            width: "24px",
                        }}
                    />
                </STselectWrap>
                {openedSelect == props.openId ? (
                    <STDistritDropdown>
                        {districtArr.map((each, i) =>
                            handleSelectDropdownEach("store", each, () =>
                                props.changeState(each)
                            )
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
