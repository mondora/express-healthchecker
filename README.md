[![npm version](https://badge.fury.io/js/express-healthchecker.svg)](https://badge.fury.io/js/express-healthchecker)
[![Build Status](https://travis-ci.org/mondora/express-healthchecker.svg?branch=master)](https://travis-ci.org/mondora/express-healthchecker)
[![Coverage Status](https://img.shields.io/coveralls/mondora/express-healthchecker.svg)](https://coveralls.io/r/mondora/express-healthchecker?branch=master)
[![Dependency Status](https://david-dm.org/mondora/express-healthchecker.svg)](https://david-dm.org/mondora/express-healthchecker)
[![devDependency Status](https://david-dm.org/mondora/express-healthchecker/dev-status.svg)](https://david-dm.org/mondora/express-healthchecker#info=devDependencies)

# Express healthchecker

Expose an express service health status.

## Use

Install with:

``` 
npm install --save express-healthchecker
```

Write some health checks:

```js
/*
*   A healthCheck is an object with the following properties:
*   - `name` (stirng): the name of the health check
*   - `checkHealth` (function): a function that returns (a promise to) a
*     healtResult
*
*   A healthResult is an object with the following properties:
*   - `isHealthy` (boolean): indicates the health status
*   - `details` (any) (optional): contains details about a check
*/
module.exports = {
    name: "myHealthCheck",
    checkHealth: () => {
        return Promise.resolve({
            isHealthy: false,
            details: "Problems occurred"
        });
    }
};
```

Use them in your express app:

```js
const express = require("express");
const {healthRoute} = require("express-healthchecker");

const myHealthCheck = require("src/healthChecks/myHealthCheck");

express()
    .get("/health", healthRoute({
        healthChecks: [myHealthCheck],
        accessToken: process.env.HEALTH_ROUTE_ACCESS_TOKEN
    }));

``` 

When accessing the `/health` resource all checks are run and the resource
responds with:

- `200 Ok` if the service is healthy (all checks pass)
- `503 Service Unavailable` if the service is unhealthy (some checks fail)

The body of the response is a JSON object with property `isHealthy` indicating
the health status.

If an `access_token` matching the `accessToken` passed as option to
`healthRoute` is provided in the querystring of the request, additional details
are returned in the response.

Example requests/responses:

```
GET /health

200 OK
{
    "isHealthy": true
}

---

GET /health

503 Service Unavailable
{
    "isHealthy": false
}

---

GET /health?access_token=valid_access_token

200 OK
{
    "isHealthy": true,
    "details": {
        "myHealthCheck": {
            "isHealthy": true
        }
    }
}

---

GET /health?access_token=valid_access_token

503 Service Unavailable
{
    "isHealthy": false,
    "details": {
        "myHealthCheck": {
            "isHealthy": false,
            "details": "Problems occurred"
        }
    }
}
```

## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md).
