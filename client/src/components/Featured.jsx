import useFetch from "../hooks/useFetch";
import { Loading } from "./utilities";

const Featured = () => {
  const { data, loading, error, reFetch } = useFetch(
    "hotels/countByCity?cities=berlin,madrid,london"
  );
  return (
    <div className="featured">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Museumsinsel_Berlin_Juli_2021_1_%28cropped%29.jpg/1200px-Museumsinsel_Berlin_Juli_2021_1_%28cropped%29.jpg"
              alt="Berlin"
            />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://blog.goway.com/globetrotting/wp-content/uploads/2018/05/Panoramic-view-of-Madrid-Spain-_1037923567.jpg"
              alt="Madrid"
            />
            <div className="featuredTitles">
              <h1>Madrid</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://assets.vogue.in/photos/5ce43d58f55c27a7f4a28dce/master/pass/London-City-Travel-Guide-Vogue-India.jpg"
              alt="London"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Featured;
