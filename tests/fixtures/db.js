const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('./../../src/models/user')
const Task = require('./../../src/models/task')

const userOneId = mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mac',
    email: 'fitdudes@philly.com',
    password: 'thisisapw1',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Charlie',
    email: 'janitors@philly.com',
    password: 'thisisapw1',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Clean the floors',
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Mop the deck',
    completed: false,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Clean bathroom',
    completed: false,
    owner: userTwoId
}

const setupDb = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDb,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree
}