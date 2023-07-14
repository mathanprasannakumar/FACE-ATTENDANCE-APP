
import {pool} from '../../services/dbConnect.js'


export function registerg(req,res){
    res.render('faceregister',{message:"We are not having your image for verification , so kindly register yourself"});
}

export function registerp(req,res){

    const {name,embed} = req.body

    if(name && embed)
    {

        pool.connect()
            .then((client)=>{
                const query = `INSERT INTO users (username,embed)
                            VALUES ($1,$2)`;
                const value =[name,Object.values(embed)]
    
                client.query(query,value)
                    .then((results)=>{ 
                        client.release()
                        console.log("user name and embed registered successfully")
                        res.json({url:'/'})})
                    .catch(err=>{console.error("Error in execution of query",err)})})
            .catch(err=>{return console.error("Error acquiring Client from the pool",err)})
    }
    else
    {
        res.json({url:'/error'})
    }
}