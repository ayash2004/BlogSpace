import React from "react";

function Container({children}){
    return (
        <div className="w-full  mx-auto ">{children}</div>
        // <div className="  bg-gradient-to-r from-blue-600/10 to-purple-600/10">{children}</div>
    )
}

export default Container