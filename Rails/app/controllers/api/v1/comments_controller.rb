class Api::V1::CommentsController < Api::V1::ApplicationController
  before_action :post

  def create
    @comment = @post.comments.new(user_id: current_user.id, content: params[:comment][:content])
    if @comment.save
      render json: {
        data:{comment: @comment}
      }, status: :ok
    else
      render json: {
        message: "Create Failed!"
      }
    end
  end

  def update
    @comment = Comment.find_by(id: params[:id])
    if @comment
      @comment.update(content: params[:comment][:content])
      render json: {
        data:{comment: @comment}
      }, status: :ok
    else
      render json:{
        message: "Update Failed!"
      }, status: :ok
    end
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    if @comment
      render json: {
        message: "Delete Successfully!"
      },status: :ok
    else
      render json: {
        message: "Delete Failed!"
      },status: :ok
    end
  end

  private
  def post
    @post = Post.find(params[:post_id])
  end
end