export interface UserDataTypes {
  user: {
    email: string;
    password: string;
    password_confirmation?: string;
  };
}

export interface UserDataResponse {
  data: {
    user: {
      email: string;
      password: string;
      password_confirmation: string;
      authentication_token: string;
    };
  };
  message: string;
  is_success: boolean;
}
