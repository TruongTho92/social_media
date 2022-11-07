class Api::V1::PostsController < Api::V1::ApplicationController
  def index
    @posts = Post.all
    render json: {
      message: "Get all posts",
      data: {post: @posts}
    }
  end

  def show
    @post = Post.find_by(id: params[:id])
    @comments = []
    @likes = []
    @post.likes.each do |like|
      @likes << like.user
    end
    @post.comments.each do |comment|
      @comments << {id: comment.id, content: comment.content, user_id: comment.user.id ,user_name: comment.user.user_name, avatar: comment.user.avatar}
    end
    render json: {
      message: "Get Post Successfully",
      data: {
        post: @post,
        comment: @comments,
        like: @likes
      }
    }, status: :ok
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      render json: {
        message: "Create Post Successfully",
        data: {post: @post}
      }
    else
      render json: {
        message: "Create Failed!",
        data:{}
      }
    end
  end

  def update
    @post = current_user.posts.find_by(id: params[:id])
    if @post.update(post_params)
      render json: {
        message: "Update Post Successfully",
        data: {post: @post}
      }
    else
      message json: {
        message: "Update Failed!",
        data:{}
      }
    end
  end

  def destroy
    @post = current_user.posts.find_by(id: params[:id])
    if @post.destroy
      render json: {
        message: "Delete Post Successfully!",
      }
    end
  end

  def posts_of_user
    @user = User.find(params[:id])
    @post = @user.posts
    render json: {
      message: "Get Posts of User Successfully",
      data: {post: @post}
    }
  end

  def posts_of_following
    @posts = []
    current_user.following.each do |user|
      user.posts.each do |post|
        @posts << {id: post.id, image: post.image, caption: post.caption, 
                  user_id: post.user_id, avatar: post.user.avatar, user_name: post.user.user_name, 
                  nick_name: post.user.nick_name, comment: post.comments, like: post.likes}
      end
    end
    render json: {
      data: {post: @posts}
    }
  end

  def posts_with_quantity
    @posts = Post.first(params[:quantity])
    render json: {
      data: {post: @posts}
    }, status: :ok
  end

  private
  def post_params
    params.require(:post).permit(:image, :caption)
  end
end