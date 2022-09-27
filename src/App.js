import contacts from "./contacts.json";
import './App.css';

import {useState} from 'react';

function App() {

  let [ourContacts, setContacts] = useState(contacts.slice(0,6));

  const randomContact = () => {
    let randContact = contacts[Math.floor(Math.random() * (contacts.length))];

    let newContacts;

    if (!(ourContacts.find(ele => ele.id === randContact.id))) {
      newContacts = ourContacts.map(x => x);
      newContacts.push(randContact);

      setContacts(newContacts);
      return;
    }
    else {
      randomContact();
      return;
    }
  };

  const sortName = () => {
    let sortedContacts = ourContacts.map(x => x);
    sortedContacts.sort((a, b) => {
      const nameA = a.name[0].toUpperCase();
      const nameB = b.name[0].toUpperCase();

      if (nameA > nameB) return 1;
      else if (nameA < nameB) return -1;
      else return 0;
    });

    setContacts(sortedContacts);
    return;
  };

  const sortPop = () => {
    let sortedContacts = ourContacts.map(x => x);
    sortedContacts.sort((a, b) => {
      const popA = a.popularity;
      const popB = b.popularity;

      if (popA > popB) return -1;
      else if (popA < popB) return 1;
      else return 0;
    });

    setContacts(sortedContacts);
    return;
  };

  const removeFromContacts = (contactId) => {
    let filteredContacts = ourContacts.filter(contact => contact.id !== contactId);

    setContacts(filteredContacts);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>

      <button onClick={randomContact}>add random contact</button>
      <button onClick={sortName}>sort by name</button>
      <button onClick={sortPop}>sort by popularity</button>

      <table className="iterationOne">
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
        </tr>
        {ourContacts.map((person, index) => (
          <tr key={person.id}>
            <td><img src={person.pictureUrl} alt={person.name}/></td>
            <td>{person.name}</td>
            <td>{person.popularity}</td>
            <td>{person.wonOscar && "y"}</td>
            <td>{person.wonEmmy && "y"}</td>
            <td><button onClick={() => removeFromContacts(person.id)}>delete</button></td>
          </tr>
        ))}
      </table>

    </div>
  );
}

export default App;
