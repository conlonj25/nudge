import { getServerAuthSession } from "~/server/auth";
import { MyHabitsContainer } from "../_components/my-habits";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return <MyHabitsContainer />;
}
