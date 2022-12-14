class Api::V1::StoragesController < Api::V1::ApplicationController
  def index
    if Storage.find_by(user_id: current_user.id).nil?
      Storage.create(user_id: current_user.id)
      current_user.storage.posts.each do |post|
      end
      render json: {
        data: { storage: current_user.storage.posts }
      }, status: :ok
    else
      @storage = []
      current_user.storage.posts.order(created_at: :desc).each do |post|
        @storage << { id: post.id, caption: post.caption, image: post.image,
                      user_id: post.user_id, current_user_id: current_user.id }
      end
      render json: {
        data: { storage: @storage }
      }
    end
  end

  def create
    if Storage.find_by(user_id: current_user.id).nil?
      Storage.create(user_id: current_user.id)
      post = Post.find(params[:id])
      current_user.storage.posts << post
      render json: {
        message: "Create Successfully!",
        data: { storage: current_user.storage.posts }
      }, status: :ok
    else
      post = Post.find(params[:id])
      if current_user.storage.posts.exclude?(post)
        current_user.storage.posts << post
        render json: {
          message: "Create Successfully!",
          data: { storage: current_user.storage.posts.order(created_at: :desc) }
        }, status: :ok
      else
        render json: {
          message: "Post Already Exist",
        }, status: :ok
      end
    end
  end

  def delete
    post = Post.find(params[:id])
    if current_user.storage.posts.include?(post)
      current_user.storage.posts.delete(post)
      render json: {
        message: "Delete Successfully"
      }, status: :ok
    else
      render json: {
        message: "Delete Failed"
      }, status: :ok
    end
  end
end
