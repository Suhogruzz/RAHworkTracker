class RecordModel {
    id: string;
    km:string
    constructor(date:string, km:string) {
        this.id = date;
        this.km = km;
    }
}

export default RecordModel;