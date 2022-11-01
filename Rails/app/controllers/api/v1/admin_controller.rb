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
      @posts = []
      Post.all.each do |post|
        @posts << { id: post.id, caption: post.caption, image: post.image, user_id: post.user_id,
                    created_at: post.created_at, update_at: post.updated_at, avatar: post.user.avatar,
                    user_name: post.user.user_name
                  }
      end
      render json: {
        data: { post: @posts }
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
