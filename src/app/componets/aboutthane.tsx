import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

//the boss
function AboutThane() {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-lg-4">
          <img
            src="/imgs/croppedphotos/ComfyUI_temp_qbqah_00095_ copy.PNG"
            className="img-fluid"
            alt="..."
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Thane Camron Lanclos</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutThane;
