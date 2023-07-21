import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import coolendarLogo from "../images/Coolendar logo  removed background - light.png";
import { supabase } from "../../supabase";
import "../css/Logo.css";

// eslint-disable-next-line react/prop-types
function Logo({ token }) {

  const navigate = useNavigate();
  const [profileTable, setProfileTable] = useState([]);
  

  function toUserScreen() {
    navigate('/coolendar');
  }

  useEffect(() => {
    const fetchProfileTable = async () => {
        try {
            // eslint-disable-next-line react/prop-types
            const user_id = token.user.id;
            const { data, error } = await supabase
                .from('profiletable')
                .select()
                .eq('user_id', user_id);

            if (error) {
                throw error;
            }

            setProfileTable(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    fetchProfileTable();
}, []);

  return (


    <div className="logo">
      <img className="logo-img" src={coolendarLogo} alt="logo" onClick={toUserScreen} />
      {/* eslint-disable-next-line react/prop-types */}
      <div className="welcome">Welcome {profileTable.map((x) => x.username)}</div>
    </div>
  );
}

export default Logo;