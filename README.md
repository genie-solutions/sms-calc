# sms-calc

A Utility for calculating SMS credits or cost.

SMS messages can contain up to 160 characters from the GSM 03.38 character set. If any characters outside that set exist in the message it can contain up to 70 characters.
If your message is longer these limits, it will be split into multiple segments.
This library calculates the number of segments used for a given message.

## Relevant links
https://developers.messagemedia.com/how-a-single-whitespace-can-triple-your-cost/
https://frightanic.com/software-development/regex-for-gsm-03-38-7bit-character-set/
http://chadselph.github.io/smssplit/
