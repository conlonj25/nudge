import { Skeleton } from "~/components/ui/skeleton";

const ListSkeleton = () => {
  return (
    <div className="flex flex-col items-stretch gap-4">
      <Skeleton className="h-10 rounded-md bg-pink-50" />
      <hr />
      <Skeleton className="h-10 rounded-md bg-pink-50" />
      <hr />
      <Skeleton className="h-10 rounded-md bg-pink-50" />
      <hr />
    </div>
  );
};

export default ListSkeleton;
