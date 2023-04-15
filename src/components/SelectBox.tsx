import React, { useEffect, useState } from "react";
import {
    STselectbox,
    STselectWrap,
    STicons,
    STStoreDropdown,
    STDistritDropdown,
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
}

const StoreSelectBox = (props: SelectBoxProps) => {
    const [selectedStore, setSelectedStore] = useRecoilState(SiteSelectedStore);
    const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
        SiteSelectedRestaurant
    );
    const [openedSelect, setOpenedSelect] = useRecoilState(SiteOpenedSelect);

    useEffect(() => {
        if (selectedStore == "카페") {
            setOpenedSelect(0);
        } else if (selectedRestaurant != "") {
            setOpenedSelect(0);
        }
    }, [selectedStore, selectedRestaurant]);
    return (
        <>
            <STselectbox isOpen={openedSelect == props.openId}>
                <STselectWrap onClick={props.handleOnclick}>
                    <STicons src={ic_concept} />
                    <div>
                        {selectedStore}{" "}
                        {selectedRestaurant ? " | selectedRestaurant" : ""}
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
                    selectedStore == "음식점" ? (
                        <STStoreDropdown>
                            {restaurantArr.map((each, i) =>
                                handleSelectDropdownEach(
                                    "restaurant",
                                    each,
                                    () => setSelectedRestaurant(each)
                                )
                            )}
                        </STStoreDropdown>
                    ) : (
                        <STStoreDropdown>
                            {storeArr.map((each, i) =>
                                handleSelectDropdownEach("store", each, () =>
                                    setSelectedStore(each)
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
const DistrictSelectBox = (props: SelectBoxProps) => {
    const [selectedDistrict, setSelectedDistrict] =
        useRecoilState(SiteSelectedDistrict);
    const [openedSelect, setOpenedSelect] = useRecoilState(SiteOpenedSelect);

    useEffect(() => {
        setOpenedSelect(0);
    }, [selectedDistrict]);

    return (
        <>
            <STselectbox onClick={props.handleOnclick}>
                <STselectWrap>
                    <STicons src={ic_concept} />
                    <div>{selectedDistrict}</div>
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
                                setSelectedDistrict(each)
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

export { StoreSelectBox, DistrictSelectBox };
