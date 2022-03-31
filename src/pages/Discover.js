import PostsList from "components/feed/PostsList";
import Header from "components/header/Header";
import Search from "components/sidebar/Search";
import { useTranslation } from "react-i18next";

const Discover = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen">
      <Header text={t("discover")} />
      <div className="overflow-y-auto">
        <div className="mb-4 px-2">
          <Search />
        </div>
      </div>
    </section>
  );
};

export default Discover;
