const Jwt_profile = (props)=> {
    console.log(props)
    return (
        <div>
            <h1>
            You can See me because you have a JWT Token!
            Hi, {props.data.username}
            </h1>
        </div>
    )
}

export default Jwt_profile;