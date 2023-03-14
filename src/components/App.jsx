import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { Phonebook, Contacts } from './App.styled';
import { ContactList } from './Contact-List/Contact-list';
const CONTACTS = JSON.parse(window.localStorage.getItem('contacts')) ?? [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(CONTACTS);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };

    contacts.find(contact => contact.name === newContact.name)
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts([...contacts, newContact]);
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const normFilter = filter.toLocaleLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normFilter)
  );

  return (
    <Phonebook>
      <h2>Phonebook</h2>
      <Contacts>
        <Form onAddContact={addContact} />
        <ContactList
          filter={filter}
          onFilter={changeFilter}
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Contacts>
    </Phonebook>
  );
};
