import { useTranslation } from "react-i18next";
import SignInGoogle from "../components/forms/auth/SignInGoogle";
import SignInEmail from "../components/forms/auth/SignInEmail";

const SignIn = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-slate-200 text-slate-100 dark:bg-slate-900">
      <h1 className="mb-4 px-3 text-3xl font-bold ">{t("hello")}</h1>
      <SignInEmail />
      <SignInGoogle />
    </div>
  );
};

export default SignIn;
