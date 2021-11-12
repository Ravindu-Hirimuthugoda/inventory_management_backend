
const Category = require('../services/technical_officer/category');
const Equipment = require('../services/technical_officer/equipment')
const BorrowData = require('../services/technical_officer/borrow_data');
const Lab = require('../services/technical_officer/lab');
const Model = require('../services/technical_officer/model');
const Request = require('../services/technical_officer/request');
//var cloudinary = require('../utils/coludanary')
var cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "inventorysep",
    api_key: "346587284581111",
    api_secret: "1354B6XJXPqKfCNVcvOq2eT6GxA"
})
const AddEquipment = async (req, res, next) => {
    const { category, model, lab, imgPreview } = req.body;

    try {
        const upload = await cloudinary.uploader.upload(imgPreview, function (error, result) { });

        const result = await Equipment.AddEquipment(category, model, lab, upload.url);
        res.json(result);

    } catch (error) {
        //console.log(error);
    }
}
const UpdateEquipment = async (req, res, next) => {
    let equipment = new Equipment();

    const { store_code, status, imgPreview, issetimage } = req.body;

    try {
        var url = imgPreview
        if (issetimage) {
            const upload = await cloudinary.uploader.upload(imgPreview, function (error, result) { });
            url = upload.url
        }
        const result = await equipment.UpdateEquipment(store_code, status, url);
        res.json(result);

    } catch (error) {

        res.status(409).json({ message: error.message });
    }
}
const Getcategories = async (req, res, next) => {
    let category = new Category();

    try {
        const result = await category.getAllCategories();

        res.status(200).json(result);
    } catch (error) {

    }

}
const Getlabs = async (req, res, next) => {
    let lab = new Lab();
    try {
        const result = await lab.getAllLabs();

        res.status(200).json(result);
    } catch (error) {

    }

}

const GetModels = async (req, res, next) => {
    let model = new Model();
    const { category } = req.params;

    try {
        const result = await model.getModels(category);

        res.status(200).json(result);
    } catch (error) {

    }

}

const getBorrowData = async (req, res, next) => {

    const { store_code, fromDate, toDate } = req.body;
    const borrowdata = new BorrowData();

    try {
        const result = await borrowdata.getBorrowData(store_code, fromDate.split('T')[0], toDate.split('T')[0]);

        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }

}
const GetlastBorrowData = async (req, res, next) => {

    const { store_code } = req.params;
    const borrowdata = new BorrowData();
    try {
        const result = await borrowdata.GetlastBorrowData(store_code);

        if (result.length == 0) {
            res.status(409).json({ message: 'invaild id' });

        }
        else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }

}
const findIteamsByCatogary = async (req, res, next) => {
    const { categoryid } = req.params;

    let equipment = new Equipment();
    try {

        const result = await equipment.findIteamsByCatogary(categoryid);

        res.status(200).json(result);
    } catch (error) {

    }

}
const findIteamByid = async (req, res, next) => {
    const { id } = req.params;

    let equipment = new Equipment();
    try {
        const result = await equipment.findIteamByid(id);

        res.status(200).json(result);
    } catch (error) {

        res.status(409).json({ message: error.message });
    }

}
const temporyBorrow = async (req, res, next) => {
    let borrow = new BorrowData();
    const { userid, storeid, fromdate, todate, reason } = req.body;

    try {
        const result = await borrow.AddTemporyBorrow(userid, storeid, fromdate.split('T')[0], todate.split('T')[0], reason);

        if (result != null) {
            res.json({ message: result });
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
const GetReport = async (req, res, next) => {
    let borrow = new BorrowData();
    const { fromdate, toDate, categories, reportType } = req.body;

    try {
        if (reportType === 'usage') {
            const result = await borrow.getReport(fromdate, toDate, categories);

            res.status(200).json(result);
        }
        else {
            const result = await borrow.getAvailableReport(fromdate, toDate, categories);
            res.status(200).json(result);
        }



    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}
const getRequestData = async (req, res, next) => {

    const { id } = req.params;
    const requset = new Request();
    try {
        const result = await requset.GetrequestData(id);

        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }

}
const normalBorrow = async (req, res, next) => {
    let borrow = new BorrowData();
    const { userid, storeid, fromdate, todate, requestId } = req.body;

    try {
        const result = await borrow.AddnormalBorrow(userid, storeid, fromdate.split('T')[0], todate.split('T')[0], requestId);
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
const addmodel = async (req, res, next) => {
    let mode = new Model();
    const { model, category } = req.body;

    try {
        const result = await mode.addmodel(model, category);
        if (result == null) {
            res.json({ message: 'error' });
        }
        else {
            res.status(201).json(result);

        }

    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }
}
const addcategory = async (req, res, next) => {
    let cat = new Category();
    const { category } = req.body;

    try {
        const result = await cat.addcategory(category);
        if (result == null) {
            res.json({ message: 'error' });
        }
        else {
            res.status(201).json(result);

        }


    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message });
    }
}
module.exports = { addmodel, addcategory, acceptEquipment, AddEquipment, Getcategories, findIteamsByCatogary, getBorrowData, Getlabs, GetModels, findIteamByid, UpdateEquipment, temporyBorrow, GetlastBorrowData, GetReport, getRequestData, normalBorrow };

