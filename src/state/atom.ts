import { atom } from "recoil";

export const selectedDistrictCrdnt = atom({
    key: "selectedDistrictCrdnt",
    default: [37.56355393394405, 126.98066789603592],
});
export const ConceptOpenedSelect = atom({
    key: "ConceptOpenedSelect",
    default: 0,
});
export const ConceptSelectedDistrict = atom({
    key: "ConceptSelectedDistrict",
    default: "지역을 선택하세요",
});
export const ConceptSelectedDistrict2 = atom({
    //지역 상세
    key: "ConceptSelectedDistrict2",
    default: "",
});
export const ConceptSelectedStore = atom({
    key: "ConceptSelectedStore",
    default: "업종을 선택하세요",
});
export const ConceptSelectedRestaurant = atom({
    key: "ConceptSelectedRestaurant",
    default: "",
});

// Site
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
    default: [""],
});

// Analysis
export const AnalysisOpenedSelect = atom({
    key: "AnalysisOpenedSelect",
    default: 0,
});
export const AnalysisSelectedStore = atom({
    key: "AnalysisSelectedStore",
    default: "업종을 선택하세요",
});
export const AnalysisSelectedRestaurant = atom({
    key: "AnalysisSelectedRestaurant",
    default: "",
});
export const AnalysisSelectedDistrict = atom({
    key: "AnalysisSelectedDistrict",
    default: "지역을 선택하세요",
});
export const AnalysisSelectedDistrict2 = atom({
    key: "AnalysisSelectedDistrict2",
    default: "",
});
