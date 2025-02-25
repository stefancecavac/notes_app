import { useEffect, useRef } from "react";
import { useGetRecycleBinNotes, useRestoreFromRecycleBin } from "../../api/RecycleBinNoteApi";

type recycleBinModalProps = {
  closeModal: () => void;
};

const RecycleBinModal = ({ closeModal }: recycleBinModalProps) => {
  const { recycleBinNotes } = useGetRecycleBinNotes();
  const { restoreFromRecycleBin } = useRestoreFromRecycleBin();

  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modalRef.current) modalRef.current.showModal();
  }, []);

  return (
    <dialog ref={modalRef} className="modal" onCancel={closeModal}>
      <div className="modal-box p-0 border border-neutral">
        <div className="p-5 pb-3">
          <h2 className="text-3xl font-bold text-base-content">Recycle Bin</h2>
          <p className="text-info-content text-sm mt-3">Notes will be automatically deleted after 7 days in the recycle bin.</p>
        </div>

        <div className=" flex flex-col   ">
          <div className="divider my-0 mx-5"></div>
          <div className="flex flex-col gap-2  overflow-auto h-100 w-full  p-5">
            {recycleBinNotes?.map((note) => (
              <div className="flex justify-between items-center hover:bg-base-300  p-1 rounded">
                <div className="flex items-center gap-5">
                  <div
                    className="size-5"
                    ref={(el) => {
                      if (el)
                        el.innerHTML =
                          note.icon ||
                          ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>`;
                    }}
                  ></div>

                  <p className="text-base-content truncate w-80 text-sm">{note.title}</p>
                </div>
                <button
                  onClick={() => restoreFromRecycleBin({ value: false, noteId: note.id })}
                  className={`flex btn-ghost btn btn-xs btn-square shrink-0 relative rounded-lg transition-all `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={closeModal}>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default RecycleBinModal;
