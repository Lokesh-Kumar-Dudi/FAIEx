"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import IconTabsContent from "./IconTabsContent";
import { IconTabsMap } from "./utils";
import { Dispatch, SetStateAction } from "react";

interface Props {
  searchQuery?: string | null;
  setOpenIcon: Dispatch<SetStateAction<string | null>>;
}

const Icons: React.FC<Props> = ({ searchQuery, setOpenIcon }) => {
  return (
    <Tabs defaultValue="brand">
      <TabsList>
        {IconTabsMap.map((value) => (
          <TabsTrigger key={value.name} value={value.name}>
            {value.lable}
          </TabsTrigger>
        ))}
      </TabsList>

      {IconTabsMap.map((value) => (
        <IconTabsContent
          key={`content_${value.name}`}
          value={value.name}
          icons={value.icons}
          searchQuery={searchQuery}
          setOpenIcon={setOpenIcon}
        />
      ))}
    </Tabs>
  );
};

export default Icons;
