// [USER]

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
      id: number | null;
      email: string;
      password: string;
      password_confirmation: string;
      avatar: string;
      user_name: string;
      nick_name: string;
      bio: string;
      followers?: [];
      followings?: [];
      gender: string;
      authentication_token: string;
    };
  };
  message: string | undefined;
  is_success: boolean;
}

export interface DataUpdateUser {
  user: {
    avatar?: string;
    user_name?: string;
    nick_name?: string;
    bio?: string;
    gender?: string;
    password?: string;
    confirmation_password?: string;
  };
}

export interface PayloadLogout {
  user: {
    email: string;
    authentication_token?: string;
  };
}

// [POST]
export interface PostPayloadCreate {
  post: {
    image: string;
    caption: string;
  };
}

export interface PostAccount {
  id: number | null;
  image: string;
  caption: string;
}

export interface PostDataResponse {
  posts: PostAccount[];
  is_success: boolean;
  message: string;
}
export interface PostDetailResponse {
  post: PostAccount;
  is_success: boolean;
  message: string;
}
