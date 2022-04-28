import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

const Login = ({ onIdSubmit }) => {
  // grabs the submitted id and keeps it even between renders
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  }

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <Container
      className="d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group className="mb-2">
          <Form.Label>Enter your ID</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button className="me-2" type="submit">
          Login
        </Button>
        <Button onClick={createNewId} variant="secondary">
          Create New ID
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
