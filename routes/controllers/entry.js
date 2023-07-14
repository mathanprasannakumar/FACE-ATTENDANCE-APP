import {pool} from "../../services/dbConnect.js";

export function entryp(req,res){
    
    const {username,entry} = req.body
    console.log(username,entry)
    pool.connect()
        .then(client=>{
            const query =`SELECT * FROM users
                          WHERE username=$1`;
            const value = [username]


            client.query(query,value)
                .then((results)=>{
                        const x = `INSERT INTO attendancerecords (userid,type,time)
                        VALUES ($1,$2,$3)`;
                        const y = [results.rows[0].userid,entry,'NOW()']
                        console.log(x,y)
                        client.query(x,y)
                            .then(results=>{
                                client.release()
                                console.log(`Attendance is successfully registered for the user`)
                                res.json({url:'/entry'})
                                return;
                            })
                            .catch(err=>{console.error("Error inserting into the database",err)
                            return;
                        })
                })
                .catch(err=>{console.error("Error querying into the database",err)
                return;
            })
        })
        .catch(err=>{console.error("Error in acquiring the client from the Connection pool",err)
        return;
    })
}

export function entryg(req,res){
    res.render('facehome',{message:"Attendance registered for you"})
}