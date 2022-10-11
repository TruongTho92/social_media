Rails.application.routes.draw do
  devise_for :users
    namespace :api, default: {fomat: :json} do
      namespace :v1 do
        devise_scope :user do
          post "sign_up", :to => 'registrations#create'
          post "sign_in", :to => 'sessions#create'
          delete "sign_out", :to => 'sessions#destroy'
          get 'logged_in', :to => 'sessions#is_logged_in?'
      end
      resources :users
    end
  end
end
