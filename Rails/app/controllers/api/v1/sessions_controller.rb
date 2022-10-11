class Api::V1::SessionsController < Devise::SessionsController
  before_action :ensure_params_exist, only: [:create, :destroy]
  before_action :load_user, only: [:create, :destroy]
  include CurrentUserConcern

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
      }, status: 401
    end
  end

  def destroy
    if @user.authentication_token == user_params[:authentication_token]
      sign_out @user
      session.delete :user_id
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

  def load_user
    @user = User.find_by_email user_params[:email]
    return render json:{message: "Email doesn't exists"}, status: 401 unless @user
  end
end