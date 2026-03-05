import { UserModel } from "@/domain/user/model/user.model";
import { jwtDecode } from "jwt-decode";

export function tokenToUser(token: string): UserModel {
  const decoded = jwtDecode<UserModel>(token);
  return decoded;
}