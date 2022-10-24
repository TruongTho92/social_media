class Api::V1::RelationshipsController < Api::V1::ApplicationController
  def create
    user = User.find(params[:id])
    if current_user.following.include?(user)
      render json: {
        message: "User followed"
      }, status: :ok
    else
      current_user.follow(user)
      render json: {
        message: "Follow successfully",

      }, status: :ok
    end
  end

  def destroy
    user = User.find(params[:id])
    if current_user.following.include?(user)
      current_user.unfollow(user)
      render json: {
        message: "Unfollow successfully"
      }, status: :ok
    else
      render json: {
        message: "User not following"
      }, status: :ok
    end
  end
end