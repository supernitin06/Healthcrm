import pool from "../../../db/config.js";


export const createOfferTable= async()=>{
    try{
        const query =  `CREATE TABLE IF NOT EXISTS offer (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );`
        await pool.query(query);
        console.log("✅ Offer table created");
    }catch(error){
        console.log(error);
    }
}

export const UsersOfferTable = async()=>{
    try{
        const query =  `CREATE TABLE IF NOT EXISTS users_offer (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            offer_id INT REFERENCES offer(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );`
        await pool.query(query);
        console.log("✅ Users offer table created");    
    }catch(error){
        console.log(error);
    }
}