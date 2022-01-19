import { app } from './app';
import { FileDb } from '@jovotech/db-filedb';
import { JovoDebugger } from '@jovotech/plugin-debugger';
import { DynamoDb } from '@jovotech/db-dynamodb';

/*
|--------------------------------------------------------------------------
| STAGE CONFIGURATION
|--------------------------------------------------------------------------
|
| This configuration gets merged into the default app config
| Learn more here: www.jovo.tech/docs/staging
|
*/
app.configure({
  plugins: [
    // new FileDb({
    //   pathToFile: '../db/db.json',
    // }),
    new JovoDebugger(),
    new DynamoDb({
      table: {
        name: 'MyDynamoDbTable-Paython-Algo',
      },
      libraryConfig: {
        dynamoDbClient: {
          region: 'us-east-1',
          credentials: {
            accessKeyId: 'AKIAZS3VGLD5VN7GFUPR',
            secretAccessKey: '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',
          },
        },
      }
    }),
  ],
});

export * from './server.express';
