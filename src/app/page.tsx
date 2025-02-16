import { getServerAuthSession } from "~/server/auth";
import { DailyHabits } from "./_components/daily-habits";
import PlaygroundDailyHabits from "./_components/playground-daily-habits";

export default async function Page() {
  const session = await getServerAuthSession();

  return session ? <DailyHabits /> : <PlaygroundDailyHabits />;
}
