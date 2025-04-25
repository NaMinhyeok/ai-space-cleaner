const specialSpaces = /[\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]/g;

function countSpecialSpaces(text) {
    const matches = text.match(specialSpaces);
    return matches ? matches.length : 0;
}

function countWithoutSpaces(text) {
    // 일반 공백(\u0020)과 특수공백 모두 제거 후 길이 계산
    const noSpaces = text.replace(/[\s\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]/g, '');
    return noSpaces.length;
}

function convertSpaces() {
    const input = document.getElementById('inputText').value;
    const normalized = input.replace(specialSpaces, ' ');
    document.getElementById('outputText').value = normalized;
}

function copyResult() {
    const output = document.getElementById('outputText');
    output.select();
    document.execCommand('copy');
    alert('복사되었습니다!');
}

function updateStats() {
    const input = document.getElementById('inputText').value;
    const charCount = input.length;                           // 공백 포함
    const charCountWithoutSpaces = countWithoutSpaces(input); // 공백 제외
    const specialCount = countSpecialSpaces(input);

    document.getElementById('charCount').textContent = `글자 수 (공백 포함): ${charCount}자`;
    document.getElementById('charCountWithoutSpaces').textContent = `글자 수 (공백 제외): ${charCountWithoutSpaces}자`;
    document.getElementById('specialSpaceCount').textContent = `특수 공백 개수: ${specialCount}개`;
}

document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('inputText');
    const convertButton = document.getElementById('convertButton');
    const copyButton = document.getElementById('copyButton');

    inputArea.addEventListener('input', updateStats);
    convertButton.addEventListener('click', convertSpaces);
    copyButton.addEventListener('click', copyResult);
});