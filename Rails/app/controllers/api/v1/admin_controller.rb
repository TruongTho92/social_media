class Api::V1::AdminController < Api::V1::ApplicationController
  def index
    if current_user.is_supervisor
      users = User.all - [current_user]
      @users = []
      users.each do |user|
        unless user.is_admin || user.is_supervisor
          @users << user
        end
      end
      render json: {
        data: {user: @users}
      }, status: :ok
    elsif current_user.is_admin
      users = User.all - [current_user]
      @users = []
      users.each do |user|
        unless user.is_admin
          @users << user
        end
      end
      render json: {
        data: {user: @users}
      }, status: :ok
    else
      render json: {
        message: "Can't fetch data"
      }, status: :ok
    end
  end

  def destroy
    if current_user.is_admin || current_user.is_supervisor
      User.find(params[:id]).destroy
      render json: {
        message: "Delete Successfully"
      }, status: :ok
    else
      render json: {
        message: "Delete Failed"
      }, status: :ok
    end
  end

  def post_admin
    if current_user.is_admin || current_user.is_supervisor
      @posts = Post.all
      render json: {
        data: {post: @posts}
      }, status: :ok
    else
      render json: {
        message: "Can't fetch data"
      }
    end
  end

  def delete_post_admin
    if current_user.is_admin || current_user.is_supervisor
      if post = Post.find_by(id: params[:id])
        post.destroy
        render json: {
          message: "Detele Successfully"
        }, status: :ok
      else
        render json: {
          message: "Detele Failed"
        }
      end
    end
  end
end
