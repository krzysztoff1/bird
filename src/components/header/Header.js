import { useParams } from "react-router";

const Header = () => {
  const { id } = useParams;
  if (id) return <div className="fixed w-full bg-slate-700">Post</div>;
  return <div className="fixed w-full bg-slate-700">Header</div>;
};

export default Header;
