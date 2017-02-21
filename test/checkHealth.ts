import {expect} from "chai";

import {checkHealth} from "../src";

const hc1_ok = {
    name: "hc1",
    checkHealth: () => Promise.resolve({
        isHealthy: true
    })
};
const hc1_fail = {
    name: "hc1",
    checkHealth: () => Promise.resolve({
        isHealthy: false,
        details: "Error"
    })
};
const hc2_ok = {
    name: "hc2",
    checkHealth: () => Promise.resolve({
        isHealthy: true
    })
};
const hc2_fail = {
    name: "hc2",
    checkHealth: () => Promise.resolve({
        isHealthy: false,
        details: "Error"
    })
};


describe("healthChecker utility, checkHealth", () => {

    describe("returns a positive response if all checks are positive", () => {
        it("case: no checks", async () => {
            const result = await checkHealth([]);
            expect(result.isHealthy).to.equal(true);
        });
        it("case: all checks succeed", async () => {
            const result = await checkHealth([hc1_ok, hc2_ok]);
            expect(result.isHealthy).to.equal(true);
        });
        it("case: some checks fail", async () => {
            const result = await checkHealth([hc1_ok, hc2_fail]);
            expect(result.isHealthy).to.equal(false);
        });
        it("case: all checks fail", async () => {
            const result = await checkHealth([hc1_fail, hc2_fail]);
            expect(result.isHealthy).to.equal(false);
        });
    });

    describe("returns a map (checks) of with each healthCheck result", () => {
        it("case: no checks", async () => {
            const result = await checkHealth([]);
            expect(result.details).to.deep.equal({});
        });
        it("case: some checks", async () => {
            const result = await checkHealth([hc1_ok, hc2_fail]);
            expect(result.details).to.deep.equal({
                hc1: {
                    isHealthy: true
                },
                hc2: {
                    isHealthy: false,
                    details: "Error"
                }
            });
        });
    });

});

