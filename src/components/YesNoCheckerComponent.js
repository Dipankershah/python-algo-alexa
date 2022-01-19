import { BaseComponent, Component, Intents } from '@jovotech/framework';

import { YesNoOutput } from '../output/YesNoOutput';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/
@Component()
export class YesNoCheckerComponent extends BaseComponent {
  START() {
    // return this.$send({message: 'Is there a X1? Yes or No' });
  }

  @Intents('YesIntent')
  async yes() {
    await this.$resolve('yes')
  }

  @Intents('NoIntent')
  async no() {
    await this.$resolve('no')
  }

  UNHANDLED() {
    return this.START();
  }
}
