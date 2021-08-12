// require your server and launch it here
const server = require("./api/server");

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server up and running on Port ${PORT}`)
});