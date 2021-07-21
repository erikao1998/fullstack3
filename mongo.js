const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.ttjrl.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', noteSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length > 5) {
    console.log('too many arguments given')
    process.exit(1)
} else {

    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })

    person.save().then(response => {
      console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
      mongoose.connection.close()
    })
}
