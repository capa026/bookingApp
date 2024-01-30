import useFetch from "../hooks/useFetch";
import { Loading } from "./utilities";

const PropertyList = () => {
  const { data, loading, error, reFetch } = useFetch("hotels/countByType");
  const images = [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/35/17/06/exterior.jpg?w=1200&h=-1&s=1",
    "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU",
    "https://media-cdn.tripadvisor.com/media/photo-s/0e/a7/fc/e0/sunsol-isla-caribe.jpg",
    "https://media.inmobalia.com/imgV1/B98Le8~d7M9k3DegigWkzHXQlgzMFGqGJJp6ZRUcpX033lqadFBp2i4GGW4X3JDm~11J_coE7XMgSyFWgioo4vCKf4wUKnMQVlcstB6i31toFjuPwN30kAN34lG1XeUpgi83pzbiULsleiQ6c7WcO5lkWDXIbj121e3Nt95s3EhFvYRspbhoihn78NH3cr6SwOE~MnNcxL7gnwJLt0dhwOqzylzDkEyZYOM5UshRVG0jHJSKVXEdEClwWYf2n~P9x6nSArHXnKJ7ByFhFhHQcE4kujChVjmwInI4I9yPQRfla2UOK8GviTckEFJx6SZbTn4t_kX_W~0v9IW6MJxL9CNSSziIup0RmBPtB40NwJilif4-.jpg",
    "https://cabinsathickoryridge.com/media/The-Lodge-Spring.jpg",
  ];
  return (
    <div className="propertyList">
      {loading ? (
        <Loading />
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="propertyListItem" key={i}>
                <img src={img} alt={data[i]?.type} />
                <div className="propertyListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
export default PropertyList;
