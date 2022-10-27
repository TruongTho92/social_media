class Api::V1::RegistrationsController < Devise::RegistrationsController
  before_action :ensure_params_exist

  def register
    @user = User.new(user_params)
    if @user.save
      render json: {
        message: "Waiting confirm your email!",
        is_success: true,
        data: {user: @user}
      }, status: :ok
    else
      render json: {
        message: "Registration failed!",
        is_success: false,
        data: {}
      }, status: :ok
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :is_supervisor)
  end
end
