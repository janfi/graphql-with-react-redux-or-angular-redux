import express from "express";
import path from "path";
import fs from 'fs';
import cors from 'cors';

const app = express();

export default class ExpressServer {

    constructor() {

        var allowedOrigins = ['http://localhost:3000','http://localhost:8080','http://localhost:4200'];
        app.use(cors({
            origin: function(origin, callback){
              // allow requests with no origin 
              // (like mobile apps or curl requests)
              if(!origin) return callback(null, true);
              if(allowedOrigins.indexOf(origin) === -1){
                var msg = 'The CORS policy for this site does not ' +
                          'allow access from the specified Origin.';
                return callback(new Error(msg), false);
              }
              return callback(null, true);
            }
        }));
        // dotenv.config({ path: ".env.example" });
        app.use(express.static(path.join(__dirname, './../www')));

        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname, './../www/index.html'));
        });

    }

    router(routes:(app: express.Express) => void) {

        routes(app);

        // 404
        app.use((req, res, next) => {
            fs.readFile(path.join(__dirname, './../www/404.html'), 'utf-8', function(err, page) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(page);
                res.end();
            });
        });

        // 500 - Any server error
        app.use((err: any , req: any, res: any, next: any) => {
            fs.readFile(path.join(__dirname, './../www/500.html'), 'utf-8', function(err, page) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write(page);
                res.end();
            });
        });

        return this;
    }

    listen(port = process.env.APP_PORT || 8080, callback?: () => void) {
        
        app.set('port', port);

        return app.listen(port, () => {
            console.log(
                "  App is running at http://localhost:%d in %s mode",
                port,
                app.get("env")
            );
            console.log("Press CTRL-C to stop\n");
            if (callback) callback();
        });
    }

}