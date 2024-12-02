"use client";
import * as faBrandIcons from "@fortawesome/free-brands-svg-icons";
import * as faSolidIcons from "@fortawesome/free-solid-svg-icons";
import * as faRegularIcons from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

type BrandIconsType = typeof faBrandIcons;
type SolidIconsType = typeof faSolidIcons;
type RegularIconsType = typeof faRegularIcons;

export type IconSet = BrandIconsType | SolidIconsType | RegularIconsType;

export interface IconKeyMap {
  icon: FontAwesomeIconProps["icon"];
  key: string;
}

export const generateIconKeyMap = (iconSet: IconSet): Array<IconKeyMap> => {
  return Object.keys(iconSet).map((key) => ({
    icon: Object(iconSet)[key],
    key,
  }));
};

export const cellDimensionsConfig = {
  md: {
    width: 800,
    height: 600,
    columns: 12,
  },
  xs: {
    width: 300,
    height: 500,
    columns: 5,
  },
};

export const generateIconGridData = (
  arr: Array<IconKeyMap>,
  colCount: number
) => {
  const newArr = [];
  let item = [];
  for (let i = 0; i < arr.length; i = i + 1) {
    item.push(arr[i]);
    if (item.length === colCount) {
      newArr.push(item);
      item = [];
    }
  }
  if (item.length) {
    newArr.push(item);
  }

  return newArr;
};

export const IconTabsMap = [
  {
    name: "brand",
    icons: faBrandIcons,
    lable: "Brand",
  },
  {
    name: "solid",
    icons: faSolidIcons,
    lable: "Solid",
  },
  {
    name: "regular",
    icons: faRegularIcons,
    lable: "Regular",
  },
];

export const allIcons = Object({
  ...faBrandIcons,
  ...faRegularIcons,
  ...faSolidIcons,
});
