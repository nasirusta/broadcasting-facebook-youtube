import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { broadcastMemo } from "../../store/selector";
import VideoPlayer from "./VideoPlayer";
import VideosList from "./VideosList";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudioPage = () => {
  let { streamCode } = useParams();
  const broadcast = useSelector(broadcastMemo);
  const [videoListesi, setArr] = useState([]);
  let currentBroadcast = broadcast.broadcastList.find(
    (value) => value.streamKey === streamCode
  );

  useEffect(() => {
    axios
      .get(`http://netewgazete.com/public/api.php`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        setArr(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto h-full">
      <div className="w-full h-full flex">
        <div className="w-1/3 px-2 overflow-hidden">
          {videoListesi.length !== 0 && (
            <VideosList
              videoListesi={videoListesi}
              broadcastInfo={currentBroadcast}
            />
          )}
        </div>
        <div className="w-2/3 px-2 overflow-hidden">
          <VideoPlayer />
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
