require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5f10a49aa1b183a67c052f08').then( () => {
//     return Task.countDocuments({completed: false})
// }).then( count => {
//     console.log('Task Incomplete: ' + count)
// }).catch( e => {
//     console.log(e)
// })

const deleteTaskAndCount = async id => {
    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({completed: false})
}

deleteTaskAndCount('5f10afb31ed448a8ba757df6').then( count => {
    console.log(count)
})