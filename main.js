const specialSpaces = /[\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]/g;
const weirdQuotes = /[\u2018\u2019\u201A\u201B\u2032\u2035]/g; // 싱글 따옴표 변형들
const weirdDoubleQuotes = /[\u201C\u201D\u201E\u201F\u2033\u2036]/g; // 더블 따옴표 변형들
const weirdDashes = /[\u2013\u2014\u2212]/g; // 하이픈 / 대시 변형들
const ellipsis = /\u2026/g; // …

function normalizeText(text) {
    const punctuated = normalizePunctuation(text);
    return normalizeSpaces(punctuated);
}

function normalizePunctuation(text) {
    return text
        .replace(weirdQuotes, "'")
        .replace(weirdDoubleQuotes, '"')
        .replace(weirdDashes, '-')
        .replace(ellipsis, '...');
}

function normalizeSpaces(text) {
    return text.replace(specialSpaces, ' ')
        .replace(/\s+/g, ' ') // 여러 개의 공백을 하나로
        .trim(); // 양쪽 공백 제거
}

function countSpecialSpaces(text) {
    const matches = text.match(specialSpaces);
    return matches ? matches.length : 0;
}

// 👉 공백 제거 후 글자 수
function countWithoutSpaces(text) {
    const noSpaces = text.replace(/[\s\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]/g, '');
    return noSpaces.length;
}

function convertSpaces() {
    const input = document.getElementById('inputText').value;
    const normalized = normalizeText(input);
    document.getElementById('outputText').value = normalized;
    updateStats(); // 변환 후 통계도 업데이트
}

function copyResult() {
    const output = document.getElementById('outputText');
    output.select();
    document.execCommand('copy');
    alert('복사되었습니다!');
}

function updateStats() {
    const input = document.getElementById('inputText').value;
    const charCount = input.length;
    const charCountWithoutSpaces = countWithoutSpaces(input);
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