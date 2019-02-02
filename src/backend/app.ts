import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as jwt from 'express-jwt';
import setRoutes from './routes';
import { createConnection } from 'typeorm';
import { User } from './entities/user';

const app = express();

dotenv.config({
  path: 'settings.env',
});

app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

/*
app.use(jwt({
  secret: process.env.SECRET_TOKEN,
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
}).unless({ path: ['/backend/login'] }));
*/
app.use(morgan('dev'));

createConnection().then(connection => {
  process.stdout.write('Connected to MySQL DB\n');
  const userRepository = connection.getRepository(User);
  setRoutes(app);

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    process.stdout.write('HTTP server listening on port ' + app.get('port'));
  });

});

export { app };
