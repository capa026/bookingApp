import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer, Header, MailList, Navbar } from "../components";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonPrimary, Loading } from "../components/utilities";
import { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../context/searchContext";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const { data, loading, error, reFetch } = useFetch(`hotels/find/${id}`);

  const MILISECONS_PER_DAY = 1000 * 60 * 60 * 24;

  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONS_PER_DAY);
    return diffDays;
  };

  const { dates, option } = useContext(SearchContext);

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    if (direction === "next")
      slideNumber === hotelImages.length - 1
        ? setSlideNumber(0)
        : setSlideNumber(slideNumber + 1);

    if (direction === "prev")
      slideNumber === 0
        ? setSlideNumber(hotelImages.length - 1)
        : setSlideNumber(slideNumber - 1);
  };
  const handle = () => {
    console.log(1);
  };
  return (
    <div>
      {open && (
        <div className="slider">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="close"
            onClick={() => setOpen(false)}
          />
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="arrow"
            onClick={() => handleMove("prev")}
          />
          <div className="sliderWrapper">
            <img
              src={data.photos[slideNumber]}
              alt="Hotel"
              className="sliderImage"
            />
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="arrow"
            onClick={() => handleMove("next")}
          />
        </div>
      )}
      <div className="wrapper">
        <Navbar />
        <Header type="list" />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="homeContainer">
          <div className="hotelWrapper">
            <ButtonPrimary
              style={{
                position: "absolute",
                top: "10px",
                right: "0",
                padding: "1rem",
              }}
            >
              Reserve or Book Now!
            </ButtonPrimary>

            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this proprty and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((image, i) => (
                <div className="hotelImageWrapper" key={i}>
                  <img onClick={() => handleOpen(i)} src={image} alt="hotel" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hoteTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, excellent location score
                  of 9.8!
                </span>
                <h2>
                  <b>${data.cheapestPrice * days * option.room}</b> ({days}{" "}
                  nights)
                </h2>
                <ButtonPrimary style={{ padding: "1rem" }} click={handle}>
                  Reserve or Book Now!
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      )}

      <MailList />
      <Footer />
    </div>
  );
};
export default Hotel;
