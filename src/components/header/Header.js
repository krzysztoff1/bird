const Header = ({ text, children }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-slate-900/50 py-2 px-4 font-bold tracking-wide text-white backdrop-blur-md">
      {text}
      {children}
    </header>
  );
};

export default Header;
