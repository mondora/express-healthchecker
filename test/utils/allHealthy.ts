import {expect} from "chai";

import allHealthy from "../../src/utils/allHealthy";

describe("allHealthy", () => {

    it("returns true if all IHealthResult-s are healthy", () => {
        const actual = allHealthy([
            {isHealthy: true},
            {isHealthy: true}
        ]);
        expect(actual).to.equal(true);
    });

    it("returns true if the array of IHealthResult-s is empty", () => {
        const actual = allHealthy([]);
        expect(actual).to.equal(true);
    });

    it("returns true if not all IHealthResult-s are healthy", () => {
        const actual = allHealthy([
            {isHealthy: true},
            {isHealthy: false}
        ]);
        expect(actual).to.equal(false);
    });

});
