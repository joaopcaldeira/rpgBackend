import express from 'express';
import { createUserTable, insertUser, updateUser, selectUsers, selectUser, deleteUser, loginTest } from './Controler/User.js';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "msg": "Api runing"
    })
})

routes.get('/pessoas', selectUsers)
routes.get('/pessoa', selectUser)
routes.post('/user', insertUser)
routes.put('/pessoa', updateUser)
routes.delete('/pessoa', deleteUser)
routes.post('/login', loginTest)


export default routes