export const handleProfile=(req,res,db)=>{
    const {id}=req.params;
    db('users')
    .select('*')
    .where({id:id})
    .then(user=>{
        if(user.length){
        res.json(user[0]);     
        }
        else {
            res.status(400).json("user already exist")
        }
       
        console.log(user);
    })
    .catch(err=>res.status(400).json("user doesn't exist"))
}
    