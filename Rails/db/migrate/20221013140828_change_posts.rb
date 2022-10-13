class ChangePosts < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :title, :string
    remove_column :posts, :description, :string
    add_column :posts, :caption, :string
    add_column :posts, :image, :string
    add_reference :posts, :user, foreign_key: true
  end
end
