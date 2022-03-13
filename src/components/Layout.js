import Routes from "../constans/routes";
const Layout = (props) => {
  return (
    <div>
      <p>I'm the daddy</p>
      <div style={{ display: "flex" }}>
        <p>sidebar</p>
        <Routes />
      </div>
    </div>
  );
};

export default Layout;
