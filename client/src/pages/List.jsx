import { useLocation } from "react-router-dom";
import { Footer, Header, Navbar, SearchItem } from "../components";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ButtonPrimary, Loading } from "../components/utilities";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/searchContext";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `hotels${destination ? "?city=" + destination + "&" : "?"}min=${
      min || 0
    }&max=${max || 9999}`
  );
  const { city } = useContext(SearchContext);

  const handleClick = () => {
    reFetch();
  };
  return (
    <div className="listPage">
      <div className="wrapper">
        <Navbar />
        <Header type="list" />
      </div>
      <div className="container">
        <div className="listSearch">
          <h1>Search</h1>
          <div className="lsItem">
            <label>Destination</label>
            <input
              type="text"
              placeholder={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="lsItem">
            <label>Check-in Date</label>
            <span onClick={() => setOpenDate(!openDate)}>
              {`${format(date[0].startDate, "dd/MM/yyy")} to ${format(
                date[0].endDate,
                "dd/MM/yyy"
              )}`}
            </span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="lsItem">
            <label>Options</label>
            <div style={{ padding: "10px" }}>
              <div className="lsOptionsItem">
                <span className="lsOptionText">
                  Min Price <small>per night</small>
                </span>
                <input type="number" onChange={(e) => setMin(e.target.value)} />
              </div>
              <div className="lsOptionsItem">
                <span className="lsOptionText">
                  Max Price <small>per night</small>
                </span>
                <input type="number" onChange={(e) => setMax(e.target.value)} />
              </div>
              <div className="lsOptionsItem">
                <span className="lsOptionText">Adult</span>
                <input type="number" min={1} placeholder={options.adult} />
              </div>
              <div className="lsOptionsItem">
                <span className="lsOptionText">Children</span>
                <input type="number" min={0} placeholder={options.children} />
              </div>
              <div className="lsOptionsItem">
                <span className="lsOptionText">Room</span>
                <input type="number" min={1} placeholder={options.room} />
              </div>
            </div>
          </div>
          <ButtonPrimary
            style={{ padding: ".5rem", width: "100%" }}
            click={handleClick}
          >
            Search
          </ButtonPrimary>
        </div>
        <div className="listResult">
          {loading ? (
            <Loading />
          ) : (
            <>
              {data.map((item) => (
                <SearchItem key={item._id} item={item} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default List;
