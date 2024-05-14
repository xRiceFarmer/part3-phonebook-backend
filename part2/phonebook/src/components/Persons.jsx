const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} - {person.number}
          <button onClick={() => {
            const confirmed = window.confirm(`Delete ${person.name}?`)
            if (confirmed){
            deletePerson(person.id)}}}>Delete</button>
        </div>
      ))}
    </ul>
  );
};

export default Persons;
