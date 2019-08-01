import { Express } from 'express';
import graphqlRouter from './../api/controllers/graphql/router';

export default function routes(app: Express) {

    app.use('/graphql', graphqlRouter);

}