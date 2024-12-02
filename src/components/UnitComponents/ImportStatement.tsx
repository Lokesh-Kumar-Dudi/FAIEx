interface Props {
  module: string;
  packageName: string;
}

const ImportStatement: React.FC<Props> = ({ module, packageName }) => {
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

export default ImportStatement;
