import { Skeleton } from "~/components/ui/skeleton";

const ListSkeleton = () => {
  return (
    <div className="flex flex-col items-stretch gap-4">
      <Skeleton className="h-10 rounded-md bg-primary" />
      <hr />
      <Skeleton className="h-10 rounded-md bg-primary" />
      <hr />
      <Skeleton className="h-10 rounded-md bg-primary" />
      <hr />
    </div>
  );
};

export default ListSkeleton;
