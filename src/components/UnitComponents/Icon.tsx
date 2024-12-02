import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import { makeHumanReadableName } from "@/utils";

const Icon: React.FC<{ icon: FontAwesomeIconProps["icon"]; name: string }> = ({
  icon,
  name,
}) => {
  const formattedName = makeHumanReadableName(name);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col p-2 hover:cursor-pointer">
            <FontAwesomeIcon icon={icon} size="2xl" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{formattedName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Icon;
