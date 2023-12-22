const pool = require("../../src/config/database");

exports.DbHandler =(...args)=>{
    return new Promise((resolve,reject)=>{
        try {
          const [Query,Arr,fncName] = args;
          if(!Query) reject("No Query Found or Empty");
          
          pool.query(Query,Arr,(err,result)=>{
               if(!err){
                console.log(result.rows,fncName)
                 resolve(result.rows)
               } else{
                console.log(err,fncName)
                 reject(err)
               }  
          })  
        } catch (error) {
            console.log(err,fncName)
            reject(error)
        }
      
    })
}