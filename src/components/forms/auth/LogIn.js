const LogIn = () => {
  return (
    <div className="w-md my-4 w-full max-w-md px-4">
      <header className="flex w-full justify-between">
        <button
          onClick={() => toggleLogIn(0)}
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
          // signUpWithEmail({ email, password, name });
        }}
        className="mb-6 px-2"
      >
        <section className="my-4">
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
              onChange={(e) => setEmail(e.target.value)}
              className={`
                  block w-full rounded-lg border-2   bg-slate-800 p-2.5 pl-10 text-sm  text-white dark:placeholder-gray-400 `}
              placeholder="name@email.com"
            />
          </div>
        </section>
        <section className="my-4">
          <label htmlFor="password" className="mb-2 flex flex-col gap-2">
            Password
          </label>
          <input
            required
            autoComplete="off"
            // onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="text-md input[type='password']
 block w-full rounded-lg border-2 border-slate-800 bg-slate-800 p-2.5 text-slate-100 placeholder-slate-300 outline-none"
            placeholder="Password"
          />
        </section>
        <section className="my-2 flex items-center justify-center">
          <button
            onClick={() => toggleSignIn(1)}
            type="submit"
            className="mx-auto mt-2 inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            Sign up
          </button>
        </section>
      </form>
    </div>
  );
};

export default LogIn;
