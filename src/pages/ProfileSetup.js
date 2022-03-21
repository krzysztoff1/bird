import ProfileFlowEnd from "../components/flow/ProfileFlowEnd";
import SetProfilePicture from "../components/forms/profile/SetProfilePicture";
import SetDescription from "../components/forms/profile/SetDescription";
import { ProfileFlowContext } from "../context/profileFlow-context";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";

const ProfileSetup = () => {
  const { state, dispatch, prev, next } = useContext(ProfileFlowContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "visible");
  }, []);

  const renderComponent = () => {
    switch (state.status) {
      case 0:
        return <SetProfilePicture />;
      case 1:
        return <SetDescription />;
      case 2:
        return <ProfileFlowEnd />;
      default:
        return <p>Not Found</p>;
    }
  };

  return (
    <section className="fixed left-0 right-0 bottom-0 top-0 z-[5000] flex items-center justify-center bg-slate-400/30 backdrop-blur-sm">
      <main className="flex h-screen w-screen flex-col justify-between rounded-lg border border-slate-200/30 bg-slate-900 px-4 py-4 text-white md:m-4 md:max-h-[750px] md:max-w-xl">
        <header>
          <div className="h-1.5 w-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: state.data.progress + "%" }}
              transition={{ type: "spring", damping: 30 }}
              className="h-1.5 overflow-hidden rounded-full bg-emerald-400 transition"
              style={{ width: state.data.progress + "%" }}
            />
          </div>
          <div className="mt-4 flex justify-between">
            <svg
              onClick={() => window.history.go(-1)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 rounded-full p-1 transition hover:bg-slate-200/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex gap-1">
              {state.status !== 0 && state.status <= 4 && (
                <button onClick={prev}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 rounded-full p-1 transition hover:bg-slate-200/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
              {state.status !== 4 && state.status <= 1 && (
                <button onClick={next}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 rounded-full p-1 transition hover:bg-slate-200/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </header>
        <article className="h-full">{renderComponent()}</article>
        <footer className="flex w-full justify-center px-3 pb-8">
          {state.status < 2 && (
            <button
              onClick={() =>
                dispatch({
                  type: state.status + 1,
                  payload: { ready: false, progress: state.data.progress + 25 },
                })
              }
              className="mx-auto hover:underline"
            >
              {state.data.ready ? "Next step" : "Skip for now"}
            </button>
          )}
        </footer>
      </main>
    </section>
  );
};

export default ProfileSetup;
