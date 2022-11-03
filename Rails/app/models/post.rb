class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_and_belongs_to_many :storages
  belongs_to :user

  validates :image, presence: true
  validates :caption, length: { maximum: 255}
end