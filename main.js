const specialSpaces = /[\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]/g;
const weirdQuotes = /[\u2018\u2019\u201A\u201B\u2032\u2035]/g; // 싱글 따옴표 변형들
const weirdDoubleQuotes = /[\u201C\u201D\u201E\u201F\u2033\u2036]/g; // 더블 따옴표 변형들
const weirdDashes = /[\u2013\u2014\u2212]/g; // 하이픈 / 대시 변형들
const ellipsis = /\u2026/g; // …

// invisible chars: ZWSP, ZWNJ, ZWJ, BOM, LTR/RTL control chars
const invisibleChars = /[\u200B-\u200D\uFEFF\u200E\u200F]/g;

// 이모지 (유니코드 emoji block)
const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;

// 👉 전체 normalize entrypoint
function normalizeText(text) {
    let result = removeInvisibleChars(text);
    result = removeEmojis(result);
    result = normalizePunctuation(result);
    result = normalizeSpaces(result);
    return result;
}

// 👉 눈에 안 보이는 제어문자 제거
function removeInvisibleChars(text) {
    return text.replace(invisibleChars, '');
}

// 👉 이모지 제거
function removeEmojis(text) {
    return text.replace(emojiRegex, '');
}

// 👉 기호 변형 처리
function normalizePunctuation(text) {
    return text
        .replace(weirdQuotes, "'")
        .replace(weirdDoubleQuotes, '"')
        .replace(weirdDashes, '-')
        .replace(ellipsis, '...');
}

// 👉 특수 공백 변형 처리
function normalizeSpaces(text) {
    return text.replace(specialSpaces, ' ');
}

// 👉 특수공백 카운트
function countSpecialSpaces(text) {
    const matches = text.match(specialSpaces);
    return matches ? matches.length : 0;
}

// 👉 공백 제거 후 글자 수
function countWithoutSpaces(text) {
    const noSpaces = text.replace(/[\s\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]/g, '');
    return noSpaces.length;
}

// 👉 변환하기 버튼 동작
function convertSpaces() {
    const input = document.getElementById('inputText').value;
    const normalized = normalizeText(input);
    document.getElementById('outputText').value = normalized;
    updateStats(); // 변환 후 통계도 업데이트
}

// 👉 복사하기 버튼 동작
function copyResult() {
    const output = document.getElementById('outputText');
    output.select();
    document.execCommand('copy');
    alert('복사되었습니다!');
}

function countAIGeneratedChars(text) {
    const aiGeneratedRegex = /[\u00A0\u1680\u180E\u2000-\u200A\u202F\u205F\u3000\u200B-\u200D\uFEFF\u200E\u200F]/g;
    const matches = text.match(aiGeneratedRegex);
    return matches ? matches.length : 0;
}

// 👉 입력창 실시간 통계 업데이트
function updateStats() {
    const input = document.getElementById('inputText').value;
    const charCount = input.length;
    const charCountWithoutSpaces = countWithoutSpaces(input);
    const aiGeneratedCount = countAIGeneratedChars(input);

    document.getElementById('charCount').textContent = `글자 수 (공백 포함): ${charCount}자`;
    document.getElementById('charCountWithoutSpaces').textContent = `글자 수 (공백 제외): ${charCountWithoutSpaces}자`;
    document.getElementById('specialAiCount').textContent = `AI 생성 글자 수 (특수 공백 포함): ${aiGeneratedCount}개`;}

document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('inputText');
    const convertButton = document.getElementById('convertButton');
    const copyButton = document.getElementById('copyButton');

    inputArea.addEventListener('input', updateStats);
    convertButton.addEventListener('click', convertSpaces);
    copyButton.addEventListener('click', copyResult);
});