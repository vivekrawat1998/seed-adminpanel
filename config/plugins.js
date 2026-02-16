
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET_NAME'),
          },
        },
      },
      defaultDepth: 5,
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  // Add the HTML sanitizer configuration for rich text editor
  'content-manager': {
    config: {
      contentTypes: {
        'api::article.article': { // Your content type
          attributes: {
            blocks: { // Dynamic Zone field name
              components: {
                'shared.rich-text': { // Component name within Dynamic Zone
                  sanitization: {
                    allowedTags: ['div', 'span', 'p', 'a', 'strong', 'em', 'ul', 'li', 'ol', 'br'], // Tags you want to allow
                    allowedAttributes: {
                      '*': ['class', 'id', 'style'], // Allow class, id, style attributes
                      'a': ['href', 'target', 'rel'], // Allow specific attributes for <a> tags
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  'tree-menus': {
    config: {
      fieldSchema: {
        attributes: [
          {
            id: 'title',
            label: 'Title',
            placeholder: 'Enter item title',
            type: 'text',
            validationType: 'string',
            value: 'New items',
            required: true,
            validations: [
              { type: 'required', params: ['this field is required'] },
              { type: 'max', params: [100, 'Title cannot be more than 100 characters'] },
              { type: 'default', params: ['New items'] },
            ],
          },
          {
            id: 'url',
            label: 'Url',
            placeholder: 'Enter url',
            type: 'text',
            validationType: 'string',
            value: '/',
            required: true,
            validations: [
              { type: 'required', params: ['this field is required'] },
              { type: 'max', params: [200, 'Url cannot be more than 200 characters'] },
              { type: 'default', params: ['/'] },
            ],
          },
          {
            id: 'target',
            label: 'Target',
            placeholder: 'Enter target',
            type: 'select',
            validationType: 'mixed',
            value: '_self',
            required: true,
            validations: [
              {
                type: 'oneOf', params: [
                  ['_blank', '_parent', '_self', '_top'],
                  'this field needs to be one of the following: _blank, _parent, _self, _top',
                ]
              },
              { type: 'default', params: ['_self'] },
            ],
            options: [
              { key: '_blank', value: '_blank' },
              { key: '_parent', value: '_parent' },
              { key: '_self', value: '_self' },
              { key: '_top', value: '_top' },
            ],
          },
          {
            id: 'isProtected',
            label: 'isProtected',
            placeholder: 'Choose isProtected',
            type: 'bool',
            validationType: 'boolean',
            value: false,
            required: true,
            validations: [
              { type: 'required', params: ['Need to choose isProtected'] },
              { type: 'default', params: [false] },
            ],
          },
        ],
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_USERNAME'),
        defaultReplyTo: env('SMTP_USERNAME'),
      },
    },
  },

});
