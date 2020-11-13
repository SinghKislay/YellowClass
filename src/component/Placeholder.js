import React, {useState} from 'react';
import "./placeholder.css"
import check from "./check.png"

const Placeholder = (props) => {
    const [showCheck, setCheck] = useState(false);
    
    return (
        <div onClick={(e)=>{
            if(!props.main){
                console.log(showCheck)
                setCheck((prevState)=>!prevState)
                props.addTopic(props.topic)
            }
            else{
                props.addUrl(props.url)
            }
        }}
            className="fade-in" style={{
            minWidth: props.width,
            maxWidth: props.width,
            maxHeight: props.height,
            backgroundColor: `rgba(${props.color}, .15)`, 
            backdropFilter: "blur(10px)",
            borderRadius: "1px",
            boxShadow:`0 2.8px 2.2px rgba(${props.color}, 0.034),0 6.7px 5.3px rgba(${props.color}, 0.048),0 12.5px 10px rgba(${props.color}, 0.06),0 25.3px 30.9px rgba(${props.color}, 0.072),0 30.8px 40.4px rgba(${props.color}, 0.086)`,
            marginTop: "10px",
            marginLeft: "10px",
            marginBottom: "10px",
            overflow:"hidden"
        }}>
            {
            !props.main?
            <>
            <img style={{height: "100%", width: "100%", objectFit: "contain"}} src={props.url} />
            {
                showCheck?
                    <div className="check">
                        <img style={{height: "4em", width: "4em", marginLeft:"1em", marginTop:"1em"}} src={check}></img>
                    </div>
                    :
                    <></>
            }
            
            
            <div className="htext" style={{width:props.width}}>{props.topic}</div>
            </>
            :
            <>
            <img style={{height: "100%", width: "100%", objectFit: "contain"}} src={props.url} />
            </>
            }
        </div>
    );
};

export default Placeholder;