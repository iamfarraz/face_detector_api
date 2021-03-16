import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors'
import knex from 'knex';

import {handleSignup} from './controllers/signup.js';
import {handleSignin} from './controllers/signin.js';
import {handleProfile} from './controllers/profile.js';
import {handleImage,handleApi} from './controllers/image.js';
const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'faraz',
      password : '2802',
      database : 'face_detection'
    }
  });
  db.select('*').from('users')


 const app=express();
 app.use(bodyParser.json());
 app.use(cors());


 app.get('/',(req,res)=>{res.send("I am alive bitch")})

 // signin -->POST =sucess/fail
 app.post('/signin',(req,res)=>handleSignin(req,res,db,bcrypt) )

//signup ---->POST =user
app.post('/signup',(req,res)=> handleSignup(req,res,db,bcrypt))


//profile/:userid POST-->get usr
app.post('/profile/:id',(req,res)=>handleProfile(req,res,db) )

// /image  PUT -->update entry

app.put('/image',(req,res)=>handleImage(req,res,db))
app.post('/imageUrl',(req,res)=>handleApi(req,res))


 const PORT=process.env.PORT;
 app.listen(PORT,()=>{
     console.log(`i am alivee at ${PORT}`)
 })