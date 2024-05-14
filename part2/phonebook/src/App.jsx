import { useState, useEffect } from "react";
import axios from "axios";
import phonebook from "./services/phonebook";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phonebook.getAll().then((initialData) => {
      setPersons(initialData);
      console.log("retrieved data phonebook");
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const isDuplicate = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (isDuplicate) {
      const confirmed = window.confirm(
        newName +
          " is already added to the phonebook, replace the old number with a new one?"
      );
      if (!confirmed) {
        return;
      }
      const existingPerson = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );
      const changedPerson = { ...existingPerson, number: newNumber };
      console.log(existingPerson.id)
      phonebook
        .update(existingPerson.id, changedPerson)
        .then(() => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : changedPerson
            )
          );
          //console.log('updated')
        })
        .catch((error) => {
          const messageObject = {
            text: `Information of ${existingPerson.name} has been removed from server`,
            type: "error",
          };
          console.log("fail");
          setMessage(messageObject);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      phonebook.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        console.log("added");
        const messageObject = {
          text: `Information of ${returnedPerson.name} has been added to server`,
          type: "success",
        };
        setMessage(messageObject);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };
  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredPersons = searchQuery
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : persons;

  const deletePerson = (id) => {
    //const person = persons.find(n => n.id === id)
    phonebook
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log("error deleting person");
      });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter
        key={searchQuery.id}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <h2>Add new person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
