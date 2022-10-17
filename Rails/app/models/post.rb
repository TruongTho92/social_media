class Post < ApplicationRecord
  has_many :likes
  belongs_to :user

  validates :image, presence: true
  validates :caption, length: { maximum: 255}
end