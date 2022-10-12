class Api::V1::ApplicationController < ApplicationController
  def is_logged_in?
    @current_user = User.find_by(authentication_token: request.headers["token"])
    if @user
      render json: {
        message: "Is login",
        is_success: true,
        data: {user: @current_user}
      }, status: :ok
    else
      render json: {
        message: "Please login first",
        is_success: false
      }, status: 401
    end
  end

  def current_user
    @current_user = User.find_by(authentication_token: request.headers["token"])
  end
end