import graphqlHTTP from 'express-graphql';
import { compileSchema } from 'typegql';
import { SchemaV1 } from './SchemaV1'

const schema = compileSchema({roots: [SchemaV1]});

export default graphqlHTTP({
    schema:schema,
    graphiql: true,
    
});