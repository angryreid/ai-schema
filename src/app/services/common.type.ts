export interface ResponseData {
    predictions: Rredictions[];
}

export interface Rredictions {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
    class: string;
}