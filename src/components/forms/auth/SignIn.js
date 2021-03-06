import { useState, useEffect } from "react";
import {
  strengthColor,
  hasMixed,
  validateEmail,
  hasNumber,
  hasSpecial,
} from "../../../services/formValidation";
import { signUpWithEmail, checkUserName } from "../../../services/firebase";
import { useTranslation } from "react-i18next";

const SignIn = ({ toggle }) => {
  const { t } = useTranslation();

  const [signIn, toggleSignIn] = useState();

  const [name, setName] = useState("");
  const [nameIsAvailable, setNameIsAvailable] = useState();

  const [password, setPassword] = useState("");
  const [label, setPasswordLabel] = useState(0);
  const [number, setHasNumber] = useState(0);
  const [mixed, setHasMixed] = useState(0);
  const [special, setHasSpecial] = useState(0);

  const [email, setEmail] = useState();
  const [emailIsCorrect, setEmailIsCorrect] = useState();

  const [formReady, toggleFormReady] = useState(false);

  useEffect(() => {
    if (!password) return;
    setPasswordLabel(strengthColor(password.length));
    setHasNumber(hasNumber(password));
    setHasMixed(hasMixed(password));
    setHasSpecial(hasSpecial(password));
  }, [password]);

  useEffect(() => {
    if (!email) return;
    setEmailIsCorrect(validateEmail(email));
  }, [email]);

  useEffect(() => {
    if (emailIsCorrect && password.length > 3) toggleFormReady(true);
  }, [email, name, nameIsAvailable, emailIsCorrect, password]);

  const handleNameChange = async (e) => {
    setName(e.target.value);
    const res = await checkUserName(name.replace(/\s/g, "").toLowerCase());
    console.log(res);
    setNameIsAvailable(res);
  };

  return (
    <div className="w-md my-4 w-full max-w-md px-4">
      <header className="flex w-full justify-between">
        <button
          onClick={() => toggle(0)}
          className="mb-2 rounded-full p-2 backdrop-blur-md transition-all hover:bg-white/25"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUpWithEmail({ email, password, name });
        }}
        className="mb-6 px-2"
      >
        <section className="my-2">
          <label
            htmlFor="email"
            className="font-mediu mb-2 block font-medium text-white"
          >
            Name
          </label>
          <input
            onChange={(e) => handleNameChange(e)}
            type="name"
            style={{
              borderColor: name?.length > 3 && !nameIsAvailable && "#22c55e",
            }}
            className="text-md block w-full rounded-lg border-2 border-slate-800 bg-slate-800 p-2.5 text-slate-100 placeholder-slate-300 outline-none"
            placeholder="John Doe"
          />
          <label htmlFor="email" className="my-1 mb-2 block text-white/75 ">
            {name?.length < 3 ? (
              <span>Username must contain more than 3 characters</span>
            ) : !nameIsAvailable ? (
              <span>Correct username</span>
            ) : (
              <span>Username is already taken</span>
            )}
          </label>
        </section>
        <section className="my-2">
          <label
            htmlFor="email-adress-icon"
            className="mb-2 block font-medium text-white"
          >
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              required
              type="text"
              style={{ borderColor: emailIsCorrect && "#22c55e" }}
              onChange={(e) => setEmail(e.target.value)}
              className={`
                  border=slate-800 block w-full rounded-lg border-2 bg-slate-800 p-2.5 pl-10 text-sm  text-white dark:placeholder-gray-400 `}
              placeholder="name@email.com"
            />
          </div>
        </section>
        <section className="my-2">
          <label htmlFor="password" className="mb-2 flex flex-col gap-2">
            Password
            {/* //! form validation not in use  */}
            {/* <p
                  className={`${number ? "text-green-400" : "text-slate-100"}`}
                >
                  {number ? <Check /> : <Crossed />} Numbers
                </p>
                <p
                  className={`${number ? "text-green-400" : "text-slate-100"}`}
                >
                  {mixed ? <Check /> : <Crossed />} Mixed characters
                </p>
                <p
                  className={`${number ? "text-green-400" : "text-slate-100"}`}
                >
                  {special ? <Check /> : <Crossed />} Numbers
                </p> */}
          </label>
          <input
            required
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{ borderColor: label?.color }}
            className="text-md input[type='password']
 block w-full rounded-lg border-2 border-slate-800 bg-slate-800 p-2.5 text-slate-100 placeholder-slate-300 outline-none"
            placeholder="Strong password"
          />
          <label htmlFor="password">
            <p
              style={{ color: label?.color }}
              className={`${number ? "text-green-400" : "text-slate-100"} mt-2`}
            >
              {label?.label}
            </p>
          </label>
        </section>
        <section className="my-2 flex items-center justify-center">
          <button
            // disabled={formReady}
            onClick={() => toggleSignIn(1)}
            type="submit"
            className="rounded-full border-2 border-slate-800 px-5 py-3 font-bold disabled:bg-slate-800"
          >
            Sign up
          </button>
        </section>
      </form>
    </div>
  );
};

export default SignIn;
