import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import includeAll from 'include-all';

includeAll({
  dirname: path.join(__dirname, 'models'),
  filter: /\.js$/,
});
import routes from './routes';
import schema from './schemas';
import mongoose from './mongoose';
mongoose();

const server = new ApolloServer({schema});
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(require('./responses'));
app.use(require('./serializers'));

server.applyMiddleware({app});

routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.log('error handler', err);
  // render the error page
  res.status(err.status || 500);
  res.end();
});

app.listen({port: 4000}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
