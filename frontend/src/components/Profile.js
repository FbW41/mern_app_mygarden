import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const {id} = useParams(); 

    useEffect(()=>{
        if(id) {
            axios.post('/user/getUser', {id})
            .then(res=>{
                setUser(res.data);
            })
        }
    })
    return (
        <div>
            {
                user!=null&&
                <div>
                    <h2>
                    You are successfully login!                
                    </h2>
                    <br/>
                    <h1>Welcome {user.username}</h1>
                    <a href="http://localhost:5000/passport/logout">Passport Logout</a>
                </div>
            }
        </div>
    )
}
export default Profile;