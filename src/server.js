//import { openDb } from './configDB.js';
//import { createUserTable, insertUser, updateUser, selectUsers, selectUser, deleteUser } from './Controler/User.js';

import express from 'express';
import routes from './routes.js'
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

//createUserTable();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.get('/pessoas', async function (req, res) {
//     let users = await selectUsers();
//     res.json(users)
// });

// app.get('/pessoa', async function (req, res) {
//     let user = await selectUser(req.body.id);
//     res.json(user)
// });

// app.post('/pessoa', (req, res) => {
//     insertUser(req.body)
//     res.json({
//         "statusCode": 200
//     })
// })

// app.put('/pessoa', (req, res) => {
//     if (req.body && !req.body.id) {
//         res.json({
//             "statusCode": "400",
//             "msg": "Você precisa informar um id"
//         })
//     } else {
//         updateUser(req.body)
//         res.json({
//             "statusCode": 200
//         })
//     }
// })

// app.delete('/pessoa', async function (req, res) {
//     let user = await deleteUser(req.body.id);
//     res.json(user)
// });

app.listen(3000, () => {
    console.log('Listening on port 3000');
});