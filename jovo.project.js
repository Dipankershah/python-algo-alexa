const { AlexaCli } = require('@jovotech/platform-alexa');
const { ProjectConfig } = require('@jovotech/cli-core');

/*
  |--------------------------------------------------------------------------
  | JOVO PROJECT CONFIGURATION
  |--------------------------------------------------------------------------
  |
  | Information used by the Jovo CLI to build and deploy projects
  | Learn more here: www.jovo.tech/docs/project-config
  |
  */

const project = new ProjectConfig({
  endpoint: '${JOVO_WEBHOOK_URL}',
  plugins: [
    // Add Jovo CLI plugins here
		new AlexaCli({
      skillId: 'amzn1.ask.skill.7dae0ba4-645e-49b3-a450-ba738f25dd0c',
      locales: {
        en: ['en-US', 'en-GB','en-AU','en-IN'],
      },
      askProfile: 'Black-Dev',
		  conversations: {
		    enabled: false,
		    directory: 'resources/alexa/conversations',
		    sessionStartDelegationStrategy: { target: 'skill' },
		    acdlDirectory: 'acdl',
		    responsesDirectory: 'responses',
		    skipValidation: false
		  }
		}),
  ],
});


module.exports = project;
