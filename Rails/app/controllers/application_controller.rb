class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  acts_as_token_authentication_handler_for User, {fallback: :none}
  private
  def current_user
    @current_user ||= User.find_by authentication_token: request.headers["Authorization"]
  end

  def ensure_params_exist
   return unless params[:user].blank?
    render json: {message: "Missing params"}, status: 422
  end

  def load_user_authentication
    @user = User.find_by_email user_params[:email]
    return login_invalid unless @user
  end

  def login_invalid
    render json:
      {message: "Invalid login"}, status: 200
  end
end
