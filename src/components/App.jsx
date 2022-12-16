import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Title } from './Title/Title';
import { Box } from './App.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const saveContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(saveContacts);

    if (saveContacts !== null) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const currentStateContacts = this.state.contacts;

    if (prevState.contacts !== currentStateContacts) {
      localStorage.setItem('contacts', JSON.stringify(currentStateContacts));
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addNewContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const checkName = contacts.some(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );

    checkName
      ? alert(`${contact.name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, contact],
        }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filterName = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filterContacts = this.filterName();
    return (
      <Box>
        <Title title="Phonebook" />
        <ContactForm onSubmit={this.addNewContact} />

        <Title title="Contacts" />
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={this.deleteContact}
        />
      </Box>
    );
  }
}

export default App;
