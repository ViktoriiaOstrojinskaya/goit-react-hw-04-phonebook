import { nanoid } from 'nanoid';
import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Title } from './Title/Title';
import { Box } from './App.styled';
import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const items = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useLocalStorage('contacts', items);
  const [filter, setFilter] = useState('');

  const addNewContact = (name, number) => {
    const normalizedName = name.toLowerCase();
    const checkName = contacts.some(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    return checkName
      ? alert(`${name} is already in contacts`)
      : setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const filterNames = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Box>
      <Title title="Phonebook" />
      <ContactForm onSubmit={addNewContact} />
      <Title title="Contacts" />
      <Filter
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />
      <ContactList contacts={filterNames()} onDeleteContact={deleteContact} />
    </Box>
  );
}
