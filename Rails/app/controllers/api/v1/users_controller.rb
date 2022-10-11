class Api::V1::UsersController < Api::V1::ApplicationController

  def index
    @users = User.all
    render json: {
      data: {user: @users}
    }
  end

  def show
    render json:{
      data: {user: current_user}
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

  private
  def user_params
    params.require(:user).permit(:password, :password_confirmation, :user_name, :gender, :bio, :avatar)
  end
end