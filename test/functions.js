const exampleTemplate = "This is an [[-][-]ff0000]EXAMPLE! [#07]";
const enhancementTemplate = "I upgraded [[-][-]00ff00]Example [[-][-]ffffc8]to [[-][-]00ff00]Lv.99[[-][-]ffffc8]\n and obtained incredible bonus stats. [[-][-]00ff00]Tap to view";
const legacyTemplate = "I inherited a [[-][-]ff0000]T4 Mystic Example Legacy! [[-][-]00ff00](Tap to view)";
const hatchTemplate = "I got [[-][-]ff0000]Example x30 [[-][-]ffffc8] in Rare Hatchery. [[-][-]00ff00](Tap to view)[[-][-]ffffc8]";
const exchangeTemplate = "I've placed an order request to exchange [[-][-]00ff00][Beetle Egg] [[-][-]ffffc8] for [[-][-]00ff00][Moth Egg][[-][-]ffffc8]. [[-][-]00ff00](Tap to view)";
const arenaTemplate = "I've made it to No.[[-][-]00ff00]2 [[-][-]ffffc8]in Arena!";

const emojiPattern = /\[#\d{2}]/g;
const colorPattern = /\[\[-]\[-]([a-fA-F0-9]{6})]/g;
const colorWithoutTextPattern = /(\[\[-]\[-][a-fA-F0-9]{6}])(?=\s*\[#\d{2}]|\s*\[\[-]\[-][a-fA-F0-9]{6})/g;

let currentColor = null;
const defaultColor = "ffffc8";

function Init() {
    document.getElementById("input").value = exampleTemplate;

    OnInputChanged();
}

function TemplateEnhance() {
    document.getElementById("input").value = enhancementTemplate;

    OnInputChanged();
}

function TemplateExchange() {
    document.getElementById("input").value = exchangeTemplate;

    OnInputChanged();
}

function TemplateLegacy() {
    document.getElementById("input").value = legacyTemplate;

    OnInputChanged();
}

function TemplateHatch() {
    document.getElementById("input").value = hatchTemplate;

    OnInputChanged();
}

function OnSelect() {
    const input = document.getElementById("input");
    const start = input.selectionStart;
    const beforeSelection = input.value.substring(0, start);

    const emojiMatches = [...beforeSelection.matchAll(emojiPattern)];
    const colorMatches = [...beforeSelection.matchAll(colorPattern)];

    const lastEmoji = emojiMatches[emojiMatches.length - 1];
    const lastColor = colorMatches[colorMatches.length - 1];

    if (lastColor != null && (lastEmoji == null || lastColor.index > lastEmoji.index)) {
        currentColor = lastColor;
        document.getElementById("color").value = "#" + lastColor[1];
    } else {
        document.getElementById("color").value = "#" + defaultColor;
    }
}

function OnColorChanged() {
    const input = document.getElementById("input");
    const inputValue = input.value;
    const start = input.selectionStart;
    const finish = input.selectionEnd;

    const color = document.getElementById("color").value.substring(1);

    let result = inputValue.substring(0, start) + "[[-][-]" + color + "]" + inputValue.substring(start, finish);

    if (start !== finish) {
        if (currentColor != null) {
            result += "[[-][-]" + currentColor[1] + "]";
        } else {
            result += "[[-][-]" + defaultColor + "]";
        }
    }

    result += inputValue.substring(finish, inputValue.length);

    input.value = result;

    input.selectionStart = finish;
    input.selectionEnd = finish;

    OnInputChanged();
    OnSelect();
}


function OnInputChanged() {
    const input = document.getElementById("input");
    const preview = document.getElementById("preview");

    let inputValue = input.value;

    // removes color tags without text
    inputValue = inputValue.replaceAll(colorWithoutTextPattern, "");
    input.value = inputValue;

    preview.innerHTML = "";
    const parts = inputValue.split(/(\[\[-]\[-][0-9a-fA-F]{6}])|(\[#\d{2}])/g);

    let color = defaultColor;
    let currentSpan = null;

    for (let index in parts) {
        const part = parts[index];
        if (part === undefined) continue;

        if (part.match(emojiPattern)) {
            let emoji = null;
            try {
                emoji = indexToEmoji[part];
            } catch {
                if (currentSpan !== null) {
                    currentSpan.appendChild(document.createTextNode(part));
                } else {
                    preview.appendChild(document.createTextNode(part));
                }
                continue;
            }

            if (color !== defaultColor) {
                if (currentSpan !== null) {
                    preview.appendChild(currentSpan);
                    currentSpan = null;
                }
                color = defaultColor;
            }

            preview.appendChild(document.createTextNode(emoji));

        } else {
            const colorMatch = part.match(colorPattern);
            if (colorMatch !== null) {
                const newColor = colorMatch[0].substring(7, 13);
                if (color !== newColor) {
                    if (currentSpan !== null) {
                        preview.appendChild(currentSpan);
                        currentSpan = null;
                    }
                    color = newColor;
                    currentSpan = document.createElement("span");
                    currentSpan.style.color = "#" + color;
                }
            } else {
                if (currentSpan !== null) {
                    currentSpan.appendChild(document.createTextNode(part));
                } else {
                    preview.appendChild(document.createTextNode(part));
                }
            }
        }

    }

    if (currentSpan !== null) {
        preview.appendChild(currentSpan);
    }
}

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

const emojiToIndex = {
    "😀": "[#07]",
    "😭": "[#08]",
    "😌": "[#09]",
    "😵": "[#10]",
    "😋": "[#11]",
    "😂": "[#12]",
    "😄": "[#13]",
    "😫": "[#14]",
    "😁": "[#15]",
    "😃": "[#16]",
    "😰": "[#17]",
    "😢": "[#18]",
    "😳": "[#19]",
    "😤": "[#20]",
    "🌚": "[#21]",
    "😣": "[#22]",
    "😮": "[#23]",
    "😡": "[#24]",
    "😠": "[#25]",
    "☹️": "[#26]",
    "😞": "[#27]",
    "😝": "[#28]",
    "😈": "[#29]",
    "😚": "[#30]",
    "😘": "[#31]",
    "😗": "[#32]",
    "😖": "[#33]",
    "😕": "[#34]",
    "😔": "[#35]",
    "😇": "[#36]",
    "😴": "[#37]",
    "😓": "[#38]",
    "😒": "[#39]",
    "😑": "[#40]",
    "🔥": "[#41]",
    "😏": "[#42]",
    "😎": "[#43]",
    "😍": "[#44]",
    "😊": "[#50]",
    "☺️": "[#52]",
    "😉": "[#53]",
    "😜": "[#54]",
    "😨": "[#55]",
    "😱": "[#56]",
    "😪": "[#57]",
    "😷": "[#58]",
    "👍": "[#62]",
    "👎": "[#63]",
    "👌": "[#64]",
    "👊": "[#65]",
    "✊": "[#66]",
    "✌️": "[#67]",
    "👋": "[#68]",
    "✋": "[#69]",
    "👐": "[#70]",
    "👇": "[#71]",
    "👆": "[#72]",
    "👉": "[#73]",
    "👈": "[#74]",
    "🙌": "[#75]",
    "🙏": "[#76]",
    "☝️": "[#77]",
    "👏": "[#78]",
    "💪": "[#79]",
    "💦": "[#01]",
    "💥": "[#02]",
    "💔": "[#03]",
    "🍻": "[#04]",
    "🌹": "[#05]",
    "❤️": "[#06]",
    "💋": "[#45]",
    "✨": "[#46]",
    "🎂": "[#47]",
    "❓": "[#48]",
    "🐷": "[#49]",
    "💤": "[#59]",
    "🎵": "[#60]",
    "💩": "[#61]",
    "👩‍❤️‍👨": "[#80]",
    "👩‍❤️‍💋‍👨": "[#81]",
    "👀": "[#83]",
    "🥚": "[#84]"
}


function Insert() {
    // insert a character at the cursor position
    const textarea = document.getElementById("input");
    const start = textarea.selectionStart;
    const finish = textarea.selectionEnd;
    const insertEmoji = event.target.innerHTML;

    let insert;

    try {
        insert = emojiToIndex[insertEmoji];
    } catch {
        insert = insertEmoji;
    }

    textarea.value = textarea.value.substring(0, start) + insert + textarea.value.substring(finish, textarea.value.length);

    textarea.focus();

    textarea.selectionStart = start + insert.length;
    textarea.selectionEnd = start + insert.length;

    OnInputChanged();
    OnSelect();
}

function UpperCase() {
    // upper case the selected text
    const textarea = document.getElementById("input");
    const start = textarea.selectionStart;
    const finish = textarea.selectionEnd;
    const sel = textarea.value.substring(start, finish);
    textarea.value = textarea.value.substring(0, start) + sel.toUpperCase() + textarea.value.substring(finish);

    OnInputChanged();
}

function LowerCase() {
    // lower case the selected text
    const textarea = document.getElementById("input");
    const start = textarea.selectionStart;
    const finish = textarea.selectionEnd;
    const sel = textarea.value.substring(start, finish);
    textarea.value = textarea.value.substring(0, start) + sel.toLowerCase() + textarea.value.substring(finish);

    OnInputChanged();
}

function Capitalize() {
    // capitalize each word of the selected text
    const textarea = document.getElementById("input");
    const start = textarea.selectionStart;
    const finish = textarea.selectionEnd;
    const sel = textarea.value.substring(start, finish);
    textarea.value = textarea.value.substring(0, start) + sel.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }) + textarea.value.substring(finish);

    OnInputChanged();
}

function Clear() {
    document.getElementById("input").value = "";
    document.getElementById("raw").value = "";
    document.getElementById("preview").value = "";
}
