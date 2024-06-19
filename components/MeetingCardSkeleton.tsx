import { Skeleton } from "@/components/ui/skeleton";
import { avatarImages } from "@/constants";

export default function MeetingCardSkeleton() {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] dark:bg-slate-800 bg-gray-50 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Skeleton className="h-12 w-12 rounded bg-slate-400/50" />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[250px] bg-slate-400/50" />
            <Skeleton className="h-4 w-[200px] bg-slate-400/50" />
          </div>
        </div>
      </article>
      <article className="flex justify-center relative">
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((_, index) => (
            <Skeleton key={index} className="h-12 w-12 rounded-full bg-slate-400/50" />
          ))}
          <Skeleton className="h-12 w-12 rounded-full bg-slate-400/50" />
        </div>
      </article>
    </section>
  );
}
