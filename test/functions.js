const input = document.getElementById("input");
const preview = document.getElementById("preview");
const color = document.getElementById("color");

const exampleTemplate = 'This is an <font color="#ff0000">EXAMPLE</font>! 😀';
const defaultColor = "ffffcc";

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

function Init() {
    input.innerHTML = exampleTemplate;

    color.value = "#" + defaultColor;

    OnInputChanged();
}

function SetTemplate() {
    document.getElementById("input").innerHTML = event.currentTarget.innerHTML;

    OnInputChanged();
}

function Focus(){
    input.focus();
}

function CopyToClipboard(){
    navigator.clipboard.writeText(preview.textContent).then(r => alert("Copied to clipboard!"));
}

function OnSelect() {
    console.log("select");

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Get the parent element of the selected text
    const parentElement = range.commonAncestorContainer;

    let clickedColor = null;

    // Traverse up the DOM tree to find the nearest <font> tag
    let currentNode = parentElement;
    while (currentNode && currentNode !== input) {
        if (currentNode.tagName && currentNode.tagName.toLowerCase() === 'font') {
            clickedColor = currentNode.getAttribute('color');
        }
        currentNode = currentNode.parentNode;
    }

    if (clickedColor == null) {
        clickedColor = "#" + defaultColor;
    }


    color.value = clickedColor;
}

function DefaultColor(){
    color.value = "#" + defaultColor;

    OnColorChanged();
}

function OnColorChanged() {
    const selectedColor = color.value;
    document.execCommand('foreColor', false, selectedColor);

    OnInputChanged();
    OnSelect();
}

function OnInputChanged() {
    let inputValue = input.innerHTML;

    // remove empty color tags
    inputValue = inputValue.replaceAll(/<font color="#\d{6}">\s*<\/font>/g, "");

    // replace font tags by codes
    inputValue = inputValue.replaceAll(/<font color="#([a-fA-F0-9]{6})">/g, "[[-][-]$1]");

    // remove closing font tags
    inputValue = inputValue.replaceAll(/<\/font>/g, "[[-][-]" + defaultColor + "]");

    // remove empty colors
    inputValue = inputValue.replaceAll(/\[\[-]\[-][a-fA-F0-9]{6}](\s*\[\[-]\[-][a-fA-F0-9]{6}])/g, "$1");

    // remove trailing color
    inputValue = inputValue.replaceAll(/\[\[-]\[-][a-fA-F0-9]{6}]\s*<div>|<br>|$/g, "");

    const emojiRegex = new RegExp(Object.keys(emojiToIndex).join("|"), "g");

    let match = null;

    while ((match = emojiRegex.exec(inputValue)) !== null) {

        let replacement = emojiToIndex[match[0]];

        const before = inputValue.substring(0, match.index);
        const after = inputValue.substring(match.index + match[0].length);
        const colorMatches = [...before.matchAll(/\[\[-]\[-]([a-fA-F0-9]{6})]/g)];
        const lastColorMatch = colorMatches[colorMatches.length - 1];

        if (lastColorMatch) {
            if (lastColorMatch[1] !== defaultColor) {
                replacement += lastColorMatch[0];
            }
        }
        
        inputValue = before + replacement + after;
    }

    preview.innerHTML = inputValue;
}



function Insert() {
    // insert a character at the cursor position
    const insertEmoji = event.currentTarget.innerHTML;

    const selection = window.getSelection();
    const start = selection.getRangeAt(0).startOffset;
    const finish = selection.getRangeAt(0).endOffset;
    const text = selection.anchorNode.textContent;
    const before = text.substring(0, start);
    const after = text.substring(finish);

    selection.anchorNode.textContent = before + insertEmoji + after;

    OnInputChanged();
    OnSelect();

    input.focus();

    selection.setPosition(selection.anchorNode, finish + insertEmoji.length);
}
