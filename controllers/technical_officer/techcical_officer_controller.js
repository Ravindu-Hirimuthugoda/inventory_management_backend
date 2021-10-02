const Category = require('../../services/technical_officer/category');
const Equipment = require('../../services/technical_officer/equipment')
const BorrowData = require('../../services/technical_officer/borrow_data');
const Lab = require('../../services/technical_officer/lab');
const Model = require('../../services/technical_officer/model');
const Request = require('../../services/technical_officer/request');







const AddEquipment = async(req,res,next) => {
    const { category, model, lab } = req.body;
    console.log(category, model, lab);
    try {
        const result = await Equipment.AddEquipment(category, model, lab);
        res.json(result);
        console.log(result,'jj');
    } catch (error) {
        console.log(error);
    }
}
const UpdateEquipment = async (req, res, next) => {
     let equipment = new Equipment();
    const { store_code, status } = req.body;
    console.log(store_code, status);
    try {
        const result = await equipment.UpdateEquipment(store_code,status);
        res.json(result);
        console.log(result,'jj');
    } catch (error) {
        console.log(error);
    }
}
const Getcategories = async (req, res, next) => {
    let category = new Category();
    try {
        const result=await category.getAllCategories();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        
    }
    
}
const Getlabs = async (req, res, next) => {
    let lab = new Lab();
    try {
        const result=await lab.getAllLabs();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        
    }
    
}

const GetModels = async (req, res, next) => {
    let model = new Model();
    const { category } = req.params;

    try {
        const result=await model.getModels(category);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        
    }
    
}

const getBorrowData = async (req, res, next) => {
   
    const { store_code, fromDate, toDate } = req.body;
     const borrowdata = new BorrowData();
    try {
       const result=await borrowdata.getBorrowData(store_code, fromDate.split('T')[0], toDate.split('T')[0]);
        
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
    
}
const GetlastBorrowData = async (req, res, next) => {
   
    const  {store_code} = req.params;
     const borrowdata = new BorrowData();
    try {
       const result=await borrowdata.GetlastBorrowData(store_code);
        
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
    
}
const findIteamsByCatogary = async (req, res, next) => {
    const { categoryid } = req.params;
    console.log( req.params);
    let equipment = new Equipment();
    try {
        console.log(categoryid);
        const result=await equipment.findIteamsByCatogary(categoryid);
        
        res.status(200).json(result);
    } catch (error) {
        
    }
    
}
const findIteamByid = async (req, res, next) => {
    const { id } = req.params;
    console.log( req.params);
    let equipment = new Equipment();
    try {
        const result=await equipment.findIteamByid(id);
        
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
    
}
const temporyBorrow = async (req, res, next) => {
     let borrow = new BorrowData();
    const { userid,storeid,fromdate,todate,reason } = req.body;
    console.log(userid,storeid,fromdate,todate);
    try {
        const result = await borrow.AddTemporyBorrow(userid, storeid, fromdate.split('T')[0], todate.split('T')[0],reason);
        if (result != null) {
            res.status(406).json({ message: result });
        }
        else {
            res.status(201).json({ message: result });
        }
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
const acceptEquipment = async (req, res, next) => {
     let borrow = new BorrowData();
    const { id, status } = req.body;
    try {
        const result = await borrow.acceptEquipment(id, status);
        if (result != null) {
            res.status(406).json({ message: result });
        }
        else {
            res.status(201).json({ message: result });
        }
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
const GetReport=async(req,res,next)=>{
    let borrow = new BorrowData();
    const { fromdate, toDate, categories,reportType } = req.body;

    console.log(fromdate, toDate, categories,reportType);
    try {
        if (reportType === 'usage') {
            const result = await borrow.getReport(fromdate, toDate, categories);
            console.log(result);
            res.status(200).json(result);
        }
        else {
            const result = await borrow.getAvailableReport(fromdate, toDate, categories);
            res.status(200).json(result);
        }

        
        
    } catch (error) {
        console.log(error);
    }
}
const getRequestData = async (req, res, next) => {
   
    const  {id} = req.params;
     const requset = new Request();
    try {
       const result=await requset.GetrequestData(id);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
    
}
const normalBorrow = async (req, res, next) => {
     let borrow = new BorrowData();
    const { userid,storeid,fromdate,todate,requestId } = req.body;
    console.log(userid,storeid,fromdate,todate);
    try {
        const result = await borrow.AddnormalBorrow(userid, storeid, fromdate.split('T')[0], todate.split('T')[0],requestId);
        if (result != null) {
            res.status(406).json({ message: result });
        }
        else {
            res.status(201).json({ message: result });
        }
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
module.exports = {acceptEquipment,AddEquipment,Getcategories,findIteamsByCatogary,getBorrowData,Getlabs,GetModels,findIteamByid,UpdateEquipment,temporyBorrow,GetlastBorrowData,GetReport,getRequestData,normalBorrow};