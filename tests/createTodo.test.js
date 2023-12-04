const request = require('supertest');
const app = require('../server');
const { mongo, default: mongoose } = require('mongoose');

let token;

beforeAll(async () => {
    // User registration
    await request(app)
        .post('/api/user/register')
        .send({
            username: 'dan',
            email: 'dan@email.com',
            password: '123'
        });

    // User login
    const res = await request(app)
        .post('/api/user/login')
        .send({
            email: 'law@email.com',
            password: '123'
        });

        console.log(res.text)
    token = res.text; 
    
});

test('Create a new todo', async () => {
    const res = await request(app)
        .post('/api/todo')
        .set('auth-token', token)
        .send({
            title: 'Jest testing',
            description: 'This is a jest test todo',
            status: 'active',
            date: '2022-03-12T00:00:00.000Z'
        });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Todo Added');
    todoId = res.body.todo._id; 
    console.log(res.body.todo._id)
});

test("Get all todos", async () => {
    const res = await request(app)
        .get('/api/todo/')
        .set('auth-token', token);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy
    expect(res.body.length).toBeGreaterThan(0);
});

test("Update a todo", async () => {
    const res = await request(app)
        .put(`/api/todo/${todoId}`)
        .set('auth-token', token)
        .send({
            title: 'Updated Todo',
            description: 'This is an updated test todo',
            status: 'inactive',
            date: '2022-03-12T00:00:00.000Z'
        });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Todo Updated');
});

test('Delete a todo', async () => {
    const res = await request(app)
        .delete(`/api/todo/${todoId}`)
        .set('auth-token', token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Todo Deleted');
});

afterAll(done => {
    mongoose.connection.close();
    done();
});