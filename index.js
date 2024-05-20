require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("dist"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/info", (request, response) => {
  Person.find({}).then((persons) => {
    const currentTime = new Date();
    response.send(
      `<p>Phonebook has info for ${persons.length} people </p>
        <p>${currentTime}</p>`
    );
  });
});

const generateId = () => {
  return Date.now() + Math.floor(Math.random() * 10000);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "content missing" });
  }
  Person.findOne({ name: body.name.toLowerCase() })
    .then((existingPerson) => {
      if (existingPerson) {
        return response.status(409).json({ error: "name must be unique" });
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      });

      person
        .save()
        .then((savedPerson) => {
          response.json(savedPerson);
        })
        .catch((error) => {
          response.status(500).json({ error: "saving failed" });
        });
    })
    .catch((error) => {
      response.status(500).json({ error: "finding duplicate failed" });
    });
});
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error)
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})
// Error handling for unknown routes
app.use((request, response) => {
  response.status(404).json({ error: "Unknown endpoint" });
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    next(error)
}
app.use(errorHandler)
  

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
