import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // Create a new user
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  // Find a user by their ID
  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  // Find users by their email
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  // Update a user's attributes
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs); // Update the user entity with the new attributes
    return this.repo.save(user); // Save the updated user
  }

  // Remove a user by their ID
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user); // Properly delete the user
  }
}
