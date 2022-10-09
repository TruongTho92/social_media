Rails.application.routes.draw do
  devise_for :users
    namespace :api, default: {fomat: :json} do
      namespace :v1 do
        devise_scope :user do
          post "sign_up", :to => 'registrations#create'
          post "sign_in", :to => 'sessions#create'
          delete "sign_out", :to => 'sessions#destroy'
      end
      resources :users
    end
  end
  get "api/v1/load-user" => 'application#load_user_authentication'
end
