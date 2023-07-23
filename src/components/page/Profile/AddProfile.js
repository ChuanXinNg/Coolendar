import React, { useState } from "react";
import { supabase } from '../../../supabase';
import PropTypes from 'prop-types';


function AddProfile({ token }) {

    // Prop type validation
    AddProfile.propTypes = {
        token: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
    };

    // const insert
    const [profile, setProfile] = useState({
        user_id: "",
        username: "",
        birthday: ""
    });


    // button handler to setProfile for insert
    function handleProfileChange(event) {
        const { name, value } = event.target;
        setProfile(prevFormData => ({
            ...prevFormData,
            user_id: token.user.id,
            [name]: value
        }));
    }

    // button handler to Add Profile
    async function handleAddProfile(e) {
        e.preventDefault();
        if (profile.username === "" && profile.birthday == "") {
            alert("Please insert username and birthday.");
        } else if (profile.username === "") {
            alert("Please insert username.");
        } else if (profile.birthday === "") {
            alert("Please insert a birthday.");
        } else {
            try {
                // Add new profile
                const { data, error } = await supabase
                    .from('profiletable')
                    .insert([
                        {
                            user_id: profile.user_id,
                            username: profile.username,
                            birthday: profile.birthday
                        },
                    ]);
                if (error) {
                    throw error;
                }
                console.log(data);
                location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            <form className="form" onSubmit={handleAddProfile}>
                <div className="title"></div>
                <div className="AddUsername">
                    Username: <input type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleProfileChange}
                        placeholder="Enter username here" />
                </div>
                <div className="AddBirthday">
                    Birthday: <input type="date"
                        name="birthday"
                        value={profile.birthday}
                        onChange={handleProfileChange} />
                </div>
                <button className="submit" type="submit">
                    Add Profile
                </button>
            </form>
        </div>
    );
}

export default AddProfile;