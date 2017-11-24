module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Ivyflow Starter',
    titleTemplate: 'Ivyflow Starter - %s',
    meta: [
      {
        name: 'description',
        content: 'The universal starter.',
      },
    ],
  },
};
