const User = require('../services/user');
let user = new User();

const checkAvailability = async(value)=>{
    try{
        const response = await user.getItemDetails(value);
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

        return lst;
        
    }catch(err){
        return(err);
    }
}

const checkItemByCategory = async(value,page)=>{
    try{
        const response = await user.getItemDetailsByCategory(value,page);
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

        return lst;
        
    }catch(err){
        return(err);
    }
}

const getItemCount = async(value)=>{
    try{
        //console.log('running');
        const result = await user.getitemCount(value);
        //console.log(result);
        
        return result;
    }catch(err){
        return err;
    }
}

const getEquipmetCount = async(req,res,next)=>{
    try{
        const result = await user.getEquipmetCount();
        if(result){
            res.send({"count":result});
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

const getNotification = async(id)=>{
    try{
        const result = await user.getNotifi(id);
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



module.exports = {checkAvailability,getAllCategories,getModels,getLab,getStoreCode,getAvailabelItems,getNotification,getEquipmetCount,checkItemByCategory,getItemCount};