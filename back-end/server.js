require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const bodyparser = require('body-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server,{cors:{origin:"*"}})
const ApiRouter = require('./Routes/ApiRouter')
const cron = require('node-cron')

// mysql 
const pool = mysql.createPool({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})



const corsOptions ={
    origin:"*",
    credentials:true,
    'method':"GET,HEAD,PATCH,PUT,POST,DELETE",
    "preflightContinue":false
}

// cron job

    cron.schedule('* 21 * * *',()=>{
        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("update date_entry set date_fin = now() where date_fin is null",(err,result)=>{
                 connection.release()
                if(err) throw err
                console.log(result)
            })
            
        })

        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("update users set onWork = 0 ",(err,result)=>{
                connection.release()
                if(err) throw err
                console.log(result)
            })
        })
    })




app.use(cors(corsOptions))

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use('/api',ApiRouter)







// socket io

  let decoded

io.on('connection',(socket)=>{
    console.log(`user logged with ${socket.id}`)

    socket.on('receive-data',({TOKEN})=>{
        try{
             decoded = jwt.verify(TOKEN,process.env.JWT_SIGN_SECRET_KEY,{
                algorithms:['HS256']
            })
            console.log(decoded)
            socket.emit('data-receive',decoded)

        }catch(err){
           console.log(err.message)
        }
    })

    socket.on('job-start',(data)=>{
        console.log(data)

    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query('insert into date_entry (date_debut,id_user) values (now(),?)',
        [data],(err,result)=>{
            connection.release()
            if(err) throw err
            id = result.insertId
            console.log(result,id)

        })
    })

    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query('update users set onWork = 1 where id = ?',[data],(err,result)=>{
            connection.release()
            socket.broadcast.emit('reload','reload data')
            if(err) throw err
            console.log(result)
        })
    })
})

     socket.on('job-stop', (data)=>{

        
       pool.getConnection((err,connection)=>{
           if(err) throw err
        connection.query("update date_entry set date_fin = now() where id_user = ? and date_fin is null ",
        [data],(err,result)=>{
            connection.release()
            if(err) throw err
            console.log(result)
            socket.broadcast.emit('reload','reload data')
        })
    })
        
    pool.getConnection((err,connection)=>{
        console.log(data)
        if(err) throw err
        connection.query('update users set onWork = 0 where id = ?',[data],
        (err,result)=>{
            connection.release()
            if(err) throw err
            console.log(result,data)
        })
    })
    
})

   

    socket.on('disconnect',()=>{
        console.log(`user disconnected with id ${socket.id}`)
    })

})


app.listen(8080,()=> console.log('server on listen'))
server.listen(3001,()=> console.log('socket server listenning'))

