import Skeleton from "../../components/Skeleton";
import { twMerge } from "tailwind-merge";

export function CategorySkeleton({
  length = 3,
  className,
}: {
  length: number;
  className?: string;
}) {
  const skeletons: any[] = [];
  for (let i = 0; i < length; i++) {
    skeletons.push(
      <div
        key={i}
        className={twMerge("w-10rem max-w-full px-4 py-4", className)}
      >
        <div className="w-full border shadow-sm rounded-xl">
          <div className="w-full px-4 py-2">
            <Skeleton className="w-full h-10" />
          </div>
          <hr />
          <div className="px-3 child:my-3">
            <Skeleton noOfLines={3} className="w-full h-8" />
          </div>
        </div>
      </div>
    );
  }
  return skeletons;
}

export default CategorySkeleton;
