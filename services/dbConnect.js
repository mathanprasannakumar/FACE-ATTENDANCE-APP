import pg from "pg"
import 'dotenv/config'

const config = {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
        max: 10,
    idleTimeoutMills:300000,
}

const pool = new pg.Pool(config)
pool.on("connect",()=>{
    console.log("Connected to the Database")
})

pool.on("remove",()=>{
    console.log("Client is released ")
})

export {pool}