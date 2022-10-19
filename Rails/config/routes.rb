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
      post "update_user", :to => 'users#update'
      get "logged_in", :to => 'application#is_logged_in?'
      get "load_user", :to => 'application#current_user'

      resources :posts do
        resources :likes, only:[:create, :destroy]
        resources :comments, only:[:create, :update, :destroy]
      end
      get "posts_of_user/:id", :to => 'posts#posts_of_user'
    end
  end
end
