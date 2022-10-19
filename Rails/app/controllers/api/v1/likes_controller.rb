class Api::V1::LikesController < Api::V1::ApplicationController
  before_action :post

  def create
    if @post.likes.where(user_id:current_user.id).empty?
      @like = @post.likes.create(user_id: current_user.id)
      render json: {
        message: "Create Successfully",
        data: {like: @like}
      }, status: :ok
    else
      render json: {
        message: "Create Failed!",
        data: {}
      }, status: :ok
    end
  end
  
  def destroy
    @like = @post.likes.find_by(user_id:current_user.id)
    if @like
      @like.destroy
      render json: {
        message: "Delete Successfully",
      }, status: :ok
    else
      render json: {
        message: "Delete Failed!"
      }, status: :ok
    end
  end

  private
  def post
    @post = Post.find(params[:post_id])
  end
end