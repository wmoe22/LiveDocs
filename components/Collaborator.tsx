import {
  removeCollaborator,
  updateDocumentAccess,
} from "@/lib/actions/room.action";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "./ui/button";

const Collaborator = ({
  collaborator,
  creatorId,
  email,
  roomId,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || "viewer");
  const [loading, setLoading] = useState(false);

  const shareDocumentHandler = async (type: string) => {
    try {
      setLoading(true);

      await updateDocumentAccess({
        roomId,
        email,
        userType: type as UserType,
        updatedBy: user,
      });
      toast.success("Successfully Share!");
    } catch (error) {
      console.log(error);
      toast.success("Sharing Failed!");
    } finally {
      setLoading(false);
    }
  };
  const removeCollaboratorHandler = async (email: string) => {
    try {
      setLoading(true);

      await removeCollaborator({
        roomId,
        email,
      });
      toast.success("Successfully removed!");
    } catch (error) {
      console.log(error);
      toast.success("Removing Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
        <div className="line-clamp-1 text-sm font-semibold leading-4 text-white ">
          <p>
            {collaborator.name}
            <span className="text-10-regular pl-2 text-blue-100">
              {loading && "updating..."}
            </span>
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>
      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100 ">Owner</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            setUserType={setUserType}
            onClickHandler={shareDocumentHandler}
            userType={userType as UserType}
          />
          <Button
            type="button"
            onClick={() => removeCollaboratorHandler(collaborator.email)}
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
