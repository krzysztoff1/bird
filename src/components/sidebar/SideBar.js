import React from "react";

const SideBar = () => {
  const topics = [
    { title: "fjaisoifsaniofafs", no: 2414 },
    { title: "gds", no: 634 },
    { title: "dgsg", no: 43 },
    { title: "gds", no: 2414 },
    { title: "fjaisoifsaniofafs", no: 634 },
    { title: "gsd", no: 63 },
    { title: "fjaisoifsaniofafs", no: 463 },
  ];

  return (
    <aside className="min-h-screen border-l-[1px] border-slate-800 bg-slate-900 p-4">
      <div className="sticky top-0 left-0 z-50 mb-2">
        <section>
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mt-1">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search for items"
            />
          </div>
        </section>
        <section className="my-4 rounded-md bg-slate-800 p-3">
          <header className="mb-3 flex justify-between">
            <h3 className="text-xl font-bold text-white">
              Najpopularnijsze w polsce
            </h3>
            <button>
              <svg
                className="h-6 w-6"
                fill="white"
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
            {topics.map((topic) => (
              <li className="my-2 flex items-start justify-between">
                <div>
                  <p className="text-xs text-white/50">
                    Najpopularniejsze w poslce
                  </p>
                  <b className="text-white ">{topic.title}</b>
                  <p className="text-xs text-white/50">Tweety: {topic.no}</p>
                </div>
                <button>
                  <svg
                    className="h-4 w-4 opacity-50"
                    fill="white"
                    viewBox="0 0 20 5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
};

export default SideBar;
