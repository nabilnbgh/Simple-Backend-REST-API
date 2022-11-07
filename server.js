const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const initServer = async () =>{
    const server = Hapi.server({
        port : 5000,
        host : 'localhost',
        routes :{
            cors :{
                origin: ["*"],  
                headers: ["Accept", "Content-Type"],
                additionalHeaders: ["X-Requested-With"]
            },
        },
    });

    server.route(routes);
    await server.start();
    console.log(`Server started at ${server.info.uri}`);
}

initServer();
