const db = require('../../config/database')


class Equipment {
    
    constructor() {
         try {
            db.sequelize.authenticate();
           
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
    static async AddEquipment(category, model, lab) {
    
        const re= await db.Equipment.count().then( async c => {
        
            const eq=await db.Equipment.create({
            categoryId: category,
            modelId: model,
            LaboratoryId: lab,
            availability: 1,
                status: 'notdamaged',
            addDate:new Date(),
            imageURL:'http://pngimg.com/uploads/photo_camera/photo_camera_PNG101644.png'
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
     async UpdateEquipment(store_code,status) {
        
         const equipment = await db.Equipment.update({
             status: status,
         },
            {
                 where: {
                     id: store_code
                 }
             }).then().catch(error => {
            console.log(error);
        });
        console.log(equipment)

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