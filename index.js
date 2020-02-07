const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())

morgan.token('tiedot', function (req, res) {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    }
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :tiedot'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-2343456",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.send('<p>Name: ' + person.name + '</p><p>Number: ' + person.number + '</p>')
    } else {
        res.status(404).end()
    }
  })

app.get('/info', (req, res) => {
    const apu = persons.length
    res.send('<p>Phonebook has info for ' + apu + ' people</p>' + new Date())
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (request, response) => {
    
    console.log(request.body)
  
    if (request.body.name === undefined || request.body.number === undefined) {
      return response.status(400).json({ 
        error: 'content missing' 
      })    
    }

    if (persons.filter(person => person.name === request.body.name).length > 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
  
    const person = {
      name: request.body.name,
      number: request.body.number,
      id: Math.floor(Math.random() * 9999) + 1,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(note => note.id !== id)
  
    res.status(204).end()
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})