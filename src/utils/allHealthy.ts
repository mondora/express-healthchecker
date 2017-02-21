import {IHealthResult} from "../typings";

export default function allHealthy (results: IHealthResult[]) {
    return results.reduce(
        (allHealthy, result) => (allHealthy && result.isHealthy),
        true
    );
}
