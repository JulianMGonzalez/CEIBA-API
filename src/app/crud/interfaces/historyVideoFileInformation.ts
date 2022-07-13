export interface VideoInformation {
    data:      Data[];
    errorcode: number;
}

export interface Data {
    name:      string;
    filetype:  number;
    chn:       number;
    starttime: Date;
    endtime:   Date;
    minutos:   number;
}
