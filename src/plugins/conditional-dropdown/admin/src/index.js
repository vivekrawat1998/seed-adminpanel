// import { getTranslation } from './utils/getTranslation';
// import { PLUGIN_ID } from './pluginId';
// import { Initializer } from './components/Initializer';
// import { PluginIcon } from './components/PluginIcon';

// export default {
//   register(app) {
//     app.addMenuLink({
//       to: `plugins/${PluginIcon}`,
//       icon: PluginIcon,
//       intlLabel: {
//         id: `${PLUGIN_ID}.plugin.name`,
//         defaultMessage: PLUGIN_ID,
//       },
//       Component: async () => {
//         const { App } = await import('./pages/App');

//         return App;
//       },
//     });

//     app.registerPlugin({
//       id: PLUGIN_ID,
//       initializer: Initializer,
//       isReady: false,
//       name: PLUGIN_ID,
//     });
//   },

//   async registerTrads({ locales }) {
//     return Promise.all(
//       locales.map(async (locale) => {
//         try {
//           const { default: data } = await import(`./translations/${locale}.json`);

//           return { data, locale };
//         } catch {
//           return { data: {}, locale };
//         }
//       })
//     );
//   },
// };
// src/plugins/conditional-dropdown/admin/src/index.js
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import ConditionalDropdown from './components/ConditionalDropdown';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: 'conditional-dropdown',
      pluginId: 'conditional-dropdown',
      type: 'string',
      intlLabel: {
        id: 'conditional-dropdown.label',
        defaultMessage: 'Conditional Dropdown',
      },
      intlDescription: {
        id: 'conditional-dropdown.description',
        defaultMessage: 'A dropdown that filters subcategories based on category selection',
      },
      components: {
        Input: ConditionalDropdown,
      },
      options: {
        // Optional: Add any configuration options
      },
    });
  },

  bootstrap(app) {},

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
