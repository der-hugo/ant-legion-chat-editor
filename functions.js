const emojiPattern = /\[#\d{2}]/g;
const colorPattern = /\[\[-]\[-]([a-fA-F0-9]{6})]/g;
const colorWithoutTextPattern = /(\[\[-]\[-][a-fA-F0-9]{6}])(?=\s*\[#\d{2}]|\s*\[\[-]\[-][a-fA-F0-9]{6})/g;

var currentColor = null;

function OnSelect() {
    var input = document.getElementById("input");
    var start = input.selectionStart;
    var beforeSelection = input.value.substring(0, start);

    var emojiMatches = [...beforeSelection.matchAll(emojiPattern)];
    var colorMatches = [...beforeSelection.matchAll(colorPattern)];

    var lastEmoji = emojiMatches[emojiMatches.length - 1];
    var lastColor = colorMatches[colorMatches.length - 1];

    if (lastColor != null && (lastEmoji == null || lastColor.index > lastEmoji.index)) {
        currentColor = lastColor;
        document.getElementById("color").value = "#" + lastColor[1];
    } else {
        document.getElementById("color").value = "#ffffff";
    }
}

function OnColorChanged() {
    var input = document.getElementById("input");
    var inputValue = input.value;
    var start = input.selectionStart;
    var finish = input.selectionEnd;

    var color = document.getElementById("color").value.substring(1);

    var result = inputValue.substring(0, start) + "[[-][-]" + color + "]" + inputValue.substring(start, finish)

    if (currentColor != null && start != finish) {
        result += "[[-][-]" + currentColor[1] + "]";
    }

    result += inputValue.substring(finish, inputValue.length);

    input.value = result;

    input.selectionStart = finish;
    input.selectionEnd = finish;

    OnInputChanged();
    OnSelect();
}


function OnInputChanged() {
    var input = document.getElementById("input");

    var inputValue = input.value;
    inputValue = inputValue.replaceAll(colorWithoutTextPattern, "");
    input.value = inputValue;

    // replacing emoji indices with their emoji
    for (var key in indexToEmoji) {
        inputValue = inputValue.replaceAll(key, indexToEmoji[key] + "<span style='color:white'>");
    }

    var preview = document.getElementById("preview");

    // replacing color tags
    preview.innerHTML = inputValue.replace(/\[\[-]\[-]([0-9A-Fa-f]{6})]/g, "<span style='color:#$1'>");
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
    var textarea = document.getElementById("input");
    var start = textarea.selectionStart;
    var finish = textarea.selectionEnd;
    var insertEmoji = event.target.innerHTML;

    var insert;

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
    var textarea = document.getElementById("input");
    var start = textarea.selectionStart;
    var finish = textarea.selectionEnd;
    var sel = textarea.value.substring(start, finish);
    textarea.value = textarea.value.substring(0, start) + sel.toUpperCase() + textarea.value.substring(finish);

    OnInputChanged();
}

function LowerCase() {
    // lower case the selected text
    var textarea = document.getElementById("input");
    var start = textarea.selectionStart;
    var finish = textarea.selectionEnd;
    var sel = textarea.value.substring(start, finish);
    textarea.value = textarea.value.substring(0, start) + sel.toLowerCase() + textarea.value.substring(finish);

    OnInputChanged();
}

function Capitalize() {
    // capitalize each word of the selected text
    var textarea = document.getElementById("input");
    var start = textarea.selectionStart;
    var finish = textarea.selectionEnd;
    var sel = textarea.value.substring(start, finish);
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