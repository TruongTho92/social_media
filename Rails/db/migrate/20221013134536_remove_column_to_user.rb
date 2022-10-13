class RemoveColumnToUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :posted, :text
    remove_column :users, :commented, :text
    remove_column :users, :liked, :text
  end
end
