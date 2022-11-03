class CreateStoragePost < ActiveRecord::Migration[6.1]
  def change
    create_table :storages do |t|
      t.belongs_to :user
      t.timestamps
    end

    create_table :posts_storages, id: false do |t|
      t.belongs_to :storage
      t.belongs_to :post
      t.timestamps
    end
  end
end
