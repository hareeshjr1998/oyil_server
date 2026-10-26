require("dotenv").config();

const http = require("http");

const app = require("./app");
const { conn } = require("./config/database");


const PORT = process.env.PORT || 4001;

const server = http.createServer(app);

// Long AI requests
server.timeout = 900000;
server.keepAliveTimeout = 900000;
server.headersTimeout = 910000;

async function startServer() {
    try {

        await conn();

        server.listen(PORT, () => {
            console.log(
                `OYIL SERVER STARTED ON PORT ${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "❌ DATABASE CONNECTION FAILED",
            error
        );

        process.exit(1);
    }
}

startServer();