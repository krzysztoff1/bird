import { useState } from "react";
import { basicSearchUsers } from "services/firebase";
import PersonLink from "./PersonLink";

const Search = () => {
  const [text, setText] = useState();
  const [results, setResults] = useState([]);
  const [isOpen, toggleIsOpen] = useState();

  const handleSearch = async () => {
    if (!text) return;
    let res = await basicSearchUsers({ text });
    setResults(res);
    console.log(res);
    toggleIsOpen(true);
  };

  return (
    <section className="relative w-full">
      {isOpen && (
        <div className="min-2-[228px] absolute right-0 top-[3rem] z-50 w-full rounded-xl border border-neutral-300 bg-white py-2 shadow dark:bg-slate-900">
          <span className="mb-3 flex items-center gap-3 px-2">
            <button type="button" onClick={() => toggleIsOpen(false)}>
              <svg
                className="h-6 w-6 rounded-full p-1 transition hover:bg-neutral-200 dark:hover:bg-slate-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <label
              htmlFor="results"
              className="md:text-md text-xs font-medium text-black/75 dark:text-white/75"
            >
              User search results
            </label>
          </span>
          {results?.map((person) => (
            <PersonLink key={person.uid} person={person} />
          ))}
        </div>
      )}
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative mt-1 flex">
        <input
          onChange={(e) => setText(e.target.value)}
          type="search"
          id="table-search"
          className="block w-full rounded-full border border-gray-300 bg-gray-50/50 p-2.5 px-3 text-sm text-gray-900 backdrop-blur-md focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search for users"
        />
        <button onClick={() => handleSearch()} className="ml-2">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Search;
