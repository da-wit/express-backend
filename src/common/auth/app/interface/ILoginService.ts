import { LogInDto } from "../dtos/login.dto";

export interface ILoginService {
    login(userDate: LogInDto, role: string): Promise<string>
}