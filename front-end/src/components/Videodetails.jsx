import {Link} from "react-router-dom"
function Videodetails(props) {
  function formatViews(viewString) {
    if (!viewString) return "0";

    // Remove commas and non-digit characters
    const cleaned = viewString.replace(/[^\d]/g, "");
    const num = Number(cleaned);

    if (isNaN(num)) return viewString;

    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }

  return (
      <div className={`vCard ${props.varient}`}>
        <Link to={`/videos/${props.product._id}`}>
        <div className={`vimage ${props.varient}`} >
          
          <div className={`sampleimge ${props.varient}`}>
             <img src={props.product.thumbnailUrl} className={`samvideoImage ${props.varient}`} /> 
          </div> 
           <div className={`samdeatails ${props.varient}`}>
          <div className={`samcontainer ${props.varient}`}>
            <img src={props.product.channelLogo} className={`samlogo ${props.varient}`} />
          </div> 
           <div className={`sampledetails ${props.varient}`}>
            <h4 className="truncated-multiline">{props.product.title}</h4>
            <p>{props.product.uploader}</p>
            <p>{formatViews(props.product.views)} views</p>
          </div>
        </div>
        </div>
        </Link>
      </div>
   
  );
}

export default Videodetails;
