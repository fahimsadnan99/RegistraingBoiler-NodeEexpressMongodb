const  responseMsg = (res,code,data = {},errorMsg="")=>{
    let msg = ""
    if(code == 404){
        msg ="Not Found" 
    }else if(code == 403){
        msg = "Fill all Field"
    }else if(code == 500){
        msg = "Server Problem"
    }else if(code == 200){
        msg="Successfull";
    }else if(code == 201){
        msg= "Data Create successfully"
    }else if(code == 213){
        msg = "Email Already exist"
    }else if(402){
        msg  = "Invalid Information"
    }

    return res.status(code).json({message : msg,data : data})
}

module.exports = responseMsg