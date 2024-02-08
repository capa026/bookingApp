import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../hooks/useFetch";
import { useContext, useState } from "react";
import { ButtonPrimary, Loading } from "./utilities";
import { SearchContext } from "../context/searchContext";
import axios from "axios";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRoom, setSelectedRoom] = useState([]);
  const { data, loading, error } = useFetch(`hotels/room/${hotelId}`);

  const handleSelect = (e) => {
    const selected = e.target.checked;
    const value = e.target.value;
    setSelectedRoom(
      selected
        ? [...selectedRoom, value]
        : selectedRoom.filter((item) => item !== value)
    );
  };
  const { dates } = useContext(SearchContext);

  const getdatesRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  };

  const allDates = getdatesRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRoom.map((roomId) => {
          const res = axios.put("");
        })
      );
    } catch (error) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {loading ? (
          <Loading />
        ) : (
          data.map((item) => (
            <div className="rItem">
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="rRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        <ButtonPrimary
          style={{ padding: "1rem", width: "100%" }}
          click={handleClick}
        >
          Reserve Now!
        </ButtonPrimary>
      </div>
    </div>
  );
};
export default Reserve;
