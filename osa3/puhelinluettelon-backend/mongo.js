const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phone_number = process.argv[4];

const url = `mongodb+srv://dtuukkanen:${password}@puhelinluettelo-db.cs55hlv.mongodb.net/?appName=puhelinluettelo-db`

async function main() {
    mongoose.set('strictQuery', false)
    await mongoose.connect(url, { family: 4 })

    const personSchema = new mongoose.Schema({
        name: String,
        phone_number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length === 3) {
        console.log("phonebook:")
        const persons = await Person.find({})
        persons.forEach(person => {
            console.log(person.name, person.phone_number);
        })
    }

    if (process.argv.length === 5) {
        const person = new Person({
            name: name,
            phone_number: phone_number,
        })

        await person.save().then(result => {
            console.log(`added ${name} number ${phone_number} to phonebook`)
        })
    }

    mongoose.connection.close()
}

main()
