import { atom } from "recoil";

export const selectedDistrictCrdnt = atom({
    key: "selectedDistrictCrdnt",
    default: [37.56355393394405, 126.98066789603592],
});

export const SiteOpenedSelect = atom({
    key: "SiteOpenedSelect",
    default: 0,
});
export const SiteSelectedStore = atom({
    key: "SiteSelectedStore",
    default: "업종을 선택하세요",
});
export const SiteSelectedRestaurant = atom({
    key: "SiteSelectedRestaurant",
    default: "",
});
export const SiteSelectedConcept = atom({
    key: "SiteSelectedConcept",
    default: "컨셉을 선택하세요",
});
export const SiteSelectedDistrict = atom({
    key: "SiteSelectedDistrict",
    default: "지역을 선택하세요",
});
