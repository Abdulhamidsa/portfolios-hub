import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="container mx-auto p-4 dark">
      <Skeleton className="w-48 h-8 mb-6 bg-muted" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Skeleton className="h-[300px] w-full rounded-lg bg-muted" />
        </div>
        <Skeleton className="h-[300px] w-full rounded-lg bg-muted" />
        <Skeleton className="h-[200px] w-full rounded-lg md:col-span-3 bg-muted" />
      </div>
    </div>
  );
};
export default DashboardSkeleton;
