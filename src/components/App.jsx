import { useState, useEffect } from 'react';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
const KEY = 'phonebook';

export const App = () => {
  const getContacts = () => {
    const data = localStorage.getItem(KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData;
    }
    return [];
  };
  const [contacts, setContacts] = useState(getContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);

  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const addContact = contact => {
    const normalizedName = contact.name.toLowerCase();
    const normalizedNames = contacts.map(contact => contact.name.toLowerCase());
    if (normalizedNames.includes(normalizedName))
      return alert(`${contact.name} is already in contacts.`);

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} filterChange={filterChange} />
      <ContactList
        filteredContacts={filterContacts()}
        onDelete={deleteContact}
      />
    </>
  );
};
