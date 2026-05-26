const { cmd, commands } = require('../inconnuboy');
const config = require('../config');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "source"],
    desc: "Get bot source code and repository link",
    category: "main",
    react: "📁",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let repoText = `*╭────⬡ ${config.BOT_NAME} ⬡────⭓*
*├▢ 📂 Repository:* KAMRAN-MD
*├▢ 👨‍💻 Owner:* ${config.OWNER_NAME}
*├▢ 🏷️ Version:* 9.0.0 Beta
*├▢ 🚀 Deploy:* Heroku
*╰─────────────────⭓*

*╭────⬡ LINKS ⬡────*
*├▢ 🔗 Repo:* https://github.com/KAMRAN-SMD/KAMRAN-MD
*├▢ 🌐 Web:* https://mini-new-be5c479a3e61.herokuapp.com/
*├▢ 👥 Group:* https://chat.whatsapp.com/INp0Pyf5KH3EqvzR7Mxxr4
*╰────────────────*

> *© Powered by DR KAMRAN*`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || 'https://i.ibb.co/yFwFN983/IMG-20260509-WA0045.jpg' },
            caption: repoText,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363418144382782@newsletter',
                    newsletterName: config.BOT_NAME,
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

