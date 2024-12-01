"use client";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import * as faBrandIcons from "@fortawesome/free-brands-svg-icons";
import * as faSolidIcons from "@fortawesome/free-solid-svg-icons";
import * as faRegularIcons from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Fuse from "fuse.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type BrandIconsType = typeof faBrandIcons;
type SolidIconsType = typeof faSolidIcons;
type RegularIconsType = typeof faRegularIcons;

type IconSet = BrandIconsType | SolidIconsType | RegularIconsType;

const generateIconKeyMap = (iconSet: IconSet) => {
  return Object.keys(iconSet).map((key) => ({
    icon: Object(iconSet)[key],
    key,
  }));
};

const formatName = (key: string) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, function (match) {
      return match.toUpperCase();
    })
    .replace("Fa ", "");
};

const BrandIcons = generateIconKeyMap(faBrandIcons);
const SolidIcons = generateIconKeyMap(faSolidIcons);
const RegularIcons = generateIconKeyMap(faRegularIcons);

const commonFuseOptions = {
  includeScore: true,
  keys: ["key"],
};

const BrandIconsFuse = new Fuse(BrandIcons, commonFuseOptions);
const SolidIconsFuse = new Fuse(SolidIcons, commonFuseOptions);
const RegularIconsFuse = new Fuse(RegularIcons, commonFuseOptions);

const getModuleName = (key: string) => {
  if (Object.keys(faBrandIcons).includes(key)) {
    return "@fortawesome/free-brands-svg-icons";
  } else if (Object.keys(faSolidIcons).includes(key)) {
    return "@fortawesome/free-solid-svg-icons";
  } else if (Object.keys(faBrandIcons).includes(key)) {
    return "@fortawesome/free-regular-svg-icons";
  } else return "";
};

const SnippetContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="border rounded-lg md:py-3 md:px-6 p-3 bg-[#181717] border-neutral-400">
      {children}
    </div>
  );
};

const ImportStatement: React.FC<{ module: string; packageName: string }> = ({
  module,
  packageName,
}) => {
  return (
    <p className="font-mono text-xs md:text-base">
      <span className="text-[#811c81]">import</span>
      <span className="text-yellow-400">{` { `}</span>
      <span className="text-sky-300">{module}</span>
      <span className="text-yellow-400">{` } `}</span>
      <span className="text-[#811c81]">from </span>
      <span className="text-yellow-800">`{packageName}`</span>
      <span>;</span>
    </p>
  );
};

const ImportCodeSnippet: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <SnippetContainer>
      <ImportStatement
        module={`FontAwesomeIcon`}
        packageName={"@fortawesome/react-fontawesome"}
      />
      <ImportStatement module={name} packageName={getModuleName(name)} />
    </SnippetContainer>
  );
};

const UseIconCodeSnippet: React.FC<{
  name: string;
}> = ({ name }) => {
  return (
    <SnippetContainer>
      <p className="font-mono">
        <span>{`<`}</span>
        <span className="text-green-900">FontAwesomeIcon</span>
        <span className="text-sky-300"> icon=</span>
        <span className="text-blue-600">{`{`}</span>
        <span className="text-sky-300">{`${name}`}</span>
        <span className="text-blue-600">{`}`}</span>
        <span />
        {` />`}
      </p>
    </SnippetContainer>
  );
};

const CopyIconCodeDialog: React.FC<{
  name: string;
  children: React.ReactNode;
  icon: FontAwesomeIconProps["icon"];
}> = ({ children, name, icon }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:min-w-[550px] min-w-[90%] ">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row gap-4">
              {formatName(name)}
              <FontAwesomeIcon icon={icon} />
            </div>
          </DialogTitle>
          <DialogDescription className="gap-4 flex flex-col pt-6">
            <div>
              <p>Add following imports to your file</p>
              <ImportCodeSnippet name={name} />
            </div>
            <div>
              <p>Use the icon like below</p>
              <UseIconCodeSnippet name={name} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2"></div>
          <span className="sr-only">Copy</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Icon: React.FC<{ icon: FontAwesomeIconProps["icon"]; name: string }> = ({
  icon,
  name,
}) => {
  const formattedName = formatName(name);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <CopyIconCodeDialog name={name} icon={icon}>
            <div className="flex flex-col p-2 hover:cursor-pointer">
              <FontAwesomeIcon icon={icon} size="2xl" />
            </div>
          </CopyIconCodeDialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>{formattedName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const IconTabsContent: React.FC<{
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <TabsContent value={value}>
      <div className="grid md:grid-cols-12 grid-cols-5 md:gap-8 md:max-h-[calc(100vh-420px)] max-h-[calc(100vh-330px)] overflow-scroll md:px-4 px-2 no-scrollbar">
        {children}
      </div>
    </TabsContent>
  );
};

export default function Home() {
  const { setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string | null>();
  const [darkTheme, setDarkTheme] = useState<boolean>(true);

  const handleThemeChange = () => {
    const theme = darkTheme ? "light" : "dark";
    setTheme(theme);
    setDarkTheme((prev) => !prev);
  };

  const brandIconsToDisplay = searchQuery
    ? BrandIconsFuse.search(searchQuery).map(({ item }) => item)
    : BrandIcons;

  const solidIconsToDisplay = searchQuery
    ? SolidIconsFuse.search(searchQuery).map(({ item }) => item)
    : SolidIcons;

  const regularIconsToDisplay = searchQuery
    ? RegularIconsFuse.search(searchQuery).map(({ item }) => item)
    : RegularIcons;

  return (
    <div className="relative">
      <div className="absolute top-5 right-5 flex flex-row gap-5 ">
        {!darkTheme ? (
          <FontAwesomeIcon icon={faSolidIcons.faMoon} />
        ) : (
          <div className="w-[20px]"> </div>
        )}
        <Switch onClick={handleThemeChange} />
        {darkTheme ? (
          <FontAwesomeIcon icon={faSolidIcons.faSun} />
        ) : (
          <div className="w-[20px]"> </div>
        )}
      </div>
      <div className="flex flex-col w-full py-24 justify-center items-center">
        <div className="md:max-h-[calc(100vh-192px)] max-h-[calc(100vh-100px)] overflow-hidden border rounded-xl md:p-10 p-4">
          <div className="md:mb-10 mb-4">
            <Input
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search"
            />
          </div>
          <Tabs defaultValue="brand">
            <TabsList className="md:mb-4 mb-2">
              <TabsTrigger value="brand">Brand</TabsTrigger>
              <TabsTrigger value="solid">Solid</TabsTrigger>
              <TabsTrigger value="regular">Regular</TabsTrigger>
            </TabsList>
            <IconTabsContent value="brand">
              {brandIconsToDisplay.map(({ key, icon }) => (
                <Icon key={key} icon={icon} name={key}></Icon>
              ))}
            </IconTabsContent>
            <IconTabsContent value="solid">
              {solidIconsToDisplay.map(({ key, icon }) => (
                <Icon key={key} icon={icon} name={key}></Icon>
              ))}
            </IconTabsContent>
            <IconTabsContent value="regular">
              {regularIconsToDisplay.map(({ key, icon }) => (
                <Icon key={key} icon={icon} name={key}></Icon>
              ))}
            </IconTabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
