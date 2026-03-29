const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
let connectionPromise = null

const connectToDatabase = async () => {
    if (!url) {
        throw new Error('MONGODB_URI is not defined')
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(url, {
            family: 4,
            serverSelectionTimeoutMS: 30000,
        })
    }

    return connectionPromise
}

const personSchema = new mongoose.Schema({
    name: {
        type:String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d{5,}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true,
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = {
    Person,
    connectToDatabase,
}
