import React from 'react'
// import {Circle} from 'better-react-spinkit'
function Loading() {
    return (
        <center style = {{display:"grid", placeItems:"center", height:"100vh"}}>
            <div>
                <img src="https://th.bing.com/th/id/R.3db05f40f9bfbfa4818e5f841359ac18?rik=i9uCGc2yoCWfNA&riu=http%3a%2f%2fspeedyclearance.uk%2fwp-content%2fuploads%2f2018%2f04%2fwhatsapp-icon.png&ehk=%2fGSNSk4y8vLd2qCiosXRI0WSYOth7SLdJewCXSxpcmY%3d&risl=&pid=ImgRaw&r=0" 
                alt="" 
                style={{ marginBottom: 10 }} 
                height={200}
                />
              {/* <Circle color="#3CBC28" size={60}/>*/}
            </div>
        </center>
    )
}

export default Loading
