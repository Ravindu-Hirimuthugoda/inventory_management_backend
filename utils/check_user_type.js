const checkUserType = (resType,allowedType)=>{
    if(resType == allowedType){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    checkUserType,
}