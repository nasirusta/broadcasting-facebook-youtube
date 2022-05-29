import { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import { faceebookUser } from "../../store/actions/faceebookUser";
import FacebookPageList from "./FacebookPageList";

const FacebookConnect = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const responseFacebook = async (response) => {
    if (response.accessToken) {
      await dispatch(faceebookUser(response));
      setUser(response);
    }
  };

  return (
    <div className="w-full h-auto">
      {!user && (
        <FacebookLogin
          appId="304299241557573"
          autoLoad={false}
          callback={responseFacebook}
          render={(renderProps) => (
            <button
              className="bg-blue-900 bg-opacity-80 text-white py-2 px-3"
              onClick={renderProps.onClick}
            >
              Facebook ile bağlan
            </button>
          )}
        />
      )}
      {user && <FacebookPageList />}
    </div>
  );
};

export default FacebookConnect;
