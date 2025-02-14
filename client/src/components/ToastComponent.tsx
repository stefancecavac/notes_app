type ToastType = {
  message: string;
  type: "SUCCESS" | "WARNING";
};

const ToastComponent = ({ message, type }: ToastType) => {
  return (
    <div
      className={`${
        type === "SUCCESS" ? "bg-success" : "bg-error"
      } p-2 z-50 slide-in-bottom border border-neutral  text-sm flex items-center gap-1 py-2  fixed bottom-5 left-1/2 transform -translate-x-1/2   shadow-md  rounded-lg `}
    >
      {type === "WARNING" && (
        <div className="text-white flex items-center gap-2">
          <div className="rounded-lg p-1 bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>

          <p>{message}</p>
        </div>
      )}
      {type === "SUCCESS" && (
        <div className="text-white flex items-center gap-2">
          <div className="rounded-lg p-1 bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </div>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ToastComponent;
