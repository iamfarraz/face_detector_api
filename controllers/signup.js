export const handleSignup=(req,res,db,bcrypt)=>{
    const {name,email,password}=req.body;
   const hash=bcrypt.hashSync(password);

//retruning is knex method to tell which column is to be returned from db to server
   db.transaction(trx=>{
       trx.insert({
           email:email,
           hash:hash
       })
       .into('login')
       .returning('email')
       .then(loginEmail=>{
            return db('users')
            .returning('*')          
            .insert({
                email:loginEmail[0],
                name:name,
                joined:new Date()
            })
            .then (user=>{
                res.json(user[0]);  
            })
       })
       .then(trx.commit)
       .catch(trx.rollback)
   }) 
 .catch(err=>res.status(400).json("erroor"))
  

}
