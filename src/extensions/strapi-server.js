module.exports = (plugin) => {
    plugin.services.preview.getPreviewUrl = async () => {
        return null;
    };

    return plugin;
};

module.exports = (plugin) => {

    const originalRegister = plugin.controllers.auth.register;

    plugin.controllers.auth.register = async (ctx) => {

        // ⭐ Save extra fields first
        const extraFields = {
            userType: ctx.request.body.userType || "user",
            Approval: false,
        };

        // ⭐ REMOVE extra fields from body BEFORE register
        delete ctx.request.body.userType;
        delete ctx.request.body.Approval;

        // ⭐ Call original register
        await originalRegister(ctx);

        // ⭐ Update user AFTER created
        if (ctx.body?.user) {

            const userId = ctx.body.user.id;

            await strapi.entityService.update(
                "plugin::users-permissions.user",
                userId,
                {
                    data: extraFields,
                }
            );

            ctx.body.user.userType = extraFields.userType;
            ctx.body.user.Approval = false;
        }
    };

    return plugin;
};


module.exports = ({ strapi }) => {
    return {
        controllers: {
            auth: {
                async register(ctx) {
                    const { username, email, password, userType, name } = ctx.request.body;

                    // optional: your validation here

                    // Create user including extra fields
                    const user = await strapi.entityService.create('plugin::users-permissions.user', {
                        data: { username, email, password, userType, name }
                    });

                    // Issue JWT
                    const jwt = strapi.plugin('users-permissions').service('jwt').issue({ id: user.id });

                    // sanitize user before returning if needed
                    ctx.body = { jwt, user };
                }
            }
        }
    };
};

