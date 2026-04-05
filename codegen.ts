import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      [`${import.meta.env.VITE_SUPABASE_URL}/graphql/v1`]: {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
        },
      },
    },
  ],
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/gql/**/*'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: ['typescript'],
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  },
};

export default config;
