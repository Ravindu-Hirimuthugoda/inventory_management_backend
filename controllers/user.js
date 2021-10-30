const User = require('../services/user');
let user = new User();

const checkAvailability = async(req,res,next)=>{
    try{
        const response = await user.getItemDetails();
        let lst=[];
        //console.log(response);
        for(let m of response){
            //console.log(m);
            if(!m.availability && m.status!='damage'){
                const date = await user.getReturnDate(m.id);
                //console.log(date.slice(-1));
                m= {...m,returnDate:date.slice(-1)[0].returnDate};
            }
            lst.push(m);
        }
        console.log(lst);

        if(lst.length>0){
            res.send(lst);
        }else{
            res.send('Error');
        }
        
    }catch(err){
        next(err);
    }
}

const getAvailabelItems = async(req,res,next)=>{
    try{
        const result = await user.getAvailableItems();
        if(result){
            res.send(result);
        }else{
            res.send('Error');
        }
    }catch(error){
        next(error);
    }
}

const getAllCategories = async(req,res,next)=>{
    try{
        const result = await user.getCategories();
        if(result){
            res.send(result);
        }else{
            res.send('Error');
        }
    }catch(err){
        next(err);
    }
}

const getModels = async(category)=>{
    try{
        const result = await user.getModels(category);
        //console.log(result)
        if(result){
            return result;
        }else{
            return('Error');
        }
    }catch(err){
        return(err);
    }
}



const getLab = async(category,model)=>{
    try{
        const result = await user.getLab(category,model);
        console.log(result);
        if(result){
            return(result);
        }else{
            console.log('something ');
            return('Error');
        }
    }catch(err){
        return(err);
    }
}

const getStoreCode = async(category,model,labName)=>{
    //urlEncoder
    try{
        const result = await user.getStoreCode(category,model,labName);
        if(result){
            return(result);
        }else{
            return('Error');
        }
    }catch(err){
        return(err);
    }
}



module.exports = {checkAvailability,getAllCategories,getModels,getLab,getStoreCode,getAvailabelItems};