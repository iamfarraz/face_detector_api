export const handleSignin=(req,res,db,bcrypt)=>{
    const {email,password}=req.body;
    if( !email || !password){
        return res.status(400).json("unable to register")
    }
    db.select('*') .from('login')
    .where({email:email})
    .then(user=>{
        
  if(bcrypt.compareSync(password,user[0].hash)){
             return  db.select('*').from('users')
                .where('email','=',req.body.email)
                .then(data=>{  
                    res.json(data[0])
                })
     .catch(err =>res.status(400).json("email not found inside bcrypt"))
         }
 else {res.status(400).json("wrong combination of email and pass")}
    })
    .catch( err=> res.status(400).json("wrong email"))
     
}