import express from "express";
import {pool} from "../services/dbConnect.js"
import {check} from "./controllers/check.js"
import {registerg,registerp} from "./controllers/register.js"
import {entryp,entryg} from "./controllers/entry.js"

const router = express.Router();


router.get('/',(req,res)=>
{
    res.render('facehome',{message:"Hi Buddy, Enter your user name to register your attendance"})

})

router.get('/error',(req,res)=>{
    res.render('facehome',{message:"There is some error,Please Try again"})
})


router.get('/register',registerg)
router.post('/register',registerp)
router.get('/entry',entryg)
router.post('/entry',entryp)
router.post('/check',check)


export {router}



