"use client";
import { createDocument } from "@/lib/actions/room.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { Button } from "./ui/button";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const addDocumentHandler = async () => {
    try {
      setLoading(true);
      const room = await createDocument({ userId, email });
      toast.success("Successfully Created!");

      if (room) {
        router.push(`/documents/${room.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.success("Creation Failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      type="submit"
      disabled={loading}
      onClick={addDocumentHandler}
      className="gradient-blue flex gap-1 shadow-md"
    >
      {!loading ? (
        <>
          <Image
            src={"/assets/icons/add.svg"}
            alt="Add"
            width={24}
            height={24}
          />
          <p className="hidden sm:block"> Start a blank document</p>
        </>
      ) : (
        <span>
          <Loader />
        </span>
      )}
    </Button>
  );
};

export default AddDocumentBtn;
