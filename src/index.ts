import {RequestHandler} from "express";

import {IHealthCheck, IHealthResult, IHealthRouteOptions} from "./typings";
import allHealthy from "./utils/allHealthy";

/**
 * Given an array of IHealthCheck-s, runs (concurrently) their checkHealth
 * function and aggregates the returned IHealthResult-s building a
 * IHealthResult where:
 *   - isHealthy is true if all IHealthResult-s' isHealthy are true, or if the
 *     IHealthCheck-s array is empty
 *   - details is a IHealthCheck.name -> corresponding IHealthResult map
 */
export async function checkHealth (healthChecks: IHealthCheck[]): Promise<IHealthResult> {
    const results = await Promise.all(
        healthChecks.map(healthCheck => healthCheck.checkHealth())
    );
    return {
        isHealthy: allHealthy(results),
        details: healthChecks.reduce((details, healthCheck, index) => ({
            ...details,
            [healthCheck.name]: results[index]
        }), {})
    };
}

/**
 * Given an array of IHealthCheck-s, and optionally an accessToken, the function
 * returns an express route handler that runs all health checks and returns the
 * result to the client. If the client provides an access_token (in the request
 * querystring) that matches the accessToken, then the response will include the
 * IHealthResult details
 */
export function healthRoute (options: IHealthRouteOptions): RequestHandler {
    const {healthChecks, accessToken} = options;
    return async (req, res) => {
        const result = await checkHealth(healthChecks);
        const detailedResponse = (
            accessToken !== undefined && req.query.access_token === accessToken
        );
        res
            .status(result.isHealthy ? 200 : 503)
            .send(detailedResponse ? result : {isHealthy: result.isHealthy});
    };
}
