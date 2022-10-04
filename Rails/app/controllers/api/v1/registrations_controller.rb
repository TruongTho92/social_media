class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user_from_token
  def create
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
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end