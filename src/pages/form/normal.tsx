import { useAuth, useUser } from "@clerk/nextjs";
import Form from "../../components/Form";

export default function create() {
    const { user } = useUser();
  return (
    <>
      <Form email={`${user?.primaryEmailAddress?.emailAddress}`} />
    </>
  );
}
