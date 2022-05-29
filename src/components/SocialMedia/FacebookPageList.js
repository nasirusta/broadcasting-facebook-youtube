import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faceebookUsertMemo, faceebookPagesMemo } from "../../store/selector";
import { faceebookPages } from "../../store/actions/faceebookPages";
import Modal from "react-modal";
import { AiFillCloseSquare } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { broadcast } from "../../store/actions/broadcast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReactLoading from "react-loading";

Modal.setAppElement("#root");

const validationSchema = Yup.object({
  title: Yup.string().required("Zorunlu alan"),
  description: Yup.string().required("Zorunlu alan"),
});

const FacebookPageList = () => {
  let navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalForStream, setModalInfo] = useState({});
  const [loading, setloading] = useState(false);

  const list = useSelector(faceebookUsertMemo);
  const fbPagesList = useSelector(faceebookPagesMemo);
  const dispatch = useDispatch();

  const openModal = (id, token, name) => {
    setModalInfo({
      pageName: name,
      pageId: id,
      pageToken: token,
      streamKey: uuidv4(),
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setloading(true);
      dispatch(
        broadcast(
          modalForStream.pageId,
          modalForStream.pageToken,
          modalForStream.pageName,
          modalForStream.pageToken,
          modalForStream.streamKey,
          values.title,
          values.description
        )
      ).then((val) => {
        navigate("/stream");
      });
    },
  });

  useEffect(() => {
    dispatch(faceebookPages(list.id, list.accessToken));
  }, []);

  return (
    <div className="container mx-auto">
      {fbPagesList.length !== 0 && (
        <ul className="w-full m-0 p-0 list-none flex flex-col items-center">
          {fbPagesList.map((data, x) => (
            <li
              key={x}
              className="w-full flex flex-row items-center border my-2 shadow bg-white border-gray-300"
            >
              <div className="bloc drop-shadow-lg">
                <img src={data.picture.data.url} alt={data.name} />
              </div>
              <div className="flex-1 mx-5 text-left">{data.name}</div>
              <div className="block mx-5">
                <button
                  onClick={() =>
                    openModal(data.id, data.access_token, data.name)
                  }
                  className="bg-blue-800 bg-opacity-90 text-white px-3 py-1 rounded"
                >
                  Sayfayı seç
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        {loading && (
          <div className=" flex flex-col items-center">
            <ReactLoading
              type={"spin"}
              color={"#398AB9"}
              height={"6%"}
              width={"6%"}
            />
          </div>
        )}
        {!loading && (
          <div className="w-full h-full border border-gray-300">
            <div className="w-full flex justify-between items-center py-1 px-3 my-auto shadow bg-blue-900 bg-opacity-80 text-white">
              <div className="block flex-1">
                <h2 className=" w-full font-semibold">
                  {modalForStream.pageName}
                </h2>
              </div>
              <div className="block">
                <button onClick={closeModal}>
                  <AiFillCloseSquare size={30} />
                </button>
              </div>
            </div>
            <div className="p-4 w-full h-auto">
              <form onSubmit={handleSubmit}>
                <div className="w-full block mb-4">
                  {errors.title && (
                    <div className="my-2 block bg-red-600 bg-opacity-70 uppercase text-white py-2 px-4">
                      {errors.title}
                    </div>
                  )}
                  <input
                    name="title"
                    placeholder="Yayın başlığı"
                    onChange={handleChange}
                    values={values.title}
                    className="border w-full border-gray-300 p-2 focus:border-gray-300 outline-none"
                  />
                </div>
                <div className="w-full block mb-4">
                  {errors.description && (
                    <div className="my-2 block bg-red-600 bg-opacity-70 uppercase text-white py-2 px-4">
                      {errors.description}
                    </div>
                  )}
                  <textarea
                    name="description"
                    placeholder="Yayın açıklaması"
                    onChange={handleChange}
                    values={values.description}
                    className="border w-full border-gray-300 p-2 focus:border-gray-300 outline-none"
                  ></textarea>
                </div>
                <div className="w-full block">
                  <button className="block bg-blue-700 bg-opacity-80 hover:bg-opacity-100 text-white rounded py-2 px-4">
                    Yayını Oluştur
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FacebookPageList;
