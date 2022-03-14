import React from "react";

const AppLogo = () => {
  return (
    <section className="flex h-[100vh] w-[100vw] items-center justify-center bg-slate-900">
      <img
        className="h-12 w-12 animate-spin"
        src="./assets/svg/logo.svg"
        alt="logo"
      />
    </section>
  );
};
export default AppLogo;
