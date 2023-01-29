import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import {expressMiddleware} from '@apollo/server/express4';
import cors from 'cors';
import {resolvers} from './resolvers/index.js'
import {typeDefs} from './schemas/index.js'
import mongoose from 'mongoose'
import 'dotenv/config'
import './firebaseConfig.js';
import { getAuth } from 'firebase-admin/auth';

const app = express();
const httpServer = http.createServer(app);

                                                                                                                                                                                   ;

//resolver
//schema
//Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.crbxkok.mongodb.net/?retryWrites=true&w=majority`
const  PORT = process.env.PORT || 4000;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginDrainHttpServer({httpServer})]
});

await server.start();
const authorizationJWT = async (req, res, next) => {
    console.log({ authorization: req.headers.authorization });
    const authorizationHeader = req.headers.authorization;
  
    if (authorizationHeader) {
      const accessToken = authorizationHeader.split(' ')[1];
  
      getAuth()
        .verifyIdToken(accessToken)
        .then((decodedToken) => {
          console.log({ decodedToken });
          res.locals.uid = decodedToken.uid;
          next();
        })
        .catch((err) => {
          console.log({ err });
          return res.status(403).json({ message: 'Forbidden', error: err });
        });
    } else {
      next();
      // return res.status(401).json({ message: 'Unauthorized' });
    }
  };
  

  app.use(
    cors(),
    authorizationJWT,
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { uid: res.locals.uid };
      },
    })
  );

mongoose.set('strictQuery', false);
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(async()=>{
    console.log("Connected to MongoDB")
    await new Promise((resolve)=> httpServer.listen({port: PORT},resolve))
    console.log("Server is running at port 4000")
})

