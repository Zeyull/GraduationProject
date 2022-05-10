const config = {
    server:{
        port:process.env.SERVER_PORT
    },
    db:{
        db_host: process.env.DB_HOST,
        db_name : process.env.DB_NAME,
        db_user: process.env.DB_USER,
        db_port: process.env.DB_PORT,
        db_password: process.env.DB_PASSWORD,
    },
    log:{
        appenders: { 
            cheese: { type: "file", filename: "logs/cheese.log" },
            access: { type: "file", filename: "logs/access.log" },
            db: { type: "file", filename: "logs/db.log" }
          },
        categories: { 
            default: { appenders: ["cheese"], level: "info" },
            access: { appenders: ["access"], level: "info" },
            db: { appenders: ["db"], level: "info" }
          },
    },
    jwt:{
        jwt_secret: process.env.JWT_SECRET,
        jwt_expire: process.env.JWT_EXPIRES,
    },
    hash:{
        salt: process.env.HASH_SALT,
    },
    code:{
        session:process.env.SESSION,
        csrftoken:process.env.CSRFTOKEN,
        long_session:process.env.LONGSESSION
    }
}
export default config;