// commands/otp.js
const { cmd } = require("../inconnuboy");
const axios = require("axios");

// ========== CONFIGURATION ==========
const OTP_API = "https://silver-all-api.vercel.app/api?path=liveotp&panel=all";
const CHANNEL = "120363424430020226@newsletter";
const CHANNEL_LINK = "*https://whatsapp.com/channel/0029VbD1PET5vKA4AtaxWn0V*";
const CHANNEL_LINK1 = "*https://whatsapp.com/channel/0029Vb7f96Q30LKGegqiCz33*"

// ========== RUNNING STATUS ==========
let running = false;
let sent = new Set();

// ========== PANEL EMOJIS ==========
const panelEmoji = {
    'timesms': '⏰',
    'flex': '🔧',
    'lamix': '🔥',
    'ins': '📡',
    'pscall': '📞'
};

// ========== HELPER FUNCTIONS ==========
function getCountry(num) {
    if(num.startsWith("1")) return "🇺🇸 USA / 🇨🇦 Canada"
if(num.startsWith("7")) return "🇷🇺 Russia / 🇰🇿 Kazakhstan"
if(num.startsWith("20")) return "🇪🇬 Egypt"
if(num.startsWith("27")) return "🇿🇦 South Africa"
if(num.startsWith("30")) return "🇬🇷 Greece"
if(num.startsWith("31")) return "🇳🇱 Netherlands"
if(num.startsWith("32")) return "🇧🇪 Belgium"
if(num.startsWith("33")) return "🇫🇷 France"
if(num.startsWith("34")) return "🇪🇸 Spain"
if(num.startsWith("36")) return "🇭🇺 Hungary"
if(num.startsWith("39")) return "🇮🇹 Italy"
if(num.startsWith("40")) return "🇷🇴 Romania"
if(num.startsWith("41")) return "🇨🇭 Switzerland"
if(num.startsWith("43")) return "🇦🇹 Austria"
if(num.startsWith("44")) return "🇬🇧 United Kingdom"
if(num.startsWith("45")) return "🇩🇰 Denmark"
if(num.startsWith("46")) return "🇸🇪 Sweden"
if(num.startsWith("47")) return "🇳🇴 Norway"
if(num.startsWith("48")) return "🇵🇱 Poland"
if(num.startsWith("49")) return "🇩🇪 Germany"
if(num.startsWith("51")) return "🇵🇪 Peru"
if(num.startsWith("52")) return "🇲🇽 Mexico"
if(num.startsWith("53")) return "🇨🇺 Cuba"
if(num.startsWith("54")) return "🇦🇷 Argentina"
if(num.startsWith("55")) return "🇧🇷 Brazil"
if(num.startsWith("56")) return "🇨🇱 Chile"
if(num.startsWith("57")) return "🇨🇴 Colombia"
if(num.startsWith("58")) return "🇻🇪 Venezuela"
if(num.startsWith("60")) return "🇲🇾 Malaysia"
if(num.startsWith("61")) return "🇦🇺 Australia"
if(num.startsWith("62")) return "🇮🇩 Indonesia"
if(num.startsWith("63")) return "🇵🇭 Philippines"
if(num.startsWith("64")) return "🇳🇿 New Zealand"
if(num.startsWith("65")) return "🇸🇬 Singapore"
if(num.startsWith("66")) return "🇹🇭 Thailand"
if(num.startsWith("81")) return "🇯🇵 Japan"
if(num.startsWith("82")) return "🇰🇷 South Korea"
if(num.startsWith("84")) return "🇻🇳 Vietnam"
if(num.startsWith("86")) return "🇨🇳 China"
if(num.startsWith("90")) return "🇹🇷 Turkey"
if(num.startsWith("91")) return "🇮🇳 India"
if(num.startsWith("92")) return "🇵🇰 Pakistan"
if(num.startsWith("93")) return "🇦🇫 Afghanistan"
if(num.startsWith("94")) return "🇱🇰 Sri Lanka"
if(num.startsWith("95")) return "🇲🇲 Myanmar"
if(num.startsWith("98")) return "🇮🇷 Iran"
if(num.startsWith("211")) return "🇸🇸 South Sudan"
if(num.startsWith("212")) return "🇲🇦 Morocco"
if(num.startsWith("213")) return "🇩🇿 Algeria"
if(num.startsWith("216")) return "🇹🇳 Tunisia"
if(num.startsWith("218")) return "🇱🇾 Libya"
if(num.startsWith("220")) return "🇬🇲 Gambia"
if(num.startsWith("221")) return "🇸🇳 Senegal"
if(num.startsWith("222")) return "🇲🇷 Mauritania"
if(num.startsWith("223")) return "🇲🇱 Mali"
if(num.startsWith("224")) return "🇬🇳 Guinea"
if(num.startsWith("225")) return "🇨🇮 Ivory Coast"
if(num.startsWith("226")) return "🇧🇫 Burkina Faso"
if(num.startsWith("227")) return "🇳🇪 Niger"
if(num.startsWith("228")) return "🇹🇬 Togo"
if(num.startsWith("229")) return "🇧🇯 Benin"
if(num.startsWith("230")) return "🇲🇺 Mauritius"
if(num.startsWith("231")) return "🇱🇷 Liberia"
if(num.startsWith("232")) return "🇸🇱 Sierra Leone"
if(num.startsWith("233")) return "🇬🇭 Ghana"
if(num.startsWith("234")) return "🇳🇬 Nigeria"
if(num.startsWith("235")) return "🇹🇩 Chad"
if(num.startsWith("236")) return "🇨🇫 Central African Republic"
if(num.startsWith("237")) return "🇨🇲 Cameroon"
if(num.startsWith("238")) return "🇨🇻 Cape Verde"
if(num.startsWith("239")) return "🇸🇹 São Tomé & Príncipe"
if(num.startsWith("240")) return "🇬🇶 Equatorial Guinea"
if(num.startsWith("241")) return "🇬🇦 Gabon"
if(num.startsWith("242")) return "🇨🇬 Republic of the Congo"
if(num.startsWith("243")) return "🇨🇩 DR Congo"
if(num.startsWith("244")) return "🇦🇴 Angola"
if(num.startsWith("245")) return "🇬🇼 Guinea-Bissau"
if(num.startsWith("246")) return "🇮🇴 British Indian Ocean Territory"
if(num.startsWith("248")) return "🇸🇨 Seychelles"
if(num.startsWith("249")) return "🇸🇩 Sudan"

if(num.startsWith("250")) return "🇷🇼 Rwanda"
if(num.startsWith("251")) return "🇪🇹 Ethiopia"
if(num.startsWith("252")) return "🇸🇴 Somalia"
if(num.startsWith("253")) return "🇩🇯 Djibouti"
if(num.startsWith("254")) return "🇰🇪 Kenya"
if(num.startsWith("255")) return "🇹🇿 Tanzania"
if(num.startsWith("256")) return "🇺🇬 Uganda"
if(num.startsWith("257")) return "🇧🇮 Burundi"
if(num.startsWith("258")) return "🇲🇿 Mozambique"
if(num.startsWith("260")) return "🇿🇲 Zambia"
if(num.startsWith("261")) return "🇲🇬 Madagascar"
if(num.startsWith("262")) return "🇷🇪 Réunion"
if(num.startsWith("263")) return "🇿🇼 Zimbabwe"
if(num.startsWith("264")) return "🇳🇦 Namibia"
if(num.startsWith("265")) return "🇲🇼 Malawi"
if(num.startsWith("266")) return "🇱🇸 Lesotho"
if(num.startsWith("267")) return "🇧🇼 Botswana"
if(num.startsWith("268")) return "🇸🇿 Eswatini"
if(num.startsWith("269")) return "🇰🇲 Comoros"

if(num.startsWith("960")) return "🇲🇻 Maldives"
if(num.startsWith("961")) return "🇱🇧 Lebanon"
if(num.startsWith("962")) return "🇯🇴 Jordan"
if(num.startsWith("963")) return "🇸🇾 Syria"
if(num.startsWith("964")) return "🇮🇶 Iraq"
if(num.startsWith("965")) return "🇰🇼 Kuwait"
if(num.startsWith("966")) return "🇸🇦 Saudi Arabia"
if(num.startsWith("967")) return "🇾🇪 Yemen"
if(num.startsWith("968")) return "🇴🇲 Oman"
if(num.startsWith("970")) return "🇵🇸 Palestine"
if(num.startsWith("971")) return "🇦🇪 UAE"
if(num.startsWith("972")) return "🇮🇱 Israel"
if(num.startsWith("973")) return "🇧🇭 Bahrain"
if(num.startsWith("974")) return "🇶🇦 Qatar"
if(num.startsWith("975")) return "🇧🇹 Bhutan"
if(num.startsWith("976")) return "🇲🇳 Mongolia"
if(num.startsWith("977")) return "🇳🇵 Nepal"
if(num.startsWith("992")) return "🇹🇯 Tajikistan"
if(num.startsWith("993")) return "🇹🇲 Turkmenistan"
if(num.startsWith("994")) return "🇦🇿 Azerbaijan"
if(num.startsWith("995")) return "🇬🇪 Georgia"
if(num.startsWith("996")) return "🇰🇬 Kyrgyzstan"
if(num.startsWith("998")) return "🇺🇿 Uzbekistan"
if(num.startsWith("1242")) return "🇧🇸 Bahamas"
if(num.startsWith("1246")) return "🇧🇧 Barbados"
if(num.startsWith("1264")) return "🇦🇮 Anguilla"
if(num.startsWith("1268")) return "🇦🇬 Antigua & Barbuda"
if(num.startsWith("1284")) return "🇻🇬 British Virgin Islands"
if(num.startsWith("1340")) return "🇻🇮 U.S. Virgin Islands"
if(num.startsWith("1345")) return "🇰🇾 Cayman Islands"
if(num.startsWith("1441")) return "🇧🇲 Bermuda"
if(num.startsWith("1473")) return "🇬🇩 Grenada"
if(num.startsWith("1649")) return "🇹🇨 Turks & Caicos Islands"
if(num.startsWith("1664")) return "🇲🇸 Montserrat"
if(num.startsWith("1670")) return "🇲🇵 Northern Mariana Islands"
if(num.startsWith("1671")) return "🇬🇺 Guam"
if(num.startsWith("1684")) return "🇦🇸 American Samoa"
if(num.startsWith("1758")) return "🇱🇨 Saint Lucia"
if(num.startsWith("1767")) return "🇩🇲 Dominica"
if(num.startsWith("1784")) return "🇻🇨 Saint Vincent & the Grenadines"
if(num.startsWith("1787")) return "🇵🇷 Puerto Rico"
if(num.startsWith("1809")) return "🇩🇴 Dominican Republic"
if(num.startsWith("1829")) return "🇩🇴 Dominican Republic"
if(num.startsWith("1849")) return "🇩🇴 Dominican Republic"
if(num.startsWith("1868")) return "🇹🇹 Trinidad & Tobago"
if(num.startsWith("1869")) return "🇰🇳 Saint Kitts & Nevis"
if(num.startsWith("1876")) return "🇯🇲 Jamaica"

if(num.startsWith("297")) return "🇦🇼 Aruba"
if(num.startsWith("298")) return "🇫🇴 Faroe Islands"
if(num.startsWith("299")) return "🇬🇱 Greenland"

if(num.startsWith("350")) return "🇬🇮 Gibraltar"
if(num.startsWith("351")) return "🇵🇹 Portugal"
if(num.startsWith("352")) return "🇱🇺 Luxembourg"
if(num.startsWith("353")) return "🇮🇪 Ireland"
if(num.startsWith("354")) return "🇮🇸 Iceland"
if(num.startsWith("355")) return "🇦🇱 Albania"
if(num.startsWith("356")) return "🇲🇹 Malta"
if(num.startsWith("357")) return "🇨🇾 Cyprus"
if(num.startsWith("358")) return "🇫🇮 Finland"
if(num.startsWith("359")) return "🇧🇬 Bulgaria"

if(num.startsWith("370")) return "🇱🇹 Lithuania"
if(num.startsWith("371")) return "🇱🇻 Latvia"
if(num.startsWith("372")) return "🇪🇪 Estonia"
if(num.startsWith("373")) return "🇲🇩 Moldova"
if(num.startsWith("374")) return "🇦🇲 Armenia"
if(num.startsWith("375")) return "🇧🇾 Belarus"
if(num.startsWith("376")) return "🇦🇩 Andorra"
if(num.startsWith("377")) return "🇲🇨 Monaco"
if(num.startsWith("378")) return "🇸🇲 San Marino"
if(num.startsWith("380")) return "🇺🇦 Ukraine"
if(num.startsWith("381")) return "🇷🇸 Serbia"
if(num.startsWith("382")) return "🇲🇪 Montenegro"
if(num.startsWith("383")) return "🇽🇰 Kosovo"
if(num.startsWith("385")) return "🇭🇷 Croatia"
if(num.startsWith("386")) return "🇸🇮 Slovenia"
if(num.startsWith("387")) return "🇧🇦 Bosnia & Herzegovina"
if(num.startsWith("389")) return "🇲🇰 North Macedonia"
if(num.startsWith("500")) return "🇫🇰 Falkland Islands"
if(num.startsWith("501")) return "🇧🇿 Belize"
if(num.startsWith("502")) return "🇬🇹 Guatemala"
if(num.startsWith("503")) return "🇸🇻 El Salvador"
if(num.startsWith("504")) return "🇭🇳 Honduras"
if(num.startsWith("505")) return "🇳🇮 Nicaragua"
if(num.startsWith("506")) return "🇨🇷 Costa Rica"
if(num.startsWith("507")) return "🇵🇦 Panama"
if(num.startsWith("508")) return "🇵🇲 Saint Pierre & Miquelon"
if(num.startsWith("509")) return "🇭🇹 Haiti"

if(num.startsWith("590")) return "🇬🇵 Guadeloupe"
if(num.startsWith("591")) return "🇧🇴 Bolivia"
if(num.startsWith("592")) return "🇬🇾 Guyana"
if(num.startsWith("593")) return "🇪🇨 Ecuador"
if(num.startsWith("594")) return "🇬🇫 French Guiana"
if(num.startsWith("595")) return "🇵🇾 Paraguay"
if(num.startsWith("596")) return "🇲🇶 Martinique"
if(num.startsWith("597")) return "🇸🇷 Suriname"
if(num.startsWith("598")) return "🇺🇾 Uruguay"
if(num.startsWith("599")) return "🇨🇼 Curaçao"

if(num.startsWith("670")) return "🇹🇱 Timor-Leste"
if(num.startsWith("672")) return "🇦🇶 Antarctica"
if(num.startsWith("673")) return "🇧🇳 Brunei"
if(num.startsWith("674")) return "🇳🇷 Nauru"
if(num.startsWith("675")) return "🇵🇬 Papua New Guinea"
if(num.startsWith("676")) return "🇹🇴 Tonga"
if(num.startsWith("677")) return "🇸🇧 Solomon Islands"
if(num.startsWith("678")) return "🇻🇺 Vanuatu"
if(num.startsWith("679")) return "🇫🇯 Fiji"
if(num.startsWith("680")) return "🇵🇼 Palau"
if(num.startsWith("681")) return "🇼🇫 Wallis & Futuna"
if(num.startsWith("682")) return "🇨🇰 Cook Islands"
if(num.startsWith("683")) return "🇳🇺 Niue"
if(num.startsWith("685")) return "🇼🇸 Samoa"
if(num.startsWith("686")) return "🇰🇮 Kiribati"
if(num.startsWith("687")) return "🇳🇨 New Caledonia"
if(num.startsWith("688")) return "🇹🇻 Tuvalu"
if(num.startsWith("689")) return "🇵🇫 French Polynesia"
if(num.startsWith("690")) return "🇹🇰 Tokelau"
if(num.startsWith("691")) return "🇫🇲 Micronesia"
if(num.startsWith("692")) return "🇲🇭 Marshall Islands"

if(num.startsWith("850")) return "🇰🇵 North Korea"
if(num.startsWith("852")) return "🇭🇰 Hong Kong"
if(num.startsWith("853")) return "🇲🇴 Macau"
if(num.startsWith("855")) return "🇰🇭 Cambodia"
if(num.startsWith("856")) return "🇱🇦 Laos"
if(num.startsWith("880")) return "🇧🇩 Bangladesh"
if(num.startsWith("886")) return "🇹🇼 Taiwan"

return "🌍 Unknown"
}

function hideNumber(num) {
    const last4 = num.slice(-4);
    return "+" + num.slice(0, 2) + "******" + last4;
}

// ========== START OTP ==========
cmd({
    pattern: "silverotp",
    alias: ["alphatatta", "otpon"],
    desc: "Start OTP forwarding to channel (5 Panels)",
    category: "owner",
    react: "🟢"
}, async (conn, mek, m, { from, reply, isOwner }) => {
    try {
        if (!isOwner) return reply("❌ Owner only!");
        if (running) return reply("⚠️ OTP already running!");

        running = true;
        reply("✅ SILVER OTP Started!\n\n📡 Panels Active:\n• TimeSMS (⏰)\n• Flex (🔧)\n• Lamix (🔥)\n• INS (📡)\n• PSCall (📞)");

        (async () => {
            while (running) {
                try {
                    const { data } = await axios.get(OTP_API, { timeout: 15000 });
                    
                    if (!data.success || !data.result) continue;
                    
                    for (const v of data.result) {
                        const id = v.number + v.otp + v.panel;
                        if (sent.has(id)) continue;

                        const emoji = panelEmoji[v.panel] || '🎛️';
                        
                        const messageText = `╭━━━〔 🔐 NEW OTP ALERT 〕━━━╮
│ 💭 PANEL    :: ${emoji}
│ 🌍 COUNTRY   :: ${getCountry(v.number)}
│ 📱 NUMBER    :: ${hideNumber(v.number)}
│ 📲 SERVICE   :: ${v.service}
│ 🔑 OTP       :: *${v.otp}*
╰━━━━━━━━━━━━━━━━━━━━━━━╯

📢 *📲 NEW NUMBERS LIST ⚡:* ⤵️
${CHANNEL_LINK}
${CHANNEL_LINK1}

> *✦ © SILVER TECH  ✦*`;

                        await conn.sendMessage(CHANNEL, { text: messageText });
                        sent.add(id);
                        setTimeout(() => sent.delete(id), 3600000);
                    }
                } catch (e) {
                    console.log("OTP error:", e.message);
                }
                await new Promise(r => setTimeout(r, 10000));
            }
        })();

    } catch (err) {
        console.error("OTP start error:", err);
        reply("❌ Failed to start OTP.");
        running = false;
    }
});

// ========== STOP OTP ==========
cmd({
    pattern: "silverstop",
    alias: ["alphatataoff"],
    desc: "Stop OTP forwarding",
    category: "owner",
    react: "🔴"
}, async (conn, mek, m, { reply, isOwner }) => {
    try {
        if (!isOwner) return reply("❌ Owner only!");
        if (!running) return reply("⚠️ OTP is not running!");

        running = false;
        reply("🛑 OTP Stopped!");

    } catch (err) {
        console.error("OTP stop error:", err);
        reply("❌ Failed to stop OTP.");
    }
});

// ========== STATUS ==========
cmd({
    pattern: "status",
    alias: ["otpstatus", "silverstatus"],
    desc: "Check OTP forwarding status",
    category: "owner",
    react: "📊"
}, async (conn, mek, m, { reply }) => {
    try {
        const statusMsg = `╭━━〔 📊 OTP STATUS 〕━━┈⊷
┃
┃ STATUS : ${running ? '🟢 RUNNING' : '🔴 STOPPED'}
┃
┃ 📡 PANELS ACTIVE:
┃ • TimeSMS (⏰)
┃ • Flex (🔧)
┃ • Lamix (🔥)
┃ • INS (📡)
┃ • PSCall (📞)
┃
╰━━━━━━━━━━━━━━━━━━━━━┈⊷`;
        
        reply(statusMsg);
    } catch (err) {
        console.error("OTP status error:", err);
        reply("❌ Failed to get status.");
    }
});
