import {
  Featured,
  FeaturedProperties,
  Footer,
  Header,
  MailList,
  Navbar,
  PropertyList,
} from "../components";
const Home = () => {
  return (
    <div>
      <div className="wrapper">
        <Navbar />
        <Header />
      </div>
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes Guests love</h1>
        <FeaturedProperties />
      </div>
      <MailList />
      <Footer />
    </div>
  );
};
export default Home;
