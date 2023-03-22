export interface Pallet {
    empfaenger: Empfaenger[];
    georaster_id: number;
    geo_x: number;
    geo_y: number;
}

export interface Empfaenger {
    name1: string;
    name2: string;
    name3: string;
}
