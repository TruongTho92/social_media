class Storage < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :posts

  validates :user_id, uniqueness: true
end