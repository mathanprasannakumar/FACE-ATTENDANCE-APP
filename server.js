import express from "express"
import {router} from  "./routes/routes.js"
import path from 'path'
const app = express();


const port = process.env.PORT || 3001
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(express.static(path.join(path.resolve(),'public')))
app.use(express.static(path.resolve()))
app.use('/',router)


app.listen(port,()=>{
    console.log("Application is running on the port 3001")
})


export{app}

