import { nanoid } from 'nanoid';
import { useState } from 'react';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const changeName = e => {
    const name = e.currentTarget.name;
    if (name === 'name') setName(e.currentTarget.value);
    else if (name === 'number') setNumber(e.currentTarget.value);
  };
  const onSubmit = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    addContact(contact);
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={changeName}
          required
        />
      </label>

      <label htmlFor="number">
        Number
        <input
          type="tel"
          id="number"
          value={number}
          onChange={changeName}
          name="number"
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};
