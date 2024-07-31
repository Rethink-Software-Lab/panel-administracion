import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonMasVendidos() {
  return (
    <>
      <li className="flex items-center justify-between px-3 py-2  rounded-lg ">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div>
            <Skeleton className="w-20 h-4 rounded-lg mb-2" />
            <Skeleton className="w-10 h-4 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-end">
          <Skeleton className="w-16 h-4 rounded-lg mb-2" />
          <Skeleton className="w-10 h-4 rounded-lg" />
        </div>
      </li>
      <li className="flex items-center justify-between px-3 py-2  rounded-lg ">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div>
            <Skeleton className="w-20 h-4 rounded-lg mb-2" />
            <Skeleton className="w-10 h-4 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-end">
          <Skeleton className="w-16 h-4 rounded-lg mb-2" />
          <Skeleton className="w-10 h-4 rounded-lg" />
        </div>
      </li>
      <li className="flex items-center justify-between px-3 py-2  rounded-lg ">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div>
            <Skeleton className="w-20 h-4 rounded-lg mb-2" />
            <Skeleton className="w-10 h-4 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-end">
          <Skeleton className="w-16 h-4 rounded-lg mb-2" />
          <Skeleton className="w-10 h-4 rounded-lg" />
        </div>
      </li>
      <li className="flex items-center justify-between px-3 py-2  rounded-lg ">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div>
            <Skeleton className="w-20 h-4 rounded-lg mb-2" />
            <Skeleton className="w-10 h-4 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-end">
          <Skeleton className="w-16 h-4 rounded-lg mb-2" />
          <Skeleton className="w-10 h-4 rounded-lg" />
        </div>
      </li>
    </>
  );
}
