import { BaseComponent, Component, Global, Handle, Intents } from '@jovotech/framework';

import { YesNoOutput } from '../output/YesNoOutput';
import { YesNoCheckerComponent } from './YesNoCheckerComponent';

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
export class YesNoFirstComponent extends BaseComponent {
  async START() {
    this.$session.data.step = 1
    this.$delegate(YesNoCheckerComponent,{
      resolve : {
        yes: this.onFirstYes,
        no: this.onFirstNO
      }
    })
    console.log({
      step: this.$session.data.step,
      alexaResponse: 'Is there a X1? Yes or No',
      userResponse: '',
      timestampe: Date.now()
    })
    var dynomdbArray = await this.$user.data.dynomdbArray || []
    dynomdbArray.push({
      step: this.$session.data.step,
      alexaResponse: 'Is there a X1? Yes or No',
      userResponse: '',
      timestampe: Date.now()
    })
    this.$user.data.dynomdbArray = dynomdbArray
    return this.$send({message: 'Is there a X1? Yes or No' });
  }

  async START_WITH_MESSAGE(message) {
    this.$session.data.step = 1
    this.$delegate(YesNoCheckerComponent,{
      resolve : {
        yes: this.onFirstYes,
        no: this.onFirstNO
      }
    })
    console.log({
      step: this.$session.data.step,
      alexaResponse: 'Is there a X1? Yes or No',
      userResponse: '',
      timestampe: Date.now()
    })
    var dynomdbArray = await this.$user.data.dynomdbArray || []
    dynomdbArray.push({
      step: this.$session.data.step,
      alexaResponse: 'Is there a X1? Yes or No',
      userResponse: '',
      timestampe: Date.now()
    })
    this.$user.data.dynomdbArray = dynomdbArray
    return this.$send({message: message+'<break time="5s"/> Is there a X1? Yes or No' });
  }


  async onFirstYes(){
    console.log({
      step: this.$session.data.step,
      alexaResponse: 'Go to X3.',
      userResponse: 'Yes',
      timestampe: Date.now()
    })
    var dynomdbArray = await this.$user.data.dynomdbArray || []
    dynomdbArray.push({
      step: this.$session.data.step,
      alexaResponse: 'Go to X3.',
      userResponse: 'Yes',
      timestampe: Date.now()
    })
    this.$user.data.dynomdbArray = dynomdbArray
    return this.$send({message: 'Go to X3.', listen: false});
  }

  async onFirstNO(){
    this.$session.data.step = 2
    this.$delegate(YesNoCheckerComponent,{
      resolve : {
        yes: this.onSecYes,
        no: this.onSecNO
      }
    })
    console.log({
      step: this.$session.data.step,
      alexaResponse: 'Begin X2 as soon as possible! <break time="1s"/> Any X4? Yes or No',
      userResponse: 'No',
      timestampe: Date.now()
    })
    var dynomdbArray = await this.$user.data.dynomdbArray || []
    dynomdbArray.push({
      step: this.$session.data.step,
      alexaResponse: 'Begin X2 as soon as possible! <break time="1s"/> Any X4? Yes or No',
      userResponse: 'No',
      timestampe: Date.now()
    })
    this.$user.data.dynomdbArray = dynomdbArray
    return this.$send({message: 'Begin X2 as soon as possible! <break time="1s"/> Any X4? Yes or No' });
  }

  async onSecYes(){
    this.$session.data.step = 3
    console.log({
      step: this.$session.data.step,
      alexaResponse: 'Do X5 once and resume X2 immediately for 5 seconds!',
      userResponse: 'Yes',
      timestampe: Date.now()
    })
    var dynomdbArray = await this.$user.data.dynomdbArray || []
    dynomdbArray.push({
      step: this.$session.data.step,
      alexaResponse: 'Do X5 once and resume X2 immediately for 5 seconds!',
      userResponse: 'Yes',
      timestampe: Date.now()
    })
    this.$user.data.dynomdbArray = dynomdbArray
    // await sleep(5000);
    return this.START_WITH_MESSAGE("Do X5 once and resume X2 immediately for 5 seconds!");
  }

  async onSecNO(){
    this.$session.data.step = 3
    console.log({
      step: this.$session.data.step,
      alexaResponse: 'Begin X2 as soon as possible!',
      userResponse: 'No',
      timestampe: Date.now()
    })
    var dynomdbArray = await this.$user.data.dynomdbArray || []
    dynomdbArray.push({
      step: this.$session.data.step,
      alexaResponse: 'Begin X2 as soon as possible!',
      userResponse: 'No',
      timestampe: Date.now()
    })
    // await sleep(5000);
    // return this.onFirstNO();
    this.$session.data.step = 2
    this.$delegate(YesNoCheckerComponent,{
      resolve : {
        yes: this.onSecYes,
        no: this.onSecNO
      }
    })
    console.log({
      step: this.$session.data.step,
      alexaResponse: 'Any X4? Yes or No',
      userResponse: 'No',
      timestampe: Date.now()
    })
    // var dynomdbArray = await this.$user.data.dynomdbArray || []
    dynomdbArray.push({
      step: this.$session.data.step,
      alexaResponse: 'Any X4? Yes or No',
      userResponse: 'No',
      timestampe: Date.now()
    })
    this.$user.data.dynomdbArray = dynomdbArray
    return this.$send({message: `Resume X2 immediately for 5 seconds! <break time="5s"/> Any X4? Yes or No?`})
  }

  @Handle({
    global: true,
    intents: ['GoToStep'],
    prioritizedOverUnhandled: true
  })
  async step(){
    var number = this.$alexa.$entities.number?.resolved

    return await this.redirectToSteps(number)

    // if(number==1){
    //   return this.START();
    // }
    // else if(number==2){
    //   this.onFirstNO()
    // }
    // else if(number==3){
    //   return this.$send({message: 'You are in step 3. What should i do?' });
    // }
    // else{
    //   return this.START();
    // }
  }

 async redirectToSteps(number){
    if(number==1){
      return this.START();
    }
    else if(number==2){
      return this.onFirstNO()
    }
    else if(number==3){
      this.$delegate(YesNoCheckerComponent,{
        resolve : {
          yes: this.onFirstYes,
          no: this.onFirstNO
        }
      })
      var dynomdbArray = await this.$user.data.dynomdbArray || []
      dynomdbArray.push({
        step: this.$session.data.step,
        alexaResponse: 'You are in step 3. Lets start step 1 again Is there a X1? Yes or No',
        userResponse: 'No',
        timestampe: Date.now()
      })
      this.$user.data.dynomdbArray = dynomdbArray
      return this.$send({message: 'You are in step 3. Lets start step 1 again Is there a X1? Yes or No' });
    }
    else{
      return this.START();
    }
  }

  @Handle({
    global: true,
    intents: ['StartOverIntent'],
    prioritizedOverUnhandled: true
  })
  async startAgain(){
    console.log({
      step: this.$session.data.step,
      alexaResponse: 'start over',
      userResponse: 'start over',
      timestampe: Date.now()
    })
    var dynomdbArray = await this.$user.data.dynomdbArray || []
    dynomdbArray.push({
      step: this.$session.data.step,
      alexaResponse: 'start over',
      userResponse: 'start over',
      timestampe: Date.now()
    })
    this.$user.data.dynomdbArray = dynomdbArray
    return this.START()
  }


  @Handle({
    global: true,
    intents: ['PreviousIntent'],
    prioritizedOverUnhandled: true
  })
  async prev(){
    console.log({
      step: this.$session.data.step,
      alexaResponse: 'previous..',
      userResponse: 'previous',
      timestampe: Date.now()
    })
    var dynomdbArray = await this.$user.data.dynomdbArray || []
    dynomdbArray.push({
      step: this.$session.data.step,
      alexaResponse: 'previous..',
      userResponse: 'previous',
      timestampe: Date.now()
    })
    this.$user.data.dynomdbArray = dynomdbArray
    if(this.$session.data.step==1){
      return this.START()
    }
    else{
      this.$session.data.step = this.$session.data.step-1
      return await this.redirectToSteps(this.$session.data.step-1)
    }
    
  }

  @Handle({
    global: true,
    intents: ['NextIntent'],
    prioritizedOverUnhandled: true
  })
  async next(){
    console.log('next')
    console.log({
      step: this.$session.data.step,
      alexaResponse: 'nexting..',
      userResponse: 'next',
      timestampe: Date.now()
    })
    var dynomdbArray = await this.$user.data.dynomdbArray || []
    dynomdbArray.push({
      step: this.$session.data.step,
      alexaResponse: 'nexting...',
      userResponse: 'next',
      timestampe: Date.now()
    })
    this.$user.data.dynomdbArray = dynomdbArray
    this.$session.data.step = this.$session.data.step+1
    await this.redirectToSteps(this.$session.data.step+1)
  }

  UNHANDLED() {
    return this.START();
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
