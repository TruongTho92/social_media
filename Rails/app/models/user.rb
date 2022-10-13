class User < ApplicationRecord
  acts_as_token_authenticatable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable, :trackable

  validates :user_name, length: { maximum: 20}, presence: true
  validates :avatar, presence: true
  validates :password, length: { maximum: 64 }, confirmation: true
end
