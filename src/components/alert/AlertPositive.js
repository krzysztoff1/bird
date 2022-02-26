import { useEffect, useState } from "react";

const AlertPositive = () => {
  const [alert, toggleAlert] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      toggleAlert(0);
    }, 1600);
  }, []);

  return (
    <>
      {alert ? (
        <div
          className="fixed top-16 z-[1000] mb-4 rounded-lg bg-blue-100 p-4 text-sm text-blue-700 dark:bg-blue-200 dark:text-blue-800"
          role="alert"
        >
          <span className="font-medium">Info alert!</span> Change a few things
          up and try submitting again.
        </div>
      ) : null}
    </>
  );
};

export default AlertPositive;
