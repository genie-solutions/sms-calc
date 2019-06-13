import { isAllGSM, estimateCredit } from "./smsCreditCalc";

describe("sms", () => {
  describe("isAllGSM", () => {
    it("returns true for messages that contain only characters in the GSM 03.38 7bit character set", () => {
      expect(isAllGSM("message to test")).toBeTruthy();
    });
    it("returns false if message contains characters outside the GSM 03.38 7bit character set", () => {
      expect(isAllGSM("message to test \u047E")).toBeFalsy();
    });
  });

  describe("estimateCredit", () => {
    it("returns 0 for undefined message", () => {
      expect(estimateCredit(undefined)).toBe(0);
      expect(estimateCredit(null)).toBe(0);
    });

    it("estimates based on message length", () => {
      expect(estimateCredit("hello world")).toBe(1);
      const sample =
        "irony copper mug shaman put a bird on it freegan bitters.Wolf slow - carb vice, selfies skateboard tumeric austin mustache shoreditch venmo man bun plaid.Banjo.";
      expect(estimateCredit(sample)).toBe(1); // 160 chars
      expect(estimateCredit(`${sample}A`)).toBe(2); // 161 chars
      expect(estimateCredit(`${sample}${sample}`)).toBe(2); // 320 chars
    });

    it("handles unicode characters", () => {
      const sample =
        "irony copper mug shaman put a bird on it freegan bitters.Wolf slow - carb vice, selfies skateboard tumeric austin mustache shoreditch venmo man bun plaid.Banjo poke you probably haven't heard of them swag.Bicycle rights migas air plant paleo iPhone vaporware godard fingerstache keytar try-hard marfa cray lyft";
      expect(estimateCredit(sample)).toBe(2);
    });

    const examples: [string, number, string][] = [
      // name, expectedCredits, msg
      ['160 GSM characters', 1, '........10........20........30........40........50........60........70........80........90.......100.......110.......120.......130.......140.......150.......160'],
      ['161 GSM characters', 2, '........10........20........30........40........50........60........70........80........90.......100.......110.......120.......130.......140.......150.......160.'],
      ['70 UCS-2 characters', 1, '❛.......10........20........30........40........50........60........70'],
      ['71 UCS-2 characters', 2, '❛.......10........20........30........40........50........60........70.'],
      ['70 char w emoji', 1, '🙂......10........20........30........40........50........60........70'],
      ['71 char w emoji', 2, '🙂......10........20........30........40........50........60........70.'],
      ['UCS-2 whitespace', 3, '\u202F.......10........20........30........40........50........60........70........80........90.......100.......110.......120.......130.......140.......150.......160'],
    ];

    examples.map(([name, expectedCredits, msg]: [string, number, string]): void => {
      it(`calculates ${name} as ${expectedCredits} credits`, () => {
        expect(estimateCredit(msg)).toBe(expectedCredits);
      })
    })
  });
});
