import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(process.env.SUPABASE_URL + '/graphql/v1', {
  headers: {
    apikey: process.env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`
  }
});

const query = gql`
  {
    __schema {
      mutationType {
        fields {
          name
        }
      }
    }
  }
`;

client.request(query)
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch((e) => console.error(JSON.stringify(e, null, 2)));
