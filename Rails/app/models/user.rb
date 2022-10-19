class User < ApplicationRecord
  acts_as_token_authenticatable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable, :trackable

  validates :user_name, length: { maximum: 20}, presence: true, :on => :update
  validates :avatar, presence: true, :on => :update
  validates :password, length: { maximum: 64 }, confirmation: true, :on => :update

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
end
