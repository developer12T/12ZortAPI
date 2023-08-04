const jwt = require('jsonwebtoken')

const config = process.env
const verifyToken = (req,res,next) =>{
    if(!req.body.cutoff){
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            var token = req.body.token || req.query.token || req.headers['x-access-token'] 
        }else{
            var token = authHeader && authHeader.split(' ')[1];
        }
      
       
        if (!token) {
            return res.json('require token')
        }
     
        try {
            const decoded = jwt.verify(token, config.TOKEN_KEY)
            req.user = decoded
            next();
            // console.log(decoded)
        } catch (error) {
            return res.json('Invalid token')
        }
    }else{
        if(req.body.cutoff == 'print'){
            next();
        }else{
            return res.json('Invalid token')
        }
       
    }
   
}

module.exports = verifyToken