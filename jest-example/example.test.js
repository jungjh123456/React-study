  describe("expect test", () => {
    describe("expect test", () => {
      it('1 더하기 2 는 3 이더라',() => {
        const received = 1 + 2;
        const expected = 3;
        expect(received).toBe(expected)
      });

      it('{name: "Mark"}는 {name: "Mark"}이더라',() => {
        const received = {name: "Mark"};
        const expected = {name: "Mark"};
        expect(received).toEqual(expected)
      });
      
    })
  })

