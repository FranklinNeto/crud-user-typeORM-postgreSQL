export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface IUserResponse {
  name: string;
  email: string;
  isAdm: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface IUserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
}
