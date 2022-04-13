const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwUtils = require('../Utils/jwt.utils')



const pool = mysql.createPool({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})



function register(req,res){

var password = req.body.password
var email = req.body.email
var name = req.body.name
var firstname = req.body.firstname
var role = req.body.role


if(password == null || email == null || name == null || firstname == null || role == null){
    return res.status(400).json({'error':'missing values'})
}

pool.getConnection((err,connection)=>{
    if(err) throw err
    connection.query("select * from users where email = ?",
    [email],(err,result,fields)=>{
        if(err) throw err
        connection.release()
        if(!result.length){
            bcrypt.hash(password,5,(err,hashPass)=>{
                connection.query("insert into users (name,firstname,email,password,role,onWork) values(?,?,?,?,?,0)",
                [name,firstname,email,hashPass,role],(err,result)=>{
                    if(err){
                        res.status(500).json({'error':'unable to add user'})
                    }else{
                        res.status(201).json({'message':'user added successfully'})
                    }
                })
            })
        }else{
            res.status(500).json({'error':'user already exist'})
        }
    })
})


}


function login(req,res){
 var password = req.body.password
 var email = req.body.email
 if(password == null || email == null){
    return res.status(400).json({'error':'missing values'})
 }   

 pool.getConnection((err,connection)=>{
     if(err) throw err
     connection.query('select * from users where email = ?',
     [email],(err,result)=>{
         connection.release()
         if(err){
             return res.status(500).json({error:'cannot verify user'})
         }else{
             if(result.length){
                 console.log(result)
                 bcrypt.compare(password,result[0].password,(err,resHashPass)=>{
                     if(resHashPass){
                         return res.status(200).json({
                             'TOKEN':jwUtils(result[0])
                         })
                     }else {
                         res.json({'error':'password incorrect'})
                     }
                 })
             }else{
                 return res.json({'error':'email wrong'})
             }
         }

     })
 })

}


function getAllUsers(req,res){

    pool.getConnection((err,connection)=>{
        if(err){
            throw err
        }
        connection.query("select id,name,firstname, date_format(date_debut,'%d/%m/%Y %H:%i') as date_debut,date_format(date_fin,'%d/%m/%Y %H:%i') as date_fin from users left join date_entry on users.id = date_entry.id_user  where users.role = 'user'",
        (err,result)=>{
            connection.release()
            if(err){
                res.json({'error':"eanble to get data"})
            }else{
                res.send(result)
            }
        })
    })
}


function getUserForAdmin(req,res){
    pool.getConnection((err,connection)=>{
        if(err) throw err

        connection.query("select id,name,firstname,email,role from users",(err,result)=>{
            connection.release()
            if(err){
                res.json({'error':"eanble to get data"})
            }else{
                res.send(result)
            }
        })
    })
}




function getOneUser(req,res){
    var id = req.params.id
    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("select round(sum(timestampdiff(minute,date_debut,date_fin)/60),0) as hour from date_entry where month(date_debut) = month(now()) and id_user = ?",
        [id],(err,result)=>{
            connection.release()
            if(err){
                res.status(500).json({'error':'cannot fetch data'})
            }else{
                res.status(200).send(result[0])
            }
        })

    })
}

function deleteUser(req,res){
    var id = req.params.id
    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("delete from users where id = ?",[id],(err,result)=>{
            if(err){
                res.status(500).json({'error':'cannot delete user'})
            }else{
                res.status(200).json({'message':"user deleted"})
            }
        })
    })
}




module.exports = {
    register,
    login,
    getAllUsers,
    getOneUser,
    getUserForAdmin,
    deleteUser
}