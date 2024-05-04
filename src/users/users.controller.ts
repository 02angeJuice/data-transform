import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { DepartmentSummaryDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    const res = await this.usersService.getUsers();
    return res;
  }

  @Get('summary')
  async getDepartmentSummary(): Promise<{
    [department: string]: DepartmentSummaryDto;
  }> {
    const summary = await this.usersService.getDepartmentSummary();
    return summary;
  }
}
