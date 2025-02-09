const ExpandNavbarButton = ({ expanded, setExpanded }: { expanded: boolean; setExpanded: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <button
      className={`${
        expanded ?? "absolute top-0 left-0   z-50"
      } btn btn-square btn-ghost p-0 size-8 bg-transparent border-0 hover:bg-base-300  btn-soft `}
      onClick={() => setExpanded((prev) => !prev)}
    >
      {expanded ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      )}
    </button>
  );
};

export default ExpandNavbarButton;
