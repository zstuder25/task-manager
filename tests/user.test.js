const request = require('supertest')
const app = require('./../src/app')
const User = require('./../src/models/user')
const { userOneId, userOne, setupDb } = require('./fixtures/db')

beforeEach(setupDb)

it('signs up a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Zach',
            email: 'zach@example.com',
            password: 'thisisapwhello1'
        })
        .expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Zach',
            email: 'zach@example.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('thisisapwhello1')
})

it('login successful with existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)

    const user = await User.findById(response.body.user._id)

    expect(response.body.token).toBe(user.tokens[1].token)
})

it('login fails with non-existent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: 'badpassword'
        })
        .expect(400)
})

it('gets users profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

it('doesnt get users profile for unauthenticated call', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

it('deletes account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)

    expect(user).toBeNull()
})

it('doesnt delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

it('uploads avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

it('updates existing user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Jimbo'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Jimbo')
})

it('update fails with invalid field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'this is a bad field'
        })
        .expect(400)
})