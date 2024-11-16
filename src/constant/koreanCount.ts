interface StrokeCount {
  text: string;
  value: number;
}

const strokeCount: StrokeCount[] = [
  { text: 'ㄱ', value: 2 },
  { text: 'ㄲ', value: 4 },
  { text: 'ㄴ', value: 2 },
  { text: 'ㄷ', value: 3 },
  { text: 'ㄸ', value: 6 },
  { text: 'ㄹ', value: 5 },
  { text: 'ㅁ', value: 4 },
  { text: 'ㅂ', value: 4 },
  { text: 'ㅃ', value: 8 },
  { text: 'ㅅ', value: 2 },
  { text: 'ㅆ', value: 4 },
  { text: 'ㅇ', value: 1 },
  { text: 'ㅈ', value: 3 },
  { text: 'ㅉ', value: 6 },
  { text: 'ㅊ', value: 4 },
  { text: 'ㅋ', value: 3 },
  { text: 'ㅌ', value: 4 },
  { text: 'ㅍ', value: 4 },
  { text: 'ㅎ', value: 3 },
  { text: 'ㅏ', value: 2 },
  { text: 'ㅐ', value: 3 },
  { text: 'ㅑ', value: 3 },
  { text: 'ㅒ', value: 4 },
  { text: 'ㅓ', value: 2 },
  { text: 'ㅔ', value: 3 },
  { text: 'ㅕ', value: 3 },
  { text: 'ㅖ', value: 4 },
  { text: 'ㅗ', value: 2 },
  { text: 'ㅘ', value: 4 },
  { text: 'ㅙ', value: 5 },
  { text: 'ㅚ', value: 3 },
  { text: 'ㅛ', value: 3 },
  { text: 'ㅜ', value: 2 },
  { text: 'ㅝ', value: 4 },
  { text: 'ㅞ', value: 5 },
  { text: 'ㅟ', value: 4 },
  { text: 'ㅠ', value: 3 },
  { text: 'ㅡ', value: 1 },
  { text: 'ㅢ', value: 2 },
  { text: 'ㅣ', value: 1 },
  { text: 'ㄵ', value: 5 },
  { text: 'ㄶ', value: 5 },
  { text: 'ㄺ', value: 7 },
  { text: 'ㄻ', value: 9 },
  { text: 'ㄼ', value: 9 },
  { text: 'ㄽ', value: 7 },
  { text: 'ㄾ', value: 8 },
  { text: 'ㄿ', value: 9 },
  { text: 'ㅀ', value: 8 },
  { text: 'ㅄ', value: 6 },
];

//초성
const consonant = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

//중성
const vowel = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
];

//종성
const coda = [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

export { strokeCount, coda, vowel, consonant };
