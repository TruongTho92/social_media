class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  acts_as_token_authentication_handler_for User, {fallback: :none}
  skip_before_action :authenticate_user_from_token

  def load_user_authentication
    if current_user
      return current_user
    else
      render json: {
        message: "Please login first",
        is_success: false,
        data: {},
      }, status: 400
    end
  end

  private
  def current_user
    @current_user ||= User.find_by(authentication_token: request.headers["Authorization"])
  end

  def authenticate_user_from_token
    render json: {message: "You are not authenticated"},
      status: 401 if current_user.nil?
  end

  def ensure_params_exist
    return unless params[:user].blank?
     render json: {message: "Missing params"}, status: 422
  end
end
