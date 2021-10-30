const server = require('./index');

const port = 5000;

server.listen(port, () => {
    console.log(`running ${port}`);
});

module.exports = server;
