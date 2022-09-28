export interface UserRegisterTypes {
  user: {
    email: string;
    password: string;
    password_confirmation: string;
  };
}

export interface UserLoginTypes {
  email: string;
  password: string;
}

export interface userRegistered {
  user: {
    email: string;
    password: string;
    password_confirmation: string;
  };
  message: string;
}
