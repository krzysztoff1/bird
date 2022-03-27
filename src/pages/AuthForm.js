import SignInGoogle from "../components/forms/auth/SignInGoogle";
import SignIn from "../components/forms/auth/SignIn";
import LogIn from "../components/forms/auth/LogIn";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AuthForm = () => {
  const { t } = useTranslation();

  const [signIn, toggleSignIn] = useState(false);
  const [logIn, toggleLogIn] = useState(false);

  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-white text-slate-100 dark:bg-slate-900">
      <h1 className="mb-4 px-3 text-3xl font-bold text-black dark:text-white">
        {t("Hello,_welcome_to_Bird")}
      </h1>
      {signIn && <SignIn toggle={toggleSignIn} />}
      {logIn && <LogIn toggle={toggleLogIn} />}
      {!signIn && !logIn && (
        <>
          <button
            onClick={() => toggleSignIn(true)}
            type="submit"
            className="mx-auto my-4 inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            Sign up
          </button>
          <button
            onClick={() => toggleLogIn(true)}
            type="submit"
            className="mx-auto my-4 inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            Log In
          </button>
          <SignInGoogle />
        </>
      )}
    </div>
  );
};

export default AuthForm;
