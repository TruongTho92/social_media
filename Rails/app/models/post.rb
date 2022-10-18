class Post < ApplicationRecord
  has_many :likes, dependent: :destroy
  belongs_to :user

  validates :image, presence: true
  validates :caption, length: { maximum: 255}
end