const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID ||"eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUhzcjE1TW5lbUZHZ2NFbFEvS3RMb1RveHV5a1F4dm5JbFpya0RnRnYyWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUXJwMS82SDFZbjVSWU9LZlJDQXUxWTBhNHJ6Sm03cVBPc0VIcXhsR09oST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBRHEzbkZ5TW9lQTE3VjYxYjhmV2NvckZCKzUzYWt3OWxKWTJuQWlSQ1ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsTGJoYjZpaTh5aE44Qy8xMlRQVzJnc0FvK0JHTUdJR2d6ejVzWjVDS2xJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZIUHg0OU56d2tBSkRqV3diK2ROK2tYaVhac241MDdzS1V5S01DSWxRMEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhTZUhabjZrclJsT1QvTzFBR0JHSjd2bzRGWmhwL2gxZEw5eFpQMnhoRWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0tIcEMxTFlGZVVQR1lzOHJjcTFtQmJtS3VLR0RkWURiNmJkeWZaQ1RsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3NCVmhtUnFVdzJOU1VCL3dEWHdNdEl5a3VqRzdheXZ5RzltdzlwS3RIUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVkcEwxbENJWlJ5OXczdmZucFZrRmlWUXFMQ0dSOFNnVnF6RGQvYUQ5NjNnZlBMaFBuMTFiOTdzQm1JRFpyQ1VGWmlyOUhnVUZubThKZWt0eFAvNWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDYsImFkdlNlY3JldEtleSI6Ik9hSStCc1dkSGEzTU5DejZMVlJoeTNzMUtVZ2hicWRKcU1ES1BGMHg2L1U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjNaVHZwZElaVDJHdURJZzNWS2pqVUEiLCJwaG9uZUlkIjoiMjMzNDc4YmUtNmEwMi00ZDNlLTgzNWEtMDg4MTY1NTg3M2M1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5Zcm85ZElJclM4SExuZi8xaUQ0MUtsK0pHZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSQXBUNXVvQnB2S2xZQ001WmlEQzV4Q3Blb0k9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTTk0RjRQNVMiLCJtZSI6eyJpZCI6IjI1NDcwNDgyNTExODo5MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLgvJLgvJLwnZC+8J2RlvCdkZvwnZGU8J2RnfCdkZbwnZGbIOC8kiDwnZGH8J2RnPCdkZ/wnZGf8J2RkvCdkaHwnZGh8J2RnCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1d4blpvR0VMMjNtYlFHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYnRMTzAzWUJNVUwxcUtBQld1Y1k0elU4WTJwbEZpanZEYW54WUc3QWxrMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY2hpenVUVWE4eFdCcUJLSFBWN2liaUFFUUdoT2VZdW1BalUrdm9NdXRTZE9CWTlyTDFQMGlRZ3N3Z0Fjcm82ak1TVHBVRW96MWNpUmt4V3VocEtkRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IlM1VFB1dzAxZFFvYXJKOXVTSU5KTzFya3MxZjVYNFk4Y050bWVVUHJ6bzg3MUlUNXlDWCtTK3NtbU5DZlNVR0hzRmp0ZGZUWFR1R2ozMmdjY3FSb2lnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzA0ODI1MTE4OjkwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlc3U3p0TjJBVEZDOWFpZ0FWcm5HT00xUEdOcVpSWW83dzJwOFdCdXdKWk4ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjAwODEzNTR9" 'bmw',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW_XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/fd124f7e9271111c3bcc1.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
