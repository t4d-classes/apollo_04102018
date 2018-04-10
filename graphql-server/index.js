import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';

export const schema = makeExecutableSchema({
    typeDefs, resolvers,
});

const PORT = 3030;
const ORIGIN_CLIENT_URL = 'http://localhost:3000';
const REST_SERVER_URL = 'http://localhost:3040';


const context = {
    restURL: REST_SERVER_URL,
};

const app = express();
app.use(cors({ origin: ORIGIN_CLIENT_URL }));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql', context }));

app.listen(PORT);