import { isAllUtf8, estimateCredit } from "./smsCreditCalc";

describe("sms", () => {
  describe("isAllUtf8", () => {
    it("returns true for UTF-8 messages", () => {
      expect(isAllUtf8("message to test")).toBeTruthy();
    });
    it("returns false if message contains non-UTF-8 characters", () => {
      expect(isAllUtf8("message to test \u047E")).toBeFalsy();
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

    it("handles non-unicode characters", () => {
      const sample =
        "irony copper mug shaman put a bird on it freegan bitters.Wolf slow - carb vice, selfies skateboard tumeric austin mustache shoreditch venmo man bun plaid.Banjo poke you probably haven't heard of them swag.Bicycle rights migas air plant paleo iPhone vaporware godard fingerstache keytar try-hard marfa cray lyftr�s-*";
      expect(estimateCredit(sample)).toBe(4);
    });
  });
});
