import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { supabase } from '../../../supabase';
import AddProfile from "./AddProfile";
import "../../css/ProfilePage.css"

function Profile({ token }) {
    Profile.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    };

    const [profileTable, setProfileTable] = useState([]);
    useEffect(() => {
        const fetchProfileTable = async () => {
            try {
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

    const fetchProfileTable = async () => {
        try {
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

    const [editingProfile, setEditingProfile] = useState(null);
    const [profile, setProfile] = useState({
        user_id: "",
        username: "",
        birthday: ""
    });

    function handleEditProfile(d) {
        console.log(d);
        setEditingProfile(d);
        setProfile({
            user_id: d.user_id,
            username: d.username,
            birthday: profile.birthday
        });
    }

    function handleProfileChange(event) {
        const { name, value } = event.target;
        setProfile((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        console.log(profile);
    }

    async function handleUpdateProfile(e) {
        e.preventDefault();
        if (profile.username === "" || profile.birthday === "") {
            alert("Please insert content");
        } else {
            try {
                const { data, error } = await supabase
                    .from('profiletable')
                    .update({
                        username: profile.username,
                        birthday: profile.birthday
                    })
                    .eq('id', editingProfile.id);

                if (error) {
                    throw error;
                }

                console.log(data);
                location.reload();
                setEditingProfile(null);
                setProfile({
                    user_id: "",
                    username: "",
                    birthday: ""
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function handleDeleteProfile(userid) {
        try {
            const { data, error } = await supabase
                .from('profiletable')
                .delete()
                .eq('id', userid);

            if (error) {
                throw error;
            }

            console.log(data);
            location.reload();
            fetchProfileTable();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="Username">
            {profileTable.length === 0 ? (
                <>
                    <div>Tell me more about yourself!</div>
                    <div>
                        <AddProfile token={token} />
                    </div>
                </>
            ) : (
                profileTable.map((x) => (
                    <div key={x.id}>
                        <div>Your username is: {x.username} </div>
                        <div>Your birthday is: {x.birthday} </div>
                        <button className="submit" type="submit" onClick={() => handleEditProfile(x)}>
                            Edit Profile
                        </button>
                        <button className="submit" type="button" onClick={() => handleDeleteProfile(x.id)}>
                            Remove Profile
                        </button>
                        {editingProfile ? (
                            <form className="form" onSubmit={handleUpdateProfile}>
                                <div className="title"> Edit Profile </div>
                                <div>
                                    Username:{" "}
                                    <input
                                        type="text"
                                        name="username"
                                        value={profile.username}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div>
                                    Birthday:{" "}
                                    <input
                                        type="date"
                                        name="birthday"
                                        value={profile.birthday}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <button className="submit" type="submit">
                                    Edit Profile
                                </button>
                            </form>
                        ) : (
                            <div style={{ display: "block" }}></div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Profile;


    // return (
    //     <div className="Username">
    //         {profileTable.map((x) => (
    //             <div key={x.id}>
    //                 {x.username != null ? (
    //                     <>
    //                         <div>Your username is: {x.username} </div>
    //                         <button
    //                             className="submit"
    //                             type="submit"
    //                             onClick={() => handleEditUsername(x)}
    //                         >
    //                             Edit Username
    //                         </button>
    //                         <button
    //                             className="submit"
    //                             type="button"
    //                             onClick={() => handleDeleteUsername(x.id)}
    //                         >
    //                             Remove Username
    //                         </button>
    //                         {editingUsername && editingUsername.id === x.id ? (
    //                             <form className="form" onSubmit={handleUpdateUsername}>
    //                                 <div>
    //                                     Username:{" "}
    //                                     <input
    //                                         type="text"
    //                                         name="username"
    //                                         value={username.username}
    //                                         onChange={handleUsernameChange}
    //                                     />
    //                                 </div>
    //                                 <button className="submit" type="submit">
    //                                     Edit Username
    //                                 </button>
    //                             </form>
    //                         ) : (
    //                             <div style={{ display: "block" }}></div>
    //                         )}
    //                     </>
    //                 ) : (
    //                     <>
    //                         <div>What would you like to be called?</div>
    //                         <div>
    //                             <AddUsername token={token} />
    //                         </div>
    //                     </>
    //                 )}
    //             </div>
    //         ))}
    //     </div>
    // );
