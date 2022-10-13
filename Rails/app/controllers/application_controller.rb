class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  acts_as_token_authentication_handler_for User, {fallback: :none}
  skip_before_action :verify_authenticity_token

  private
  def ensure_params_exist
    if params[:user].blank?
      render json: {
        message: "Missing Params"
      }, status: 422
    end
  end
end
