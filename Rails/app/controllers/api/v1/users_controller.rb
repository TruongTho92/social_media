class Api::V1::UsersController < Api::V1::ApplicationController
  def index
    @users = User.all
    render json: {
      data: {user: @users}
    }
  end

  def show
    @user = User.find(params[:id])
    render json: {
      data: {
        user: @user,
        following: @user.following,
        followers: @user.followers,
      }
    }
  end

  def update
    if current_user.update(user_params)
      render json: {
        message: "Update successfully",
        is_success: true,
        data: {user: current_user},
      }, status: :ok
    else
      render json: {
        message: "Update failed!",
        is_success: false,
      }, status: :ok
    end
  end

  def following
    @user  = User.find(params[:id])
    @users = @user.following
  end

  def followers
    @user  = User.find(params[:id])
    @users = @user.followers
  end

  private
  def user_params
    params.require(:user).permit(:password, :password_confirmation, :user_name, :gender, :bio, :avatar, :nick_name)
  end
end