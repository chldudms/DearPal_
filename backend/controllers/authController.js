const authService = require('../')

exports.join = async (req,res)=>{
    try{
        const result = await authService.checkUser(req.body);
        res.join(result);
    }catch(error){
        console.error(error);
        res.status(500).json({message:'서버 오류'})
    }
}