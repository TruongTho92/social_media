class UsersController < ApplicationController
  def check_login
    if current_user.nil?
      render json: {is_login: false}, status: :ok
    else
      render json: {
        is_login: true,
        data: {user: current_user}
      }, status: :ok
    end
  end
end