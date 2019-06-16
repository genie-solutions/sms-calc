// Regex for GSM 03.38 7bit character set
// Source: https://frightanic.com/software-development/regex-for-gsm-03-38-7bit-character-set/
const gsmCharacters = new RegExp(
  "^[A-Za-z0-9 \\r\\n@£$¥èéùìòÇØøÅå\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039EÆæßÉ!\"#$%&'()*+,\\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\\\\\[~\\]|\u20AC]*$"
);

/**
 * Check if the passed text contains only GSM 03.38 7bit characters
 */
export const isAllGSM = (text: string): boolean => gsmCharacters.test(text);

/**
 * Estimate the number of credits used for the given message content
 * @param message SMS content
 * @return Credits estimation as an integer
 */
export const estimateCredit = (message: string | undefined | null): number => {
  if (!message) return 0;

  if (!isAllGSM(message)) {
    // message contains non-GSM 03.38 7bit characters
    // so you can only use 70 characters
    return Math.ceil(message.length / 70);
  }

  return Math.ceil(message.length / 160);
};
