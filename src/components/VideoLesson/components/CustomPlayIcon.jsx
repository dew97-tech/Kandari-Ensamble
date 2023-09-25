import { BsFillPlayFill } from "react-icons/bs";

const CustomPlayIcon = ({ onPlay }) => (
   <div className="play-icon-container" onClick={onPlay}>
      <BsFillPlayFill />
   </div>
);

export default CustomPlayIcon;
