export function normalizeSpeed(speed: number): number {
    const mean = 2789.2183288409706;
    const std = 618.7912600316417;
    return (speed - mean) / std;
}

export function denormalizeSpeed(normalizedSpeed: number): number {
    const mean = 2789.2183288409706;
    const std = 618.7912600316417;
    return normalizedSpeed * std + mean;
}


export function normalizeFlowrate(flowrate: number): number {
    const mean = 2129.8302425876013;
    const std = 780.5481040375748;
    return (flowrate - mean) / std;
}

export function denormalizeFlowrate(normalizedFlowrate: number): number {
    const mean = 2129.8302425876013;
    const std = 780.5481040375748;
    return normalizedFlowrate * std + mean;
}


export function normalizeViscosity(viscosity: number): number {
    const median = 120.0;
    const iqr = 135.0;
    return (viscosity - median) / iqr;
}

export function denormalizeViscosity(normalizedViscosity: number): number {
    const median = 120.0;
    const iqr = 135.0;
    return normalizedViscosity * iqr + median;
}


export function normalizeHead(head: number): number {
    const min = 0.47;
    const range = 49.12;  // 49.59 - 0.47
    return (head - min) / range;
}

export function denormalizeHead(normalizedHead: number): number {
    const min = 0.47;
    const range = 49.12;
    return normalizedHead * range + min;
}

