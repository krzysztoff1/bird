import { Link } from "react-router-dom";
import { ModalPortal } from "../modals/ModalPortal";
import { useRef } from "react";
import PersonLink from "./PersonLink";
import Search from "./Search";

const SideBar = () => {
  //TODO get topics from firebase
  //temporary solution
  const people = [
    { id: 1, title: "Krzysztof", uid: "sGdpDpyhEfb25VaLXrmvAFqcFfs1" },
    { id: 2, title: "TestAccountThree", uid: "d9PCpTwMYqNKNJEXDF4IMPZlnQf2" },
  ];

  const topics = [
    { title: "fjaisoifsaniofafs", no: 2414 },
    { title: "gds", no: 634 },
    { title: "dgsg", no: 43 },
    { title: "gds", no: 2414 },
    { title: "fjaisoifsaniofafs", no: 634 },
    { title: "gsd", no: 63 },
    { title: "fjaisoifsaniofafs", no: 463 },
  ];

  //TODO make each section a component
  return (
    <>
      <aside className="hidden p-4 dark:border-slate-800/50 lg:block">
        <div className="sticky top-0 left-0 z-50 mb-2 h-screen overflow-hidden overflow-y-scroll py-2">
          <Search />
          <section className="my-4 rounded-xl bg-neutral-100 pt-3 dark:bg-slate-800/50">
            <header className="mb-3 flex justify-between px-3">
              <h3 className="text-xl font-bold text-black dark:text-white">
                Recommended Profiles
              </h3>
            </header>
            <ul>
              {people.map((person, i) => (
                <PersonLink key={person.id} person={person} />
              ))}
            </ul>
            <button className="w-full overflow-clip p-3 text-left text-blue-400 transition hover:bg-neutral-200 dark:hover:bg-slate-700/50">
              Show more
            </button>
          </section>
          <section className="my-4 overflow-hidden rounded-xl bg-neutral-100 pt-3 dark:bg-slate-800/50">
            <header className="mb-3 flex justify-between px-3">
              <h3 className="text-xl font-bold text-black dark:text-white">
                Najpopularniejsze w polsce
              </h3>
              <button>
                <svg
                  className="h-6 w-6 text-black/50 dark:text-white/50"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </header>
            <ul>
              {topics.map((topic, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between py-2 px-3 transition hover:bg-neutral-200 dark:hover:bg-slate-700/50"
                >
                  <div>
                    <p className="text-xs text-black/50 dark:text-white/50">
                      Najpopularniejsze w polsce
                    </p>
                    <b className="text-black dark:text-white ">{topic.title}</b>
                    <p className="text-xs text-black/50 dark:text-white/50">
                      Tweety: {topic.no}
                    </p>
                  </div>
                  <button>
                    <svg
                      className="h-4 w-4 text-black/50 dark:text-white/50"
                      fill="currentColor"
                      viewBox="0 0 20 5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <button className="w-full overflow-clip p-3 text-left text-blue-400 hover:bg-neutral-200 dark:hover:bg-slate-700/50">
              Show more
            </button>
          </section>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
