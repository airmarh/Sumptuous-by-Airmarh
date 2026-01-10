import jwt from 'jsonwebtoken'

export const adminLogin = async (req, res) => {
    try{
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token, message: 'Login successful!'})
        }else{
            res.json({success:false, message: 'Invalid login details!'})
        }
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}