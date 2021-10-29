
const sequelize = require("../../config/database");
const db = require('../../models/allmodels');



class Equipment {
    
    constructor() {
         try {
             sequelize.sequelize.authenticate();
             
        } catch (error) {
            
        }
    }

    async findIteamsByCatogary(categoryid) {
        
        const equipments =await db.Equipment.findAll({
            include: [{
                model: db.Category,
            },{
                model: db.Model,
            },{
                model: db.Lab,
            }],
            where: {
                categoryId: categoryid
            }
        }).then().catch(error => {
            console.log(error);
        });
        console.log(categoryid,equipments)

        return equipments;
       
    }
    static async AddEquipment(category, model, lab,url) {
    
        const re= await db.Equipment.count().then( async c => {
        
            const eq=await db.Equipment.create({
            categoryId: category,
            modelId: model,
            labId: lab,
            availability: 1,
            status: 'notdamage',
            addDate:new Date(),
            imageURL:url
            ,
                id: `${category}-${model}-${lab}-${c}`
    
            }).then(function (x) {
                console.log(x.dataValues);
                return x.dataValues;

            });
            return eq;
        });
        return re;
       
        
       
    }
     async UpdateEquipment(store_code,status,imgPreview) {
         if (status === "damage") {
             const t = await sequelize.transaction();
             var equipment;
             try {
                  equipment = await db.Equipment.update({
                     status: status,
                     imageURL: imgPreview,
                     availability: 0,
                 },
                     {
                         where: {
                             id: store_code
                         }, transaction: t
                          
                     });
                 
                 const re = await db.DamageEquipment.count().then(async c => {
        
                     const eq = await db.DamageEquipment.create({
                         id: c + 1,
                         itemId: store_code,
                         openDate: new Date(),
                         reason: "update item",
                         status: "pending",
                     }, {transaction: t})
                 })
                  await t.commit();
             } catch (error) {
                 await t.rollback();
             }
         }
         else {
                equipment = await db.Equipment.update({
             status: status,
             imageURL:imgPreview,
         },
            {
                 where: {
                     id: store_code
                 }
             }).then().catch(error => {
            console.log(error);
        });
         }
       
       

        return equipment;
       
    }
     async findIteamByid(id) {
        
        const equipment =await db.Equipment.findOne({
            include: [{
                model: db.Category,
            },{
                model: db.Model,
            },{
                model: db.Lab,
            }],
            where: {
                id: id
            }
        }).then().catch(error => {
            console.log(error);
        });
        console.log(equipment)

        return equipment;
       
    }

}

module.exports = Equipment;