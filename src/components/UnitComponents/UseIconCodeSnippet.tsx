import SnippetContainer from "./SnippetContainer";

interface Props {
  name: string;
}

const UseIconCodeSnippet: React.FC<Props> = ({ name }) => {
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

export default UseIconCodeSnippet;
