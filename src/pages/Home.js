import Feed from "../components/feed/Feed";
import FloatingButton from "../components/floatingButton/FloatingButton";

const Home = () => {
  return (
    <section className="bg-slate-800 py-10">
      <FloatingButton />
      <Feed />
    </section>
  );
};

export default Home;
