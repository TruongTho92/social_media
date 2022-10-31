class Api::V1::UsersController < Api::V1::ApplicationController
  def index
    users = User.all
    current_user_following = current_user.following
    @users = users - current_user_following - [current_user]
    render json: {
      data: {user: @users}
    }
  end

  def show
    @user = User.find(params[:id])
    render json: {
      data: {user: @user}
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

  def search
    @users = User.where("user_name LIKE ?", "%#{params[:search]}%")
    render json: {
      data: {user: @users}
    }, status: :ok
  end

  private
  def user_params
    params.require(:user).permit(:password, :password_confirmation, :user_name, :gender, :bio, :avatar, :nick_name, :phone)
  end
end
