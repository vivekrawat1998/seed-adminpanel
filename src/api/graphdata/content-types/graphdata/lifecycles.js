const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

module.exports = {
    async beforeCreate(event) {
        try {
            const data = event.params.data;
            console.log("🚀 BEFORE CREATE");

            data.parseddata = [];

            if (!data.data) {
                console.log("❌ No media field found");
                return;
            }

            let fileId = null;

            if (Array.isArray(data.data) && data.data[0]?.id) {
                fileId = data.data[0].id;
            } else if (data.data?.id) {
                fileId = data.data.id;
            } else if (data.data?.connect?.[0]?.id) {
                fileId = data.data.connect[0].id;
            }
                        
            if (!fileId) {
                console.log("❌ No file id found in media field", data.data);
                return;
            }

            const file = await strapi.entityService.findOne(
                "plugin::upload.file",
                fileId,
                { fields: ["url", "name"] }
            );

            if (!file?.url) {
                console.log("❌ File URL not found");
                return;
            }

            const filePath = path.join(process.cwd(), "public", file.url);

            console.log("📁 FILE PATH:", filePath);

            if (!fs.existsSync(filePath)) {
                console.log("❌ File not found on disk");
                return;
            }

            const workbook = XLSX.readFile(filePath);
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet).slice(0, 500);

            console.log("📊 PARSED ROWS:", jsonData.length);

            data.parseddata = jsonData;

            console.log("🎉 READY TO SAVE");
        } catch (error) {
            console.error("❌ ERROR:", error);
            event.params.data.parseddata = [];
        }
    },
};