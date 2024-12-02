import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { makeHumanReadableName } from "@/utils";

import ImportCodeSnippet from "./ImportCodeSnippet";
import UseIconCodeSnippet from "./UseIconCodeSnippet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { allIcons } from "../icons/utils";

const CopyIconCodeDialog: React.FC<{
  name: string | null;
  onClose: () => void;
}> = ({ name, onClose }) => {
  if (!name) {
    return null;
  }

  return (
    <Dialog open={!!name} onOpenChange={onClose}>
      <DialogContent className="md:min-w-[550px] min-w-[90%] ">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row gap-4">
              {makeHumanReadableName(name)}
              <FontAwesomeIcon icon={allIcons[name]} />
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

export default CopyIconCodeDialog;
