
import {pool} from '../../services/dbConnect.js';




// ## Checking of the username
export function check (req,res){
    const {name} = req.body
    // acquiring the client from the connection pool
    pool.connect()
        .then(client=>{
            const query = `SELECT * FROM users
                       WHERE username = $1`;
            const value = [name]
        
            client.query(query,value)
                .then((results)=>{
                    if(results.rows.length===0)
                    {
                        res.json({url:'/register'})
                     }
                    else{
                        console.log(results)
                        client.release()
                        res.json({username:results.rows[0].username,embed:results.rows[0].embed}) 
                        // res.json({url})
                    }
                })
                .catch(err=>{console.error("Error in quering the database", err)})
        })
        .catch(err=>{console.error("Error in acuiring the client",err)})
}