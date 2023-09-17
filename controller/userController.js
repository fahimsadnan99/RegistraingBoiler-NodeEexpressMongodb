const bcrypt = require("bcrypt")
const responseMsg = require("../helper/errerMsg");
const UserSchema = require("../Model/UserSchema");

const signUp = async (req, res) => {
  let { name, email, password } = req.body;
  if (!name && !email && !password) responseMsg(res, 404);

  //check email exist or not

  let user = await UserSchema.findOne({ email });
  if (user) responseMsg(res, 213);

  try {
    //hash password
    let hashedPassword = await bcrypt.hashSync(password, 8);
    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
    };
    const saveNewUser = new UserSchema(newUser).save();
    responseMsg(res, 201,saveNewUser);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};


const signIn = async(req,res)=>{
    let{email ,password}=req.body;
    if(!email ||!password){responseMsg(res,403);}
    try{
        let user=await UserSchema.findOne({email});
        if(!user||!(await bcrypt.compareSync(password,user.password))){return responseMsg(res,402)}
        let token = user.generateJWT();
        let info = {
            user : user,
            token : token
        }
        responseMsg(res,200,info)

        //        console.log('user',user._id,'token')
        //         jwt.sign()
        //       var token=jwt.sign({'_id':user._id},process.env.JWTSECRET,{expiresIn:'7d'});
        //           console.log(`Token:${token}`);
        //            res.cookie('auth-token',token,{httpOnly : true})
        //          res.sendStatus(200);
        //        res.setHeader('x-auth-token',`${token}`)
        //        res.setCookie('auth-token',token,{maxAge:60*60*24*7}).end();
        //        res.header('Access-Control-Allow-Origin','*').header('Access-Control-Allow-Headers' ,'Content-Type
        //        res.header('Set-Cookie','auth-token='+token+'; Max-age='+(60*60*24
        // *7));
        //        res.cookie('auth-token',token,{ httpOnly:true })
        //        res.setHeader('Access-Control-Allow-Origin',"*");
        //             res.setHeader('Access-Control-Allow-Methods','GET,POST');
        //     res.setHeader('Content-Type','application/json');
        //        res.redirect('/dashboard')
        //        res.writeHead("Location", "/dashboard")
        //      res.cookie('auth-token',token,{ maxAge:900000 }).end();
        //    res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly`);
        //        res.setHeader('Set-Cookie', 'auth-token=<PASSWORD>');
        //        res.setHeader('Set-Cookie', ['key1=value1;', 'key2=value2']);
        }catch(e){
            return res.status(400).json({ msg: err.message });
        };


}

module.exports = {signIn,signUp}