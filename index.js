const express = require("express");
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

const port = 5000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use('/', routes);

app.listen(port, () => {
    console.log(`running ${port}`);
});






// connection.sync({
//     logging: console.log,
//     force:true
// }).then(() => {
    
    
//     app.listen(port, () => {
//         console.log(`running ${port}`); 
//     })
// }).catch(err => {
//     console.error(err);
// }).then(() => {
//         CategoryModel.bulkCreate([{
//             id: 1,
//             categoryName: 'Projector'   
//         },{
//             id: 2,
//             categoryName: 'Camera'   
//         },{
//             id: 3,
//             categoryName: 'Laptop'   
//         }]);
        
//     });;





