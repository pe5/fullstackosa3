const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
const Person = mongoose.model('Person', personSchema)

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

if ( process.argv.length<4 ) {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-jwdqq.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })



const person = new Person({
  name: process.argv[3],
  number: process.argv[4]   
})

if ( process.argv.length>4) {
    person.save().then(response => {
  console.log(`added ${person.name} number ${person.number} to phonebook`);
  mongoose.connection.close();
})
}
