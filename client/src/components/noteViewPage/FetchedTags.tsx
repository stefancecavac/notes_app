import { useGetAllTags } from "../../api/TagApi";

const FetchedTags = ({ addTag }: { addTag: ({ name }: { name: string }) => void }) => {
  const { tags } = useGetAllTags();

  return (
    <div className="mt-2 flex flex-col px-3">
      <p>Your tags:</p>
      <div className="grid grid-cols-3 gap-2 my-2 ">
        {tags?.map((tag) => (
          <span
            onClick={() => addTag({ name: tag.name })}
            style={{ backgroundColor: tag.backgroundColor, color: tag.textColor }}
            key={tag.id}
            className="rounded-md px-2 py-0.5 bg-gray-200 cursor-pointer"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FetchedTags;
