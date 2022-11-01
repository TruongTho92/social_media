// [ACCOUNT]
export interface UserDataTypes {
  user: {
    email: string;
    password: string;
    password_confirmation?: string;
    is_supervisor?: boolean;
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
      phone: string;
      bio: string;
      followers?: [];
      followings?: [];
      gender: string;
      authentication_token: string;
      is_admin: boolean;
      is_supervisor: boolean;
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
    phone?: string;
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

// POST
export interface PostPayloadCreate {
  post: {
    image: string;
    caption: string;
  };
}

export interface PostAccount {
  id: number;
  image: string;
  caption: string;
  user_id: number | null;
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

  like: [];
  comment: [];
}

// LIKE
export interface LikeDataResponse {
  id: number | null;
  post_id: number | null;
  user_id: number | null;
}

export interface userLikedTypes {
  id: number | null;
  user_name: string;
  nick_name: string;
  avatar: string;
}

// COMMENT
export interface CommentDataResponse {
  id: number | null;
  post_id: number | null;
  user_id: number | null;
}

export interface UserCommentResponse {
  id: number | null;
  user_name: string;
  avatar: string;
  content: string;
  user_id?: number | null;
  post_id?: number | null;
}

// USER
export interface UserFollowResponse {
  id: number | null;
  email: string;
  avatar: string;
  user_name: string;
  nick_name: string;
}
export interface UserProfile {
  user: {
    id: number | null;
    email: string;
    avatar: string;
    user_name: string;
    nick_name: string;
    bio: string;

    gender: string;
    authentication_token: string;
  };
  followers: UserFollowResponse[];
  following: UserFollowResponse[];
}

// POST OF FOLLOWING
export interface PostOfFollowingResponse {
  id: number;
  user_id: number;
  avatar: string;
  user_name: string;
  nick_name: string;
  image: string;
  caption: string;
  like: LikeDataResponse[];
  comment: LikeDataResponse[];
}

// ALL ACCOUNT
export interface AllAccountResponse {
  id: number;
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
}

// SEARCH USER
export interface SearchUserResponse {
  id: number;
  email: string;
  avatar: string;
  user_name: string;
  nick_name: string;
  bio: string;
}

// ADMIN
export interface UserResponse {
  nick_name: string;
  user_name: string;
  avatar: string;
  bio: string;
  email: string;
  gender: string;
  id: number;
  is_admin: string;
  is_supervisor: false;
  authentication_token: string;
  updated_at: string;
  created_at: string;
}

export interface PostResponse {
  id: number;
  image: string;
  caption: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}
