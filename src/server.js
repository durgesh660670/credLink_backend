require('dotenv').config();
const app=require('./app')
const PORT=2100;

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
});