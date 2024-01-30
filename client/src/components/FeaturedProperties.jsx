import useFetch from "../hooks/useFetch";
import { ButtonPrimary, Loading } from "./utilities";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("hotels?featured=true&limit=4");
  // https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  return (
    <div className="featuredProperties">
      {loading ? (
        <Loading />
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <ButtonPrimary
                    style={{
                      borderRadius: "4px",
                      padding: "0.3rem",
                      marginRight: "10px",
                      fontWeight: "bold",
                      boxShadow: "none",
                    }}
                  >
                    {item.rating}
                  </ButtonPrimary>
                  <span>Excelent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default FeaturedProperties;
