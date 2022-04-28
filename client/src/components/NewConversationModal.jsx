import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../store/ContactsProvider";
import { useConversations } from "../store/ConversationsProvider";

const NewConversationModal = ({ closeModal }) => {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  };

  const handleCheckboxChange = (contactId) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.id}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button className="mt-3" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
