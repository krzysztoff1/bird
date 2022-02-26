import { useRef } from "react";

const Modal = ({ md, modal, toggleModal, title, subTitle, children }) => {
  const modalRef = useRef();

  function closeModal(e) {
    if (e.target === modalRef.current) return toggleModal(false);
  }

  return (
    <>
      {modal ? (
        <div
          ref={modalRef}
          onClick={(e) => closeModal(e)}
          className={`fixed z-[1000] flex h-screen w-screen items-center justify-center bg-slate-700/30 align-middle backdrop-blur-sm`}
        >
          <div className="h-modal z-50 mx-auto items-center justify-center overflow-y-auto overflow-x-hidden sm:h-full md:inset-0">
            <div className={`relative h-full w-[80vw]  px-4 md:h-auto`}>
              <div className="relative max-w-xs rounded-2xl bg-white shadow dark:bg-slate-900">
                <div className="flex justify-end p-2">
                  <button
                    onClick={() => toggleModal(false)}
                    type="button"
                    className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="p-6 pt-0 ">
                  <h3 className="mb-2 text-2xl font-bold  text-slate-900 dark:text-slate-100">
                    {title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-400">
                    {subTitle}
                  </p>
                  <div className="mt-6 flex flex-col">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
