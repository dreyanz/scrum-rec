export interface User {
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    password?: string;
 }

 export interface LoginCred {
     emailAddress: string;
     password: string;
 }

 export interface UpdateData {

    didDo: string;
    plan: string;
    blockers: string;
    date: string;

 }