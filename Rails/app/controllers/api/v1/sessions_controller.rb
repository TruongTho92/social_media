class Api::V1::SessionsController < Devise::SessionsController
  before_action :ensure_params_exist
  before_action :load_user
  def create
    if @user.valid_password?(user_params[:password])
      sign_in @user
      session[:user_id] = @user.id
      render json: {
        is_success: true,
        data: {user: @user}
      }, status: :ok
    else
      render json: {
        message:"Email or Password incorrect",
        is_success: false,
        data: {}
      }, status: :ok
    end
  end

  def is_logged_in?
    @current_user = User.find(session[:user_id]) if session[:user_id]
    if @current_user
      render json: {
        is_success: true,
        data: {user: @current_user}
      }, status: :ok
    else
      render json: {
        is_success: false
      }
    end
  end

  def destroy
    if @user.authentication_token == user_params[:authentication_token]
      sign_out @user
      render json: {
        message: "Signed out",
        is_success: true,
      }, status: :ok
    else
      render json: {
        message: "Invalid token",
        is_success: false,
      }, status: :ok
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :authentication_token)
  end
end