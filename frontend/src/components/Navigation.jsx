import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function Navigation() {
  return (
    <Navbar variant={"dark"} bg="dark" expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand>Scaler Hotels</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="justify-content-end" id="navbarScroll">
          <Stack direction="horizontal" gap={3}>
            <Nav
              className="mr-auto my-2 my-lg-0 me-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                as={Link}
                to="/"
                className="active:text-white font-bold"
              >
                New Booking
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/view"
                className="active:text-white font-bold"
              >
                View Booking
              </Nav.Link>
            </Nav>
          </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
