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

export const handleSelectDropdownEach = (
    id: string,
    each: string,
    handelClick: () => void
) => {
    return (
        <div
            key={each}
            onClick={handelClick}
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
    console.log(openedSelect, selectedStore, props.openId, selectedRestaurant);

    useEffect(() => {
        if (selectedStore == "카페") {
            setSelectedRestaurant(" ");
            setOpenedSelect(0);
        } else if (selectedStore == "음식점" && selectedRestaurant != "") {
            setOpenedSelect(0);
        }
    }, [selectedStore, selectedRestaurant]);
    return (
        <>
            <STselectbox onClick={props.handleOnclick}>
                <STselectWrap>
                    <STicons src={ic_concept} />
                    <div>{selectedStore}</div>
                    <img
                        src={ic_arrow}
                        style={{
                            rotate: "180deg",
                            width: "24px",
                        }}
                    />
                </STselectWrap>
                {openedSelect == props.openId ? (
                    selectedStore == "업종을 선택하세요" ? (
                        <STStoreDropdown>
                            {storeArr.map((each, i) =>
                                handleSelectDropdownEach("store", each, () =>
                                    setSelectedStore(each)
                                )
                            )}
                        </STStoreDropdown>
                    ) : selectedStore == "음식점" ? (
                        selectedRestaurant != "" ? ( // 음식점 하위까지 선택했지만 한번 더 누른경우
                            <STStoreDropdown>
                                {storeArr.map((each, i) =>
                                    handleSelectDropdownEach(
                                        "store",
                                        each,
                                        () => setSelectedStore(each)
                                    )
                                )}
                            </STStoreDropdown>
                        ) : (
                            <STStoreDropdown>
                                {restaurantArr.map((each, i) =>
                                    handleSelectDropdownEach(
                                        "restaurant",
                                        each,
                                        () => setSelectedRestaurant(each)
                                    )
                                )}
                            </STStoreDropdown>
                        )
                    ) : (
                        // selectedStore == 카페
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
