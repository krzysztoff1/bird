import { motion } from "framer-motion";

const Header = ({ text, children }) => {
  // const [isOpen, toggleIsOpen] = useState(true);
  // const { t } = useTranslation();
  // let location = useLocation();
  // const navContext = useContext(NavigationContext);

  // const renderHeader = () => {
  //   if (location.pathname.includes("compose"))
  //     return (
  //       <>
  //         {/* <BackButton text={navContext.text} />
  //         <h1 className="text-xl font-bold">New Post</h1>
  //         <button className="mx-4 rounded-full p-2 transition-all hover:bg-white/25 hover:backdrop-blur-md">
  //           <svg
  //             className="h-6 w-6"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
  //           </svg>
  //         </button> */}
  //       </>
  //     );

  //   if (location.pathname.includes("post"))
  //     return (
  //       <>
  //         <button
  //           onClick={() => window.history.go(-1)}
  //           className="mx-4 rounded-full p-2 transition-all hover:bg-white/25 hover:backdrop-blur-md"
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-6 w-6 text-slate-100"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M10 19l-7-7m0 0l7-7m-7 7h18"
  //             />
  //           </svg>
  //         </button>
  //         <h1 className="text-xl font-bold">Post</h1>
  //         <button className="mx-4 rounded-full p-2 transition-all hover:bg-white/25 hover:backdrop-blur-md">
  //           <svg
  //             className="h-6 w-6"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
  //           </svg>
  //         </button>
  //       </>
  //     );

  //   if (location.pathname.includes("activity"))
  //     return (
  //       <>
  //         <h1 className="text-wider text-xl font-bold ">{t("activity")}</h1>
  //         <span></span>
  //       </>
  //     );

  //   if (location.pathname.includes("profile"))
  //     return (
  //       <>
  //         <h1 className="text-wider text-xl font-bold ">{t("profile")}</h1>
  //         <button onClick={() => SignOut()}>{t("sign_out")}</button>
  //       </>
  //     );

  //   return (
  //     <>
  //       <button
  //         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  //         to={"/"}
  //       >
  //         <h1 className="text-wider text-xl font-bold">Bird</h1>
  //       </button>
  //       <span></span>
  //     </>
  //   );
  // };

  // const variants = {
  //   open: { y: 0 },
  //   closed: { y: "-100%" },
  // };

  // if (location.pathname.includes("compose")) return <div></div>;

  return (
    <motion.header
      layout
      className="sticky top-0 z-50 flex items-center justify-between bg-slate-900/50 py-2 px-4 font-bold tracking-wide text-white backdrop-blur-md"
    >
      {text}
      {children}
    </motion.header>
  );
};

export default Header;
