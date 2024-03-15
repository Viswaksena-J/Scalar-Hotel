import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function RoomCard({ roomNumber, roomType, pricePerHour, imageUrl }) {
  return (
    <Card style={{ width: "20em", textAlign: "center" }}>
      <Card.Body>
        <Card.Img variant="top" src={imageUrl} className="img-fluid" />

        <Card.Title>{`Room ${roomNumber}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {" "}
          {`Price: ₹${pricePerHour}/hr`}
        </Card.Subtitle>
        <Card.Text></Card.Text>
        <Link
          to="/details"
          state={{ roomNumber, roomType, pricePerHour, imageUrl }}
        >
          <p
            style={{ width: "100%" }}
            className="underline mb-2 items-center justify-center"
          >
            View Details
          </p>
        </Link>
        <Link to="/add" state={{ roomNumber, roomType, pricePerHour }}>
          <Button
            style={{ width: "100%" }}
            variant="primary"
            className="bg-blue-500 mt"
          >
            Book Room
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default RoomCard;
