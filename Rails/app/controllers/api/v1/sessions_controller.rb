class Api::V1::SessionsController < Devise::SessionsController
  # skip_before_action :authenticate_user_from_token
  before_action :load_user_authentication

  def create
    if @user.valid_password?(user_params[:password])
      sign_in @user, store: false
      render json: {
        is_success: true,
        data: {user: @user}
      }, status: :ok
    else
      render json: {
        is_success: false,
        data: {}
      }, status: :ok
    end
  end

  def destroy
    if @user.authentication_token == user_params[:authentication_token]
      sign_out @user
      render json: {message: "Signed out"}, status: 200
    else
      render json: {message: "Invalid token"}, status: 200
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :authentication_token)
  end
end