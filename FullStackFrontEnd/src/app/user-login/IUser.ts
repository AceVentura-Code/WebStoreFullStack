export interface IUser {
    id : number;
    name : string;
    passWord : string;
    email : string;
    address? : string;
    //orders { get; set; }
    age? : number;
    accessLevel : string;
}

export interface IAttemptLogIn {
    name : string;
    passWord : string;
}