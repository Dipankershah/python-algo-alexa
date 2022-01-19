import { BaseComponent, Component, Global } from '@jovotech/framework';
import { YesNoFirstComponent } from './YesNoFirstComponent';

/*
|--------------------------------------------------------------------------
| Global Component
|--------------------------------------------------------------------------
|
| The global component handlers can be reached from anywhere in the app
| Learn more here: www.jovo.tech/docs/components#global-components
|
*/
@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH() {
    this.$user.data.dynomdbArray  = []
    return this.$redirect(YesNoFirstComponent);
  }
}
