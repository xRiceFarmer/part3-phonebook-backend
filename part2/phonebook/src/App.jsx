import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const isDuplicate = persons.some((person) => person.name === newName);

    if (isDuplicate) {
      alert(newName + " is already added to the phonebook");
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    console.log("button clicked", event.target);
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (event) => {
    console.log(event.target.value);
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
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        key={searchQuery.id}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <h2>Add new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons key={filteredPersons.id} filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
