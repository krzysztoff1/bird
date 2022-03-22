import { useState, useEffect } from "react";

const ToolTip = ({ children, text = "Tooltip" }) => {
  const [isOpen, toggleIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      toggleIsOpen(false);
    }, 5000);
  }, [isOpen]);

  const handleHover = () => {
    if (isOpen) return toggleIsOpen(false);
    setTimeout(() => {
      toggleIsOpen(true);
    }, 800);
  };

  return (
    <div
      onMouseEnter={() => handleHover()}
      onMouseLeave={() => toggleIsOpen(false)}
      className="relative"
    >
      {isOpen && (
        <span className="absolute -top-9 z-50 whitespace-nowrap rounded-md border border-slate-500/50 bg-slate-800 px-2 py-1 text-black dark:text-white">
          {text}
        </span>
      )}
      {children}
    </div>
  );
};

export default ToolTip;
