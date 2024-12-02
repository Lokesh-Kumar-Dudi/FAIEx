"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import ThemeToggle from "@/components/UnitComponents/ThemeToggle";
import Icons from "@/components/icons";
import CopyIconCodeDialog from "@/components/UnitComponents/CopyIconCodeDialog";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string | null>();
  const [openIcon, setOpenIcon] = useState<string | null>(null);

  const closeCopyIconDialog = () => {
    setOpenIcon(null);
  };

  return (
    <div className="relative">
      <ThemeToggle />
      <div className="flex flex-col md:p-24 px-8 py-24 justify-center items-center">
        <div className="overflow-hidden border rounded-xl md:p-10 p-4">
          <div className="md:mb-10 mb-4">
            <Input
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search"
            />
          </div>
          <Icons searchQuery={searchQuery} setOpenIcon={setOpenIcon} />
        </div>
      </div>
      <CopyIconCodeDialog name={openIcon} onClose={closeCopyIconDialog} />
    </div>
  );
}
