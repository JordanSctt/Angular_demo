import { Subject } from "rxjs";
import { User } from "../models/User.models";

export class UserService {

    private users: User[] = [
        {
            firstName: 'james',
            lastName: 'Smith',
            email: 'james@smith.com',
            drinkPreference: 'Coca',
            hobbies: [
                'coder',
                'boire du café',
            ]
        }
    ];
    userSubject = new Subject<User[]>();
    
    emitUser() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.users.push(user);
        this.emitUser();
    }

}