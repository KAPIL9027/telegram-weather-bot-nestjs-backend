import { Controller, Param, Get, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers() {
    return this.userService.getUsers();
    }

    @Put('/:id')
    blockOrUnblockUser(@Param('id') id: string) {
        return this.userService.blockUser(id);
    }

    @Delete('/delete/:id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id);
    }

}