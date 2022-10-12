class AddColumnToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :avatar, :string
    add_column :users, :nick_name, :string
  end
end
