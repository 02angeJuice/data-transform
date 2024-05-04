export class DepartmentSummaryDto {
  male: number;
  female: number;
  ageRange: string;
  hair: { [color: string]: number };
  addressUser: { [name: string]: string };
}
