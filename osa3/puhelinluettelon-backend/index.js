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

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        res.json(persons)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
});

app.get("/info", (req, res, next) => {
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
    .catch(error => next(error))
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
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
    number: body.number,
  })

  person.save().then(result => {
    console.log(`added ${body.name} number ${body.number} to phonebook`);
  })
  .catch(error => {
    console.error(error.message)
    res.status(400).json({ error: error.message })
  })
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number} = req.body

  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

// Middleware
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

// Start listening port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
