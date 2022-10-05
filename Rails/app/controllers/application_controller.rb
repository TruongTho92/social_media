class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  acts_as_token_authentication_handler_for User, {fallback: :none}
  skip_before_action :authenticate_user_from_token

  private
  def current_user
    @current_user ||= User.find_by(authentication_token: request.headers["Authorization"])
  end

  def authenticate_user_from_token
    if current_user.nil?
      render json: {is_login: false}, status: :ok
    else
      render json: {
        is_login: true,
        data: {user: current_user}
      }, status: :ok
    end
  end

  def ensure_params_exist
    return unless params[:user].blank?
     render json: {message: "Missing params"}, status: 422
   end

  def load_user_authentication
    @user = User.find_by_email(user_params[:email])
    unless @user
      render json: {
        message: "Invalid login" }, status: :ok
    end
  end
end
