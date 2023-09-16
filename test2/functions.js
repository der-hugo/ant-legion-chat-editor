const input = document.getElementById("input");
const colorPattern = /\[\[-]\[-]([a-fA-F0-9]{6})]/g;
const colorWithoutTextPattern = /(\[\[-]\[-][a-fA-F0-9]{6}])(?=\s*\[#\d{2}]|\s*\[\[-]\[-][a-fA-F0-9]{6})/g;
const indexToEmoji = {
    "[#07]": "😀",
    "[#08]": "😭",
    "[#09]": "😌",
    "[#10]": "😵",
    "[#11]": "😋",
    "[#12]": "😂",
    "[#13]": "😄",
    "[#14]": "😫",
    "[#15]": "😁",
    "[#16]": "😃",
    "[#17]": "😰",
    "[#18]": "😢",
    "[#19]": "😳",
    "[#20]": "😤",
    "[#21]": "🌚",
    "[#22]": "😣",
    "[#23]": "😮",
    "[#24]": "😡",
    "[#25]": "😠",
    "[#26]": "☹️",
    "[#27]": "😞",
    "[#28]": "😝",
    "[#29]": "😈",
    "[#30]": "😚",
    "[#31]": "😘",
    "[#32]": "😗",
    "[#33]": "😖",
    "[#34]": "😕",
    "[#35]": "😔",
    "[#36]": "😇",
    "[#37]": "😴",
    "[#38]": "😓",
    "[#39]": "😒",
    "[#40]": "😑",
    "[#41]": "🔥",
    "[#42]": "😏",
    "[#43]": "😎",
    "[#44]": "😍",
    "[#50]": "😊",
    "[#52]": "☺️",
    "[#53]": "😉",
    "[#54]": "😜",
    "[#55]": "😨",
    "[#56]": "😱",
    "[#57]": "😪",
    "[#58]": "😷",
    "[#62]": "👍",
    "[#63]": "👎",
    "[#64]": "👌",
    "[#65]": "👊",
    "[#66]": "✊",
    "[#67]": "✌️",
    "[#68]": "👋",
    "[#69]": "✋",
    "[#70]": "👐",
    "[#71]": "👇",
    "[#72]": "👆",
    "[#73]": "👉",
    "[#74]": "👈",
    "[#75]": "🙌",
    "[#76]": "🙏",
    "[#77]": "☝️",
    "[#78]": "👏",
    "[#79]": "💪",
    "[#01]": "💦",
    "[#02]": "💥",
    "[#03]": "💔",
    "[#04]": "🍻",
    "[#05]": "🌹",
    "[#06]": "❤️",
    "[#45]": "💋",
    "[#46]": "✨",
    "[#47]": "🎂",
    "[#48]": "❓",
    "[#49]": "🐷",
    "[#59]": "💤",
    "[#60]": "🎵",
    "[#61]": "💩",
    "[#80]": "👩‍❤️‍👨",
    "[#81]": "👩‍❤️‍💋‍👨",
    "[#83]": "👀",
    "[#84]": "🥚",
}
const defaultColor = "ffffcc";

function OnInputChanged() {
    let inputValue = input.value;
    inputValue = inputValue.replaceAll(colorWithoutTextPattern, "");

    const emojiRegex = new RegExp(Object.keys(indexToEmoji).join("|").replaceAll("[", "\\["), "g");
    
    // replacing emoji indices with their emoji
    let match = null;
    while ((match = emojiRegex.exec(inputValue)) !== null) {
        let replacement = indexToEmoji[match[0]];
        const before = inputValue.substring(0, match.index);
        const after = inputValue.substring(match.index + match[0].length);
        const colorMatches = [...before.matchAll(colorPattern)];
        const lastColorMatch = colorMatches[colorMatches.length - 1];
        if(lastColorMatch != null){
            if(lastColorMatch[1] !== defaultColor){
                replacement = "</span>" + replacement;
            }
        }
        
        inputValue = before + replacement + after;
    }

    const preview = document.getElementById("preview");

    // replacing color tags
    preview.innerHTML = inputValue.replace(/\[\[-]\[-]([0-9A-Fa-f]{6})]/g, "<span style='color:#$1'>");
}

