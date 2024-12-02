"use client";
import { Dispatch, SetStateAction } from "react";
import { TabsContent } from "@/components/ui/tabs";
import Fuse from "fuse.js";

import { Grid } from "react-virtualized";
import useWindowSize from "@/hooks/useWindowSize";
import {
  cellDimensionsConfig,
  generateIconGridData,
  generateIconKeyMap,
  IconKeyMap,
  IconSet,
} from "./utils";

import Icon from "../UnitComponents/Icon";

interface Props {
  value: string;
  icons: IconSet;
  searchQuery?: string | null;
  setOpenIcon: Dispatch<SetStateAction<string | null>>;
}

const commonFuseOptions = {
  includeScore: true,
  keys: ["key"],
};

const cellRenderer = (
  {
    columnIndex,
    key,
    rowIndex,
    style,
  }: { columnIndex: number; key: string; rowIndex: number; style: object },
  list: Array<Array<IconKeyMap>>,
  setOpenIcon: Dispatch<SetStateAction<string | null>>
) => {
  const { icon, key: name } = list[rowIndex][columnIndex] || {};
  if (!icon) {
    return;
  }
  return (
    <div key={key} style={style} onClick={() => setOpenIcon(name)}>
      <Icon key={key} icon={icon} name={name}></Icon>
    </div>
  );
};

const IconTabsContent: React.FC<Props> = ({
  value,
  icons,
  searchQuery,
  setOpenIcon,
}) => {
  const { width } = useWindowSize();
  const keyMappedIcons = generateIconKeyMap(icons);
  const fuse = new Fuse(keyMappedIcons, commonFuseOptions);

  const dimensionKey = width < 500 ? "xs" : "md";
  const dimensions = cellDimensionsConfig[dimensionKey];

  const iconsToGrid = searchQuery
    ? fuse.search(searchQuery).map(({ item }) => item)
    : keyMappedIcons;

  const solidIconsToDisplay = generateIconGridData(
    iconsToGrid,
    dimensions.columns
  );

  return (
    <TabsContent value={value}>
      <div className="md:max-h-[calc(100vh-420px)] max-h-[calc(100vh-330px)] overflow-scroll md:px-4 px-2 no-scrollbar">
        <Grid
          cellRenderer={(...args) =>
            cellRenderer(...args, solidIconsToDisplay, setOpenIcon)
          }
          columnCount={solidIconsToDisplay[0].length}
          rowCount={solidIconsToDisplay.length}
          columnWidth={dimensions.width / dimensions.columns}
          height={dimensions.height}
          rowHeight={50}
          width={dimensions.width}
        />
      </div>
    </TabsContent>
  );
};

export default IconTabsContent;
