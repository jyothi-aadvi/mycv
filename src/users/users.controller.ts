import { Body, Controller, Post, Get, Patch, Param, Query, Delete } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dtos';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {
    console.log('UsersController initialized!');
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    console.log('Creating user with:', body);
    const user = await this.usersService.create(body.email, body.password);
    return { message: 'User created successfully!', user };
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    console.log('Query parameter received:', email);
    if (!email) {
      throw new Error('Email query parameter is required');
    }
    const users = this.usersService.find(email);
    console.log('Database result:', users);
    return users;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  UpdateUser(@Param('id') id: string, @Body() body: UpdateUserDto ) {
    return this.usersService.update(parseInt(id), body);
  }

}
