type ToastType = {
  message: string;
};

const ToastComponent = ({ message }: ToastType) => {
  return (
    <div
      className={` p-4 z-50 slide-in-bottom border border-neutral bg-base-300 text-sm flex items-center gap-1 py-2  fixed bottom-5 left-1/2 transform -translate-x-1/2   shadow-md  rounded-lg `}
    >
      <div className="text-base-content flex items-center p-1">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ToastComponent;
