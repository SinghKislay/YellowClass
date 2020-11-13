import React from 'react';
import './loading.css'

const Loading = (props) => {
    return (
        <div
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
            
        }}>
        </div>
    );
};

export default Loading;