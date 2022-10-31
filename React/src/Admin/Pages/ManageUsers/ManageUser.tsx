import React from "react";
import TableUsers from "~/Admin/Components/TableUsers";
import { useAppSelector } from "~/app/hooks";
import { getAllUser } from "~/features/Admin/AllUser/allUserSlice";

type Props = {};

const ManageUsers = (props: Props) => {
  const allUser = useAppSelector(getAllUser);
  const allUserClone = [...allUser].sort((a, b) => a.id - b.id);

  return (
    <div className="section">
      <TableUsers data={allUserClone} />
    </div>
  );
};

export default ManageUsers;
