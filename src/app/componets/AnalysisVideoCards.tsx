import { Suspense } from "react";
import Row from "react-bootstrap/esm/Row";
import Link from "next/link";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";
import YouTube from "react-youtube";

type AnalysisVideosData = {
  id: string;
  videoUrl: string;
  title: string;
  breakdown: string;
  day: string;
  date: string;
};
const opts = {
  height: "300vh",
  width: "100%",
  playerVars: {
    autoplay: 0,
  },
};

//video Analysis Video Card will be put in a list
export default function AnalysisVideoCard(
  this: any,
  props: AnalysisVideosData
) {
  const renderTooltip = (thing: any) => (
    <Tooltip id="button-tooltip" {...thing}>
      Link If Video Does Not Display
    </Tooltip>
  );

  return (
    <>
      <Row className="">
        <div className="card container p-2">
          <div>
            <YouTube videoId={props.videoUrl} opts={opts} />{" "}
          </div>

          <div className="card-body">
            <h5 className="card-title">
              {props.title} : {props.date}
            </h5>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Link
                href={"https://www.youtube.com/watch?v=" + props.videoUrl}
                target="_blank"
                passHref={true}
              >
                <Button>Link To YouTube</Button>
              </Link>
            </OverlayTrigger>
            <p className="card-text"> {props.breakdown}</p>
          </div>
        </div>
      </Row>
    </>
  );
}
