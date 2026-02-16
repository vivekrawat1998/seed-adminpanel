
// module.exports = [
//   'strapi::errors',
//   'strapi::security',
//   {
//     name: 'strapi::security',
//     config: {
//       contentSecurityPolicy: {
//         useDefaults: true,
//         directives: {
//           'connect-src': ["'self'", 'https:'],
//           'img-src': [
//             "'self'",
//             'data:',
//             'blob:',
//             'https://market-assets.strapi.io',
//             'https://msu-website-all-objects.s3.ap-south-1.amazonaws.com',
//           ],
//           'media-src': [
//             "'self'",
//             'data:',
//             'blob:',
//             'https://msu-website-all-objects.s3.ap-south-1.amazonaws.com',
//           ],
//         },
//       },
//     },
//   },
//   {
//     name: 'strapi::cors',
//     config: {
//       enabled: true,
//       origin: [process.env.CLIENT_SERVER], // ✅ allow your Next.js frontend
//       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//       headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
//       keepHeaderOnError: true,
//     },
//   },
//   'strapi::poweredBy',
//   'strapi::logger',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];


module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://market-assets.strapi.io',
            'https://msu-website-all-objects.s3.ap-south-1.amazonaws.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://msu-website-all-objects.s3.ap-south-1.amazonaws.com',
          ],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [process.env.CLIENT_SERVER],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
