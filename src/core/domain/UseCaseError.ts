export abstract class UseCaseError {

    public message:string;
    
    constructor(message:string){
        this.message = message;
    }
}