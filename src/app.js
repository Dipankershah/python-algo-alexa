import { AlexaPlatform } from '@jovotech/platform-alexa';
import { App } from '@jovotech/framework';
import { GlobalComponent } from './components/GlobalComponent';
import { YesNoFirstComponent } from './components/YesNoFirstComponent';
import { YesNoCheckerComponent } from './components/YesNoCheckerComponent';
import { DynamoDb } from '@jovotech/db-dynamodb';
import { FileDb } from '@jovotech/db-filedb';

/*
|--------------------------------------------------------------------------
| APP CONFIGURATION
|--------------------------------------------------------------------------
|
| All relevant components, plugins, and configurations for your Jovo app
| Learn more here: www.jovo.tech/docs/app-config
|
*/
const app = new App({

  /*
  |--------------------------------------------------------------------------
  | Components
  |--------------------------------------------------------------------------
  |
  | Components contain the Jovo app logic
  | Learn more here: www.jovo.tech/docs/components
  |
  */
  components: [GlobalComponent, YesNoFirstComponent,YesNoCheckerComponent],

  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  |
  | Includes platforms, database integrations, third-party plugins, and more
  | Learn more here: www.jovo.tech/docs/plugins, www.jovo.tech/marketplace
  |
  */
  plugins: [
    // Add Jovo plugins here
		new AlexaPlatform({
      intentMap: {
        'AMAZON.YesIntent': 'YesIntent',
        'AMAZON.NoIntent': 'NoIntent',
        'AMAZON.NextIntent':'NextIntent',
        'AMAZON.PreviousIntent':'PreviousIntent',
        'AMAZON.StartOverIntent':'StartOverIntent'
      }
    }),
    new FileDb({
      pathToFile: '../db/db.json',
    }),
  ],

  /*
  |--------------------------------------------------------------------------
  | Other options
  |--------------------------------------------------------------------------
  |
  | Includes all other configuration options like logging
  | Learn more here: www.jovo.tech/docs/app-config
  |
  */
  logging: true,
});

module.exports = {
  app,
};
