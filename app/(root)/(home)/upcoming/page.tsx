import CallList from "@/components/CallList";

export default function Upcoming() {
  return (
    <section className="flex size-full flex-col gap-10 dark:text-white text-gray-700">
      <h1 className="text-3xl font-bold dark:text-white text-gray-700">Upcoming</h1>
      <CallList type="upcoming" />
    </section>
  );
}
