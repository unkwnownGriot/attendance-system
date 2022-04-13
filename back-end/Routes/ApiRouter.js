const express= require('express')
const userCtrl = require('../Controller/UserCtrler')

const router = express.Router()

router.post('/users/register',userCtrl.register)
router.post('/users/login',userCtrl.login)
router.get('/users/',userCtrl.getAllUsers)
router.get('/users/admin',userCtrl.getUserForAdmin)
router.get('/users/:id',userCtrl.getOneUser)
router.delete('/users/:id',userCtrl.deleteUser)


module.exports = router