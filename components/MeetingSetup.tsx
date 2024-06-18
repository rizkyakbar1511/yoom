import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default function MeetingSetup({
  setIsSetupComplete,
}: {
  setIsSetupComplete: Dispatch<SetStateAction<boolean>>;
}) {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();

  if (!call) throw new Error("useCall must be used within StreamCallProvider");

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call.camera, call.microphone]);

  return (
    <div className="flex-center flex-col h-screen w-full text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <Checkbox
          className="border-white"
          id="mic-cam-toggle"
          onCheckedChange={(checked) => setIsMicCamToggledOn(checked as boolean)}
        />
        <Label htmlFor="mic-cam-toggle">join with mic and camera off</Label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join({ create: true });
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
}
