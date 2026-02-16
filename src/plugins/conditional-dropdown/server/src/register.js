// const register = ({ strapi }) => {
//   // register phase
// };

// export default register;
// src/plugins/conditional-dropdown/server/register.js
'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'conditional-dropdown',
    plugin: 'conditional-dropdown', 
    type: 'string',
    inputSize: {
      default: 6,
      isResizable: true,
    },
  });
};
