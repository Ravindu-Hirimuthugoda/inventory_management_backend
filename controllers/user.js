const User = require('../services/user');
let user = new User();

const checkAvailability = async(req,res,next)=>{
    try{
        const response = await user.getItemDetails();
        let lst=[];
        for(let m of response){
            console.log(m);
            if(!m.availability){
                const date = await user.getReturnDate(m.id);
                m= {...m,returnDate:date[0].returnDate};
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

const getModels = async(req,res,next)=>{
    console.log(req.body);
    try{
        const result = await user.getModels('projector');
        //console.log(result)
        if(result){
            res.send(result);
        }else{
            res.send('Error');
        }
    }catch(err){
        next(err);
    }
}

const getLab = async(req,res,next)=>{
    //urlEncoder
    try{
        const result = await user.getLab('projector','CA124-B');
        if(result){
            res.send(result);
        }else{
            res.send('Error');
        }
    }catch(err){
        next(err);
    }
}

const getStoreCode = async(req,res,next)=>{
    //urlEncoder
    try{
        const result = await user.getStoreCode('projector','CA124-B','CSE Level 1');
        if(result){
            res.send(result);
        }else{
            res.send('Error');
        }
    }catch(err){
        next(err);
    }
}



module.exports = {checkAvailability,getAllCategories,getModels,getLab,getStoreCode,getAvailabelItems};