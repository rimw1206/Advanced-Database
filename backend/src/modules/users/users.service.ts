import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

  private users: any[] = []; 

  async create(user: any) {
    const newUser = {
      user_id: this.users.length + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }
}
