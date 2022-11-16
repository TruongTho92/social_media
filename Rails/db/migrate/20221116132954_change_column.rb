class ChangeColumn < ActiveRecord::Migration[6.1]
  def change
    remove_column :posts, :image, :string
    add_column :posts, :image, :string, array: true
  end
end
