import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {
            throw error;
        }
    }

    async isLoggedIn() {
        try {
            const user = await this.account.get();
            return !!user; // Returns true if user exists
        } catch (error) {
            console.log("Appwrite service :: isLoggedIn :: error", error);
            return false; // Returns false if not logged in
        }
    }
    

    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    async userID(){
        try {
            const user = await this.account.get();
            return user.$id;
        } catch (error) {
            console.log("Appwrite serive :: userID :: error", error);
        }
    }
    
}

const authService = new AuthService();

export default authService


