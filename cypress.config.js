const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      config.env.sharedSecret =
        process.env.NODE_ENV === 'qa' ? 'hoop brick tort' : 'sushi cup lemon'

      return config
    },
  },
})


