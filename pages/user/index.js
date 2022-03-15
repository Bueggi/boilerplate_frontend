import React, { useContext, useEffect } from "react";
import { Context } from "../../context/index";

const UserIndex = () => {
  const [hidden, setHidden] = useState(true);
  const { state } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await fetch(`${process.env.APIURL}/getMe`);
        console.log(data);
        setHidden(false);
      } catch (error) {
        setHidden(false);
      }
    };
  }, []);

  return <div>user</div>;
};

export default UserIndex;
