Rails.application.routes.draw do
  devise_for :users
  namespace :api, default: {fomat: :json} do
    namespace :v1 do
      devise_scope :user do
        post "registration", :to => 'registrations#register'
        post "sign_in", :to => 'sessions#create'
        post "sign_out", :to => 'sessions#destroy'
      end
      get "users", :to => 'users#index'
      get "users/:id", :to => 'users#show'
      post "update_user", :to => 'users#update'
      get "logged_in", :to => 'application#is_logged_in?'
      get "load_user", :to => 'application#current_user'
      post "/search", :to => 'users#search'
      resources :users do
        member do
          get :following, :followers
        end
      end
      resources :relationships, only: [:create, :destroy]

      resources :posts do
        resources :likes, only:[:create, :destroy]
        resources :comments, only:[:create, :update, :destroy]
      end
      get "posts_of_user/:id", :to => 'posts#posts_of_user'
      get "posts_of_following", :to => 'posts#posts_of_following'
      post "posts_with_quantity", :to => 'posts#posts_with_quantity'

      get "users_admin", :to => 'admin#index'
      delete "delete_user_admin/:id", :to => 'admin#destroy'
      get "posts_admin", :to => 'admin#post_admin'
      delete "delete_post_admin/:id", :to => 'admin#delete_post_admin'
    end
  end
end
