import ReactDOM from "react-dom";
import { useState, forwardRef, useEffect, useImperativeHandle } from "react";
import SmallNewPost from "../forms/SmallNewPost";
import { UploadPostProvider } from "../../context/upload-context";
import { useModalPortal } from "../../hooks/useModalPortal";
import { useRef } from "react";

export const ModalPortal = forwardRef((props, ref) => {
  const [modal, setModal] = useState(false);
  const { loaded } = useModalPortal();
  const bgRef = useRef();

  useImperativeHandle(ref, () => ({
    toggleModal() {
      setModal((state) => !state);
    },
  }));

  if (!loaded || !modal) return <></>;

  return ReactDOM.createPortal(
    <div
      ref={bgRef}
      onClick={(e) => bgRef.current === e.target && setModal(false)}
      className="modal flex h-screen w-screen items-center justify-center bg-slate-900/10 p-4 dark:bg-slate-500/50"
    >
      <section className="rounded-2xl bg-white p-4 shadow dark:border dark:border-slate-700 dark:bg-slate-900">
        <button type="button" onClick={() => setModal((state) => !state)}>
          <svg
            className="h-6 w-6 text-black dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <UploadPostProvider>
          <SmallNewPost post />
        </UploadPostProvider>
      </section>
    </div>,
    document.getElementById("modal")
  );
});
