import { Body, Controller, Post, Get, Patch, Param, Query, Delete, UseInterceptors,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dtos';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../dtos/user.dto'
import { serialize } from 'v8';

@Controller('auth')
@Serialize(UserDto)
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
  async findUser(@Param('id') id: string) {
    console.log('handler is running');
    const user = await this.usersService.findOne(parseInt(id));
    if(!user) {
       throw new NotFoundException('user not found');
    }
    return user;
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
