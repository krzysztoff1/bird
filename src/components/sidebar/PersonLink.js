import { Link } from "react-router-dom";
const PersonLink = ({ person }) => {
  return (
    <Link
      to={`/profile/${person.uid}`}
      className="flex items-start justify-between overflow-hidden py-2 px-3 transition hover:bg-neutral-200 dark:hover:bg-slate-700/50"
    >
      <div className="flex items-center">
        <img
          className="h-12 w-12 rounded-full"
          src="https://picsum.photos/50"
          alt=" "
        />
        <div className="ml-3">
          <p className="text-black dark:text-white">
            {person?.title}
            {person?.name}
          </p>
          <p className="text-black/50 dark:text-white/50">
            @{person.title?.toLowerCase()}@{person.name?.toLowerCase()}
          </p>
        </div>
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
    </Link>
  );
};

export default PersonLink;
