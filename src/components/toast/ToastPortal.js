import ReactDOM from "react-dom";
import { Toast } from "./Toast";
import { uuid } from "../../helpers/uuid";
import { useToastPortal } from "../../hooks/useToastPortal";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export const ToastPortal = forwardRef(
  ({ autoClose = true, autoCloseTime = 3000 }, ref) => {
    const [toasts, setToasts] = useState([]);
    const { loaded, portalId } = useToastPortal();
    const [removing, setRemoving] = useState("");

    useEffect(() => {
      if (removing) {
        setToasts((t) => t.filter((_t) => _t.id !== removing));
      }
    }, [removing, setToasts]);

    useEffect(() => {
      if (autoClose && toasts.length) {
        const id = toasts[toasts.length - 1].id;
        setTimeout(() => setRemoving(id), autoCloseTime);
      }
    }, [toasts, autoClose, autoCloseTime]);

    const removeToast = (id) => {
      setToasts(toasts.filter((t) => t.id !== id));
    };

    useImperativeHandle(ref, () => ({
      addMessage(toast) {
        setToasts([...toasts, { ...toast, id: uuid() }]);
        console.log(toasts);
      },
    }));

    if (!loaded) return <></>;

    return ReactDOM.createPortal(
      <div className={"styles.toastContainer"}>
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              mode={t.mode}
              message={t.message}
              onClose={() => removeToast(t.id)}
            />
          ))}
        </AnimatePresence>
      </div>,
      document.getElementById(portalId)
    );
  }
);
