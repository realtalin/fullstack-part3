const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(cors())

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: 'person with this name already exists',
    })
  }

  const person = {
    id: String(Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1))),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find((person) => person.id === request.params.id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const person = persons.find((person) => person.id === request.params.id)

  if (!person) {
    return response.status(404).json({ error: `person does not exist` })
  }

  persons = persons.filter((person) => person.id != request.params.id)

  response.status(200).json(person)
})

app.get('/info', (request, response) => {
  response.send(
    `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `
  )
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
