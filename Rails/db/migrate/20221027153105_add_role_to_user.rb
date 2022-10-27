class AddRoleToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :is_supervisor, :boolean, default: false
  end
end
