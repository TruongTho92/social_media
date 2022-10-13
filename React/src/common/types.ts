export interface UserDataTypes {
  user: {
    email: string;
    password: string;
    password_confirmation?: string;
  };
}
export interface PayloadLogout {
  user: {
    email: string;
    authentication_token?: string;
  };
}

export interface DataUpdateUser {
  user: {
    avatar: string;
    user_name?: string;
    nick_name?: string;
    bio?: string;
    gender?: string;
    password?: string;
    confirmation_password?: string;
  };
}

export interface UserDataResponse {
  data: {
    user: {
      id: number | null;
      email: string;
      password: string;
      password_confirmation: string;
      avatar: string;
      user_name: string;
      nick_name: string;
      bio: string;
      posted: [];
      commented: [];
      liked: [];
      gender: string;
      authentication_token: string;
    };
  };
  message: string | undefined;
  is_success: boolean;
}
