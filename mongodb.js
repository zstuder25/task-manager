const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect (connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to databases')
    }

    const db = client.db(databaseName)

    // db.collection('users').deleteMany({
    //     age: 28
    // }).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description: 'Groceries'
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
})