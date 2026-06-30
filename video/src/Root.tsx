import "./index.css";
import { Composition } from "remotion";
import { WebsiteTour } from "./WebsiteTour";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WebsiteTour"
        component={WebsiteTour}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
