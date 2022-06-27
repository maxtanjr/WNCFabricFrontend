import { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";


const VideoFeed = (props) => {
    const videoRef = useRef(null);
    const [player, setPlayer] = useState(null);
    const url = props.src;

    useEffect(() => {
      // make sure Video.js player is only initialized once
      if (!player) {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        setPlayer(
          videojs(videoElement, {autoplay:true}, () => {
            console.log("player is ready");
          })
        );

      }
    }, [videoRef]);
  
    useEffect(() => {
      return () => {
        if (player) {
          player.dispose();
        }
      };
    }, [player]);
  
    return (
      <div>
        <video className="video-js" ref={videoRef} controls>
          <source src={url} type="application/x-mpegURL" />
        </video>
      </div>
    );
  };
  
  
  export default VideoFeed;