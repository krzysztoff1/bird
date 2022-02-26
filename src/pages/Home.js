import Feed from "../components/feed/Feed";
import FloatingButton from "../components/floatingButton/FloatingButton";

const Home = () => {
  return (
    <section className="min-h-screen bg-slate-100 py-10 dark:bg-slate-900">
      <FloatingButton />
      <Feed />
    </section>
  );
};

export default Home;
