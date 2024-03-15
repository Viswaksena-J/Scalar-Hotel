import React, { useState, useEffect } from "react";
import axios from "axios";
import RoomCard from "../components/Room";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  function sendUrl(type) {
    if (type === "A")
      return "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/201302141837083549-4157-1f644bd04c0111e9800b0242ac110002.jpg";
    else if (type === "B")
      return "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202311271722562285-08659eeeb67c11ee96960a58a9feac02.jpg?&output-quality=75&downsize=520:350&crop=520:350;2,0&output-format=jpg&downsize=821:550&crop=821:550";
    else
      return "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202306201803512244-3f00adb890f711eeaece0a58a9feac02.jpg?&output-quality=75&downsize=520:350&crop=520:350;2,0&output-format=jpg&downsize=821:550&crop=821:550";
  }
  
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/rooms");
      setRooms(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-1 mt-2">
        Available Rooms
      </h1>

      <Container className="container flex">
        {rooms.map((room) => (
          <Row className="item" key={room.id}>

            <RoomCard
              roomNumber={room.roomNumber}
              roomType={room.roomType}
              pricePerHour={room.pricePerHour}
              imageUrl={sendUrl(room.roomType)}
            />
            
          </Row>
        ))}
      </Container>
    </>
  );
}

export default RoomList;
