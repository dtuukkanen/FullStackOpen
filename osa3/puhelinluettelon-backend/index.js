require('dotenv').config()
const express = require("express");
const Person = require('./models/person')
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;

// Use static files from the "dist" directory
app.use(express.static("dist"));

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        res.json(persons)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: "failed to find persons"})
    })
});

app.get("/info", (req, res) => {
  const date = new Date();

  Person.find({})
    .then(persons => {
      if (persons) {
        res.send(
          `<p>Phonebook has info for ${persons.length} people</p>
          <p>${date}</p>`
        )
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: "failed to get info"})
    })
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    })
  }

  const person = new Person({
    name: body.name,
    phone_number: body.number,
  })

  person.save().then(result => {
    console.log(`added ${body.name} number ${body.number} to phonebook`);
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
