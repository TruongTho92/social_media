class AddColumnToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :user_name, :string
    add_column :users, :bio, :string
    add_column :users, :gender, :string
    add_column :users, :is_admin, :boolean
    add_column :users, :posted, :text, array: true, default: []
    add_column :users, :liked, :text, array: true, default: []
    add_column :users, :commented, :text, array: true, default: []
  end
end
