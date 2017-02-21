export interface IHealthResult {
    isHealthy: boolean;
    details?: any;
}

export interface IHealthCheck {
    name: string;
    checkHealth: () => Promise<IHealthResult>;
}

export interface IHealthRouteOptions {
    healthChecks: IHealthCheck[];
    accessToken?: string;
}
