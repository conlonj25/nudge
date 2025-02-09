"use client";

import { api } from "~/trpc/react";
import { Card } from "~/components/ui/card";
import AddHabitDialog from "./add-habit-dialog";
import EditHabitForm from "./edit-habit-form";
import ListSkeleton from "./skeletons/list-skeleton";
import { Fragment } from "react";
import { useSession } from "next-auth/react";

export function MyHabits() {
  const { isPending, data: myHabits } = api.habit.getByUser.useQuery();

  if (isPending) {
    return <ListSkeleton />;
  }

  return myHabits ? (
    myHabits.map((habit) => (
      <Fragment key={habit.id}>
        <EditHabitForm habit={habit} />
        <hr />
      </Fragment>
    ))
  ) : (
    <p>You have no habits yet.</p>
  );
}

export function MyHabitsContainer() {
  const { data: session } = useSession();

  return (
    <Card className="flex flex-col gap-4 p-4">
      <span>My habits</span>
      {session?.user ? <MyHabits /> : <ListSkeleton />}
      <AddHabitDialog />
    </Card>
  );
}
