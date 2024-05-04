import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { DepartmentSummaryDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  async fetchData() {
    const result = await axios.get('https://dummyjson.com/users');
    return result?.data.users;
  }

  transformData(data: any[]): { [department: string]: DepartmentSummaryDto } {
    const departmentSummary: { [department: string]: DepartmentSummaryDto } =
      {};

    data?.forEach((user) => {
      const department = user.company.department;
      if (!departmentSummary[department]) {
        departmentSummary[department] = {
          male: 0,
          female: 0,
          ageRange: '',
          hair: {},
          addressUser: {},
        };
      }

      // Gender count
      if (user.gender === 'male') {
        departmentSummary[department].male++;
      } else if (user.gender === 'female') {
        departmentSummary[department].female++;
      }

      // Hair color summary
      const hairColor = user.hair.color;
      departmentSummary[department].hair[hairColor] =
        (departmentSummary[department].hair[hairColor] || 0) + 1;

      // Address summary
      const fullName = `${user.firstName}${user.lastName}`;
      departmentSummary[department].addressUser[fullName] =
        user.address.postalCode;

      // Calculate age range if needed
      // (you'll need to implement the logic for calculating age range)
    });

    return departmentSummary;
  }

  async department() {
    const users = await this.fetchData();
    const res = this.transformData(users);
    return res;
  }

  async findAll(): Promise<any> {
    try {
      const res = await this.fetchData();
      return res;
    } catch (error) {
      throw new HttpException('call error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
