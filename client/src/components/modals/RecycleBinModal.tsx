import { useEffect, useRef } from "react";
import { useDeleteFromRecycleBin, useGetRecycleBinNotes, useRestoreFromRecycleBin } from "../../api/RecycleBinNoteApi";

type recycleBinModalProps = {
  closeModal: () => void;
};

const RecycleBinModal = ({ closeModal }: recycleBinModalProps) => {
  const { recycleBinNotes } = useGetRecycleBinNotes();
  const { restoreFromRecycleBin } = useRestoreFromRecycleBin();
  const { deleteFromRecycleBin } = useDeleteFromRecycleBin();

  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modalRef.current) modalRef.current.showModal();
  }, []);

  return (
    <dialog ref={modalRef} className="modal" onCancel={closeModal}>
      <div className="modal-box p-0 border border-neutral bg-base-200">
        <div className="p-5 pb-3">
          <h2 className="text-3xl font-bold text-base-content">Recycle Bin</h2>
          <p className="text-info-content text-sm mt-3">Notes will be automatically deleted after 7 days in the recycle bin.</p>
        </div>

        <div className=" flex flex-col   ">
          <div className="divider my-0 mx-5"></div>
          <div className="flex flex-col gap-2  bg-base-100 m-3 overflow-auto h-70 rounded-lg p-2 border border-neutral">
            {recycleBinNotes?.length === 0 ? (
              <div className="flex flex-col my-auto gap-2 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=" size-10 text-info-content"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="m14.5 12.5-5 5" />
                  <path d="m9.5 12.5 5 5" />
                </svg>
                <p className="text-info-content">No notes in recycleBin</p>
              </div>
            ) : (
              recycleBinNotes?.map((note) => (
                <div className="flex justify-between items-center hover:bg-base-300  p-1 rounded">
                  <div className="flex items-center gap-5">
                    <div
                      className="size-5"
                      ref={(el) => {
                        if (el)
                          el.innerHTML =
                            note.noteIcon ||
                            ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={5} stroke="currentColor" className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>`;
                      }}
                    ></div>

                    <p className="text-base-content truncate w-80 text-sm">{note.noteTitle}</p>
                  </div>
                  <button
                    onClick={() => restoreFromRecycleBin({ noteId: note.id })}
                    className={`flex btn-ghost btn-neutral text-info-content btn btn-xs btn-square shrink-0 relative rounded-lg transition-all `}
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

                  <button
                    onClick={() => deleteFromRecycleBin({ noteId: note.id })}
                    className={`flex btn-ghost btn-neutral text-info-content btn btn-xs btn-square shrink-0 relative rounded-lg transition-all `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
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
