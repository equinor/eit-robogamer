const expect = require("chai").expect;
const add = require("../index");

describe("add", function() {
    it("shuld add 2 and 3 to be 5", function () {
        expect(add(2,3)).to.be.equal(5);
    })
})