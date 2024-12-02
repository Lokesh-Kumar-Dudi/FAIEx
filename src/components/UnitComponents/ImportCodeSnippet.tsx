import SnippetContainer from "./SnippetContainer";
import ImportStatement from "./ImportStatement";

import * as faBrandIcons from "@fortawesome/free-brands-svg-icons";
import * as faSolidIcons from "@fortawesome/free-solid-svg-icons";
import * as faRegularIcons from "@fortawesome/free-regular-svg-icons";

const getModuleName = (key: string) => {
  if (Object.keys(faBrandIcons).includes(key)) {
    return "@fortawesome/free-brands-svg-icons";
  } else if (Object.keys(faSolidIcons).includes(key)) {
    return "@fortawesome/free-solid-svg-icons";
  } else if (Object.keys(faRegularIcons).includes(key)) {
    return "@fortawesome/free-regular-svg-icons";
  } else return "";
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

export default ImportCodeSnippet;
