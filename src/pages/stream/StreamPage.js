import { useSelector } from "react-redux";
import { broadcastMemo } from "../../store/selector";
import { IoEnterSharp } from "react-icons/io5";

const StreamPage = () => {
  const list = useSelector(broadcastMemo);

  return (
    <div className="w-full h-full">
      <div className="container mx-auto">
        <div className="w-full text-center">
          {list.broadcastList.length === 0 && (
            <div className="block p-4 border bg-white border-gray-300">
              <h1> Henüz bir yayın kaydı oluşturulmadı</h1>
            </div>
          )}
          {list.broadcastList.length !== 0 && (
            <ul className="block w-full h-auto m-0 p-0">
              {list.broadcastList.map((data, x) => (
                <li
                  className="w-full flex justify-between items-center py-2 px-4 border shadow bg-white"
                  key={x}
                >
                  <div className="flex items-center flex-1">
                    <ul className="block min-w-max mr-4">
                      {data.pages.map((p, i) => (
                        <li
                          className="block border-b border-gray-500 py-1 px-3 mb-2 last:mb-0"
                          key={i}
                        >
                          {p.facebook.map((fbpage, x) => (
                            <h1 key={x}>{fbpage.name}</h1>
                          ))}
                        </li>
                      ))}
                    </ul>
                    <div className="w-full text-center">
                      <h2 className=" text-blue-700 font-semibold">
                        {data.title}
                      </h2>
                    </div>
                  </div>
                  <div className="block">
                    <a
                      className="flex items-center border border-gray-400 text-gray-700 rounded"
                      href={`/${data.streamKey}`}
                    >
                      <span className=" px-3">Stüdyoya Git</span>
                      <IoEnterSharp size={34} />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
