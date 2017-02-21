import express = require("express");
import request = require("supertest-as-promised");

import {healthRoute} from "../src";

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

describe("healthChecker utility, healthRoute", () => {

    it("when checkHealth succedes, returns 200", () => {
        const server = express().get("/health", healthRoute({
            healthChecks: [hc1_ok]
        }));
        return request(server)
            .get("/health")
            .expect(200);
    });

    it("when checkHealth fails, returns 503", () => {
        const server = express().get("/health", healthRoute({
            healthChecks: [hc1_fail]
        }));
        return request(server)
            .get("/health")
            .expect(503);
    });

    it("when a valid access_token is passed in the querystring, replies with a detailes result", () => {
        const server = express().get("/health", healthRoute({
            healthChecks: [hc1_fail],
            accessToken: "accessToken"
        }));
        return request(server)
            .get("/health?access_token=accessToken")
            .expect(503)
            .expect({
                isHealthy: false,
                details: {
                    hc1: {
                        isHealthy: false,
                        details: "Error"
                    }
                }
            });
    });

});
