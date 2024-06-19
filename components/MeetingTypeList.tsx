import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Input } from "./ui/input";

export default function MeetingTypeList() {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime)
        return toast({
          title: "Please select a date and time",
        });
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) router.push(`/meeting/${call.id}`);
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        className="bg-orange-1"
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        className="bg-blue-500"
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        className="bg-purple-1"
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push("/recordings")}
      />
      <HomeCard
        className="bg-yellow-1"
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <Label
              className="text-base font-normal leading-[22px] dark:text-sky-2"
              htmlFor="description"
            >
              Add a description
            </Label>
            <Textarea
              id="description"
              className="darl:border-none dark:bg-slate-700 dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0"
              onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
            />
            <Label
              className="text-base font-normal leading-[22px] dark:text-sky-2"
              htmlFor="datetime"
            >
              Add a description
            </Label>
            <DatePicker
              id="datetime"
              selected={values.dateTime}
              onChange={(date) => setValues((prev) => ({ ...prev, dateTime: date! }))}
              showTimeSelect
              customInput={
                <Input className="w-full rounded dark:bg-slate-700 dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0" />
              }
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Meeting Link copied to clipboard" });
          }}
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          className="dark:border-none dark:bg-slate-700 dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0"
          placeholder="Meeting Link"
          onChange={(e) => setValues((prev) => ({ ...prev, link: e.target.value }))}
        />
      </MeetingModal>
    </section>
  );
}
