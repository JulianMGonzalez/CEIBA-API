export interface GetVideo {
    data:      Data[];
    errorcode: number;
}

export interface Data {
    date:     Date;
    filetype: number;
}
