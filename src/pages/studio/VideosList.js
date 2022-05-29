import { useState, useEffect } from "react";
import { arrayMoveImmutable } from "array-move";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import { MdPlayArrow } from "react-icons/md";
import { FaArrowCircleRight } from "react-icons/fa";
import { ImStop } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { broadcastLive } from "../../store/actions/broadcastLive";
import { broadcastLiveMemo } from "../../store/selector";
import { useNavigate } from "react-router-dom";

const VideosList = ({ videoListesi, broadcastInfo }) => {
  console.log(broadcastInfo);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({
    videoName: videoListesi[0]?.filename,
    videoIndex: 0,
  });
  const [videos, setVideos] = useState(videoListesi);

  const liveX = useSelector(broadcastLiveMemo);
  let currentLiveIndex = liveX.broadcastList.findIndex(
    (value) => value.streamKey === broadcastInfo.streamKey
  );
  const currentLive = liveX.broadcastList[currentLiveIndex];

  const convertHMS = (value) => {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (value > 3599) {
      return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
    } else {
      return minutes + ":" + seconds; // Return is MM : SS
    }
  };

  const moveDown = async () => {
    if (selected?.videoIndex !== videos.length - 1) {
      const newArray = arrayMoveImmutable(
        videos,
        selected?.videoIndex,
        selected?.videoIndex + 1
      );
      setVideos(newArray);
      updateSelected(selected?.videoName, selected?.videoIndex + 1);
      console.log(newArray);
    }
  };

  const moveUp = () => {
    if (selected?.videoIndex !== 0) {
      const newArray = arrayMoveImmutable(
        videos,
        selected?.videoIndex,
        selected?.videoIndex - 1
      );
      setVideos(newArray);
      updateSelected(selected?.videoName, selected?.videoIndex - 1);
      console.log(newArray);
    }
  };

  const updateSelected = (videoName, videoIndex) => {
    setSelected({ videoName: videoName, videoIndex: videoIndex });
    if (currentLive.live === "streaming") {
      streamRequest(videoIndex);
    }
  };

  const streamRequest = (index) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/stream`, {
        streamUrl: broadcastInfo.fbStreamData.secure_stream_url,
        videoName: videos[index]?.filename,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((res_error) => {
        console.log(res_error);
      });
  };

  const goLive = () => {
    dispatch(broadcastLive(currentLiveIndex, "streaming"));
    const getSecond = Math.floor(videos[selected?.videoIndex]?.duration) * 1000;

    streamRequest(selected?.videoIndex);

    setTimeout(() => {
      if (selected?.videoIndex !== videos.length - 1) {
        updateSelected(
          videos[selected?.videoIndex + 1]?.filename,
          selected?.videoIndex + 1
        );
      }

      streamRequest(selected?.videoIndex + 1);
    }, getSecond);
  };

  const stopLive = () => {
    dispatch(broadcastLive(currentLiveIndex, "end"));

    broadcastInfo.pages.map((data, x) => {
      data.facebook.map((fb, i) => {
        axios
          .post(
            `https://graph.facebook.com/${broadcastInfo?.fbStreamData?.id}`,
            {
              access_token: fb.pageToken,
              end_live_video: true,
            }
          )
          .then((response) => {
            console.log(response.data);
            navigate("/stream");
          })
          .catch((res_error) => {
            console.log(res_error);
          });
      });
    });
  };

  useEffect(() => {
    if (selected?.videoIndex === videos.length - 1) {
      const getSecondLast =
        Math.floor(videos[selected?.videoIndex]?.duration) * 1000;
      setTimeout(() => {
        stopLive();
      }, getSecondLast);
    }
  }, [selected?.videoIndex]);

  return (
    <div className="w-full h-full border bg-white border-gray-300">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="playlist">
          <ul>
            {videos !== 0 &&
              videos.map((data, i) => (
                <li
                  className={
                    data.filename === selected?.videoName ? "activeVideo" : null
                  }
                  key={i}
                  onClick={() => updateSelected(data.filename, i)}
                >
                  <div className="flex items-center">
                    {data.filename === selected?.videoName ? (
                      <MdPlayArrow size={22} className="mr-1" />
                    ) : null}
                    {data.filename}
                  </div>
                  <div>{convertHMS(data.duration)}</div>
                </li>
              ))}
          </ul>
        </div>
        <div className="playlist-bottom">
          <div className="go-live">
            {currentLive.live && currentLive.live !== "end" && currentLive.live !== "streaming" && (
              <button type="button" onClick={() => goLive()}>
                Yayına Başla <FaArrowCircleRight className="ml-1" size={20} />
              </button>
            )}
            {currentLive.live && currentLive.live === "streaming" && (
              <button type="button" onClick={() => stopLive()}>
                Yayını Bitir <ImStop className="ml-1" size={20} />
              </button>
            )}
          </div>
          {currentLive.live && currentLive.live !== "end" && currentLive.live !== "streaming" && (
            <div className="events">
              <button type="button">
                <BsFillArrowDownSquareFill
                  onClick={() => moveDown()}
                  size={26}
                />
              </button>
              <button type="button">
                <BsFillArrowUpSquareFill onClick={() => moveUp()} size={26} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideosList;
