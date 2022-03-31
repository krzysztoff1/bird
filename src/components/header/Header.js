import Search from "../sidebar/Search";

const Header = ({ text, children, scrollToTop }) => {
  const handleScroll = () => {
    if (!scrollToTop) return;
    window.scrollTo(0, 0);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white/30 py-2 px-4 text-lg font-bold tracking-wide text-black backdrop-blur-md dark:bg-slate-900/50 dark:text-white">
      {text && <h4>{text}</h4>}
      {children}
    </header>
  );
};

export default Header;
