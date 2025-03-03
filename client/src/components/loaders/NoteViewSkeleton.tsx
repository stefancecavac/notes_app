import SkeletonLoader from "./SkeletonLoader";

const NoteViewSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 h-full w-full group/global overflow-auto">
      <div className="p-3">
        <SkeletonLoader width={150} height={20} />
      </div>
      <div className="group/titleItems ">
        <div className="lg:mx-60 mx-25 relative mt-20 transition-all">
          <div className="flex items-center gap-3">
            <div className="flex flex-col w-full">
              <SkeletonLoader width="100%" height={40} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 mb-5 lg:mx-60 mx-25 relative mt-10 transition-all"></div>
    </div>
  );
};

export default NoteViewSkeleton;
