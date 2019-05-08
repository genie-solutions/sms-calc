const utf8Characters = new RegExp(
  "^[A-Za-z0-9 \\r\\n@£$¥èéùìòÇØøÅå\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039EÆæßÉ!\"#$%&'()*+,\\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\\\\\[~\\]|\u20AC]*$"
);

/**
 * Check if the passed text contains only utf8 characters
 */
export const isAllUtf8 = (text: string): boolean => utf8Characters.test(text);

/**
 * Estimate the number of credits used for the given message content
 * @param message SMS content
 * @return Credits estimation as an integer
 */
export const estimateCredit = (message: string | undefined | null): number => {
  if (!message) {
    return 0;
  } else if (!isAllUtf8(message)) {
    // message contains double-byte characters
    // Matrix will re-encode this and double the length
    // so it will use double the credits
    return Math.ceil((message.length * 2) / 160);
  }
  return Math.ceil(message.length / 160);
};
