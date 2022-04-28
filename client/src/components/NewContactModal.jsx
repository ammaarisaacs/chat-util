import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../store/ContactsProvider";

const NewContactModal = ({ closeModal }) => {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };

  return (
    <>
      <Modal.Header style={{ backgroundColor: "#E4D1B9" }}>
        Create Contact
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button className="mt-3" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContactModal;
