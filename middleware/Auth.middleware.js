const jwt=require("jsonwebtoken");
function  authantication(req,res,next){
    try{
          let token=req.headers.authorization;
   //     console.log(token);
          if(token){
                jwt.verify(token, 'amit', function(err, decoded) {
                    if(err){
                //       console.log(err);
                        res.send({msg:"LOGIN FIRST"});
                    }else{
                        req.body.userID=decoded.userID;
                        next();
                    }
                });
          }else{
            res.send({msg:"PROVIDE AUTH TOKEN"});
          }
    }catch(err){
        console.log(err);
        res.send({msg:"OPPS SOME THING WENT WRONG"});
    }
}

module.exports={authantication}