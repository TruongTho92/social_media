import React from "react";
import TableUsers from "~/Admin/Components/TableUsers/Table";
import { useAppSelector } from "~/app/hooks";
import { getAllUser } from "~/features/Admin/AllUser/allUserSlice";

type Props = {};

const ManageUsers = (props: Props) => {
  const allUser = useAppSelector(getAllUser);
  const allUserClone = [...allUser];

  return (
    <div className="section">
      <TableUsers data={allUserClone} />
    </div>
  );
};

export default ManageUsers;
