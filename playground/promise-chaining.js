require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5f10aeea4a8346a873a529bd', { age: 1 }).then( user => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then( count => {
//     console.log(count)
// }).catch( e => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    await User.findByIdAndUpdate(id, { age })
    return await User.countDocuments({ age })
}

updateAgeAndCount('5f10aeea4a8346a873a529bd', 2).then( count => {
    console.log(count)
}).catch( e => {
    console.log(e)
})