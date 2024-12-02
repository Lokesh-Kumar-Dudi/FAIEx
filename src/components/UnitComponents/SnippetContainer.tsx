interface Props {
  children: React.ReactNode;
}

const SnippetContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="border rounded-lg md:py-3 md:px-6 p-3 bg-[#181717] border-neutral-400">
      {children}
    </div>
  );
};

export default SnippetContainer;
