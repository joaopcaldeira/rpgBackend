import { openDb } from '../configDB.js';

export async function createUserTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL)')
    })
}

export async function insertUser(req, res) {
    let user = req.body
    openDb().then(db => {
        db.run('INSERT INTO User (name, email, password) VALUES (?,?,?)', [user.name, user.email, user.password])
    })
    res.json({ "statusCode": 200 })
}

export async function updateUser(req, res) {
    let user = req.body
    openDb().then(db => {
        db.run('UPDATE User SET name=?, email=?, password=? WHERE id=?', [user.name, user.email, user.password, user.id])
    })
    res.json({ "statusCode": 200 })
}

export async function selectUsers(req, res) {
    openDb().then(db => {
        db.all('SELECT *FROM User')
            .then(users => res.json(users))
    })
}

export async function selectUser(req, res) {
    let id = req.body.id
    const dbOpened = await openDb()
    const user = await dbOpened.get('SELECT *FROM User WHERE id=?', [id])
    res.json(user)
}

export async function deleteUser(req, res) {
    let id = req.body.id
    openDb().then(db => {
        db.get('DELETE FROM User WHERE id=?', [id])
            .then(res => res)
    })
    res.json({ "statusCode": 200 })
}

export async function loginTest(req, res) {
    const { email, password } = req.body;
    console.log(email, password)
    const dbOpened = await openDb()
    const user = await dbOpened.get('SELECT * FROM User WHERE email=? AND password=?', [email, password])
    console.log(user)

    if (user) {
        return res.status(200).json(user);
    }

    return res.status(401).json({ message: 'Credenciais invalidas' });
}