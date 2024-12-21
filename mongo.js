const mongoose = require('mongoose')

const main = () => {
  if (
    process.argv.length < 3 ||
    process.argv.length === 4 ||
    process.argv.length > 5
  ) {
    console.log('Invalid arguments')
    return
  }

  const password = process.argv[2]
  const url = `mongodb+srv://fullstackopen:${password}@fullstackopen.h0xxt.mongodb.net/?retryWrites=true&w=majority&appName=phonebook`
  mongoose.set('strictQuery', false)
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  if (process.argv.length === 3) {
    Person.find({}).then((result) => {
      console.log('phonebook:')
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
      return
    })
  }

  if (process.argv.length === 5) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })

    person.save().then((result) => {
      console.log(`addded ${result.name} ${result.number} to the phonebook`)
      mongoose.connection.close()
      return
    })
  }
}

main()
