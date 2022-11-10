import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const LikeButton = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div>
      <FontAwesomeIcon
        icon={isHover ? fasHeart : farHeart}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        color="red"
        size="lg"
        className="heart-icon"
      />
    </div>
  );
};

export default LikeButton;
