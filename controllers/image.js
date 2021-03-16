import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'bb95049e7de545de91b24a3e1b272a7a'
 });
 export const handleApi=(req,res)=>{
  const { input } = req.body;
  // console.log(input);
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL,input)
  .then(data=>{res.json(data)})
  .catch(err=> res.status(400).json(`api error ${err}`)  )
 }
export const handleImage=(req,res,db)=>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}