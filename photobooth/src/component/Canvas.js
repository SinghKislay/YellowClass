import React, {useEffect, useState} from 'react';
import Placeholder from './Placeholder';
import axios from 'axios';
import './canvas.css';
import BottomScrollListener from 'react-bottom-scroll-listener'
import left from "./left-chevron.png"
import right from "./right-chevron.png"
import {
    List,
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
} from "react-virtualized"

let hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }



const Canvas = () => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("https://api.unsplash.com/");
    const [accessKey, setAccessKey] = useState("rFp4zeyJjvfOk8MSAtEemJl1PXFNPRYlM_fQL21vB-k");
    const [choice, setChoice] = useState(false);
    const [choiceList, setChoiceList] = useState([]);
    const [TopicRender1, setTopicRender1] = useState([]);
    const [TopicRender2, setTopicRender2] = useState([]);
    const [TopicRender3, setTopicRender3] = useState([]);
    const [wallRender1, setWallrender1] = useState([]);
    const [wallRender2, setWallrender2] = useState([]);
    const [wallRender3, setWallrender3] = useState([]);
    const [wallRender4, setWallrender4] = useState([]);
    const [wallRender5, setWallrender5] = useState([]);
    const [urlList, setUrlList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalUrl, setModalUrl] = useState("");
    const [pageCount, setPageCount] = useState(1);
    const [modalCount, setModalCount] = useState(0);
    const [TopicRenderOnce, setRenderOnce] = useState(false);
    const [topicList, setTopicList] = useState(["Animals", "programming", "Music", "Art", "Food", "Video Games", "Fashion", "historical", "Web Design", "Landscape", "Beautiful women", "Beautiful men", "Cars", "Hairstyles", "Cute", "Adventure", "Sports", "Cinema", "Culture", "Startup", "LifeStyle", "Dance"]);
    
    let makeChoiceList = (topic) => {
        console.log(topic)
        setChoiceList((prevState) => [...prevState, topic])
    }

    let getModalUrl = (url) => {
        setModalUrl(url)
        
    }

    let handleLeftImageModal = (event) => {
        event.stopPropagation();
        setModalCount(prev => {
        let x = prev-1;
        if(x>=0){
            setModalUrl(urlList[x]);
            return x;
        }
        return prev;
        });
        
        
    }

    let handleRightImageModal = (event) => {
        event.stopPropagation();
        setModalCount(prev => {
            let x = prev + 1;
            if(x < urlList.length){
                setModalUrl(urlList[x])
                return x;
            }
            return prev;
        });
        
    }

    useEffect(()=>{
        for(var i = 0; i < urlList.length; i++){
            if(modalUrl==urlList[i][2]){
                setModalUrl(urlList[i]);
                setShowModal(true);
                setModalCount(i);
                break;
            }
        }

    }, [modalUrl])


    let loadData = () => {
        setLoading(true);
        if(choiceList!=[]){
            choiceList.map((value)=>{
                axios.get(`${url}search/photos?page=${pageCount}&client_id=${accessKey}&query=${value}`)
                .then((res)=>{
                    res.data.results.map((value, index)=>{
                        let rgb = hexToRgb(value.color);
                        let width = value.width;
                        let height = value.height;
                        let id = value
                        let ar = width/height;
                        let w = width/6;
                        let h = height/6;
                        if(ar <= 0.56){
                            width = "20em";
                            height = "26.5em";
                        } 
                        else if(ar <= 0.71){
                            width = "20em";
                            height = "24em";
                        }
                        else if (ar <= 1){
                            width = "20em";
                            height = "20em";
                        }
                        else if(ar <= 1.25){
                            width = "20em";
                            height = "16em"
                        }
                        else{
                            width = "20em";
                            height = "14em";
                        }

                        let url_img = value.urls.regular;
                        let modal_elem = [w, h, url_img];
                        let elem = <Placeholder main={true} addUrl={val=>getModalUrl(val)} id={id} width={width} height={height} color={`${rgb.r}, ${rgb.g}, ${rgb.g}`} url={url_img}/>
                        index = index%5;
                        setUrlList((prev) => [...prev, modal_elem]);
                        if(index%5==0){
                            setWallrender1((prevState)=>[...prevState, elem]);
                        }

                        else if(index%4==0){
                            setWallrender2((prevState)=>[...prevState, elem]);
                        }

                        else if(index%3==0 && index){
                            setWallrender3((prevState)=>[...prevState, elem]);
                        }

                        else if(index%2==0 && index!=0){
                            setWallrender4((prevState)=>[...prevState, elem]);
                        }

                        else{
                            setWallrender5((prevState)=>[...prevState, elem]);
                        }
                        
                    })
                })
            })
        }
        setLoading(false)
        setPageCount((prev)=>prev+1)

    }

    useEffect(() => {
        
        if(!choice && !TopicRenderOnce){
            topicList.map((value, index) => {
                
                axios.get(`${url}search/photos?page=1&client_id=${accessKey}&query=${value}`)
                    .then((res) => {
                        let rgb = hexToRgb(res.data.results[0].color);
                        let width = res.data.results[0].width;
                        let height = res.data.results[0].height;
                        
                        let ar = width/height;
                        if(ar <= 0.56){
                            width = "16em";
                            height = "22.5em";
                            
                        } 
                        else if(ar <= 0.71){
                            width = "16em";
                            height = "20em";
                        }
                        else if (ar <= 1){
                            width = "16em";
                            height = "16em";
                        }
                        else if(ar <= 1.25){
                            width = "16em";
                            height = "12em"
                        }
                        else{
                            width = "16em";
                            height = "10em";
                        }

                        let url_img = res.data.results[0].urls.regular;
                        let elem = <Placeholder id={index} main={false}  addTopic={(val)=>makeChoiceList(val)} topic={value}  width={width} height={height} color={`${rgb.r}, ${rgb.g}, ${rgb.g}`} url={url_img}/>
                        if(index%3==0 && index!=0){
                            
                            setTopicRender3((prev)=>[...prev, elem])
                        }
                        else if(index%2==0 && index!=0){
                            
                            setTopicRender2((prev)=>[...prev, elem])
                        }
                        else{
                           
                            setTopicRender1((prev)=>[...prev, elem])
                        }
                        
                    })
                
                return value;
            })
        }
        setRenderOnce(true)
    }, [])
    
    
    
    return (
        <>
            {
                !showModal?
                <>
                <div className="navbar" style={{display:"flex", width:"100vw", height:"6em", backgroundColor:"white", boxShadow: "0 8px 6px -6px #b0b0b0", position:"sticky"}}>
                    <div className="Company" style={{flexGrow:2, margin:"auto"}}>
                        <h2 style={{ margin:"0"}}>
                            PhotoBooth
                        </h2>
                    </div>
                    <div style={{flexGrow:8}}> </div>
                    <div style={{flexgrow:2}}> </div>
                </div>
                <div  className="Row" >
                    {
                        !choice?
                            <div>
                                <div className="First-card">
                                    <div>
                                        <h2>Select your favourite topics</h2>
                                    </div>
                                    <div className="Row2">
                                        <div className="Column">
                                        {TopicRender1}
                                        </div>
                                        <div className="Column">
                                            {TopicRender2}
                                        </div>
                                        <div className="Column">
                                            {TopicRender3}
                                        </div>
                                    </div>
                                </div>
                                <div className="button" onClick={()=>{
                                    setChoice(true)
                                    loadData()
                                }} >
                                    <p style={{color:"white", margin:"0"}}>Done</p>
                                </div>
                            </div>
                            :
                            <>
                                <div  className="Column">
                                    {wallRender1}
                                </div>
                                <div className="Column">
                                    {wallRender2}
                                </div>
                                <div className="Column">
                                    {wallRender3}
                                </div>
                                <div className="Column">
                                    {wallRender4}
                                </div>
                                <div className="Column">
                                    {wallRender5}
                                </div>
                                <BottomScrollListener onBottom={()=>loadData()} />
                            </>  
                        }
                </div>
                </>
                :
                <div onClick={()=>setShowModal(false)} className="Row3" >
                <div onClick={(e)=>handleLeftImageModal(e)} className="arrow" style={{right:"0", marginTop:modalUrl[1]/2.3+20}}>
                    <img style={{height: "100%", width: "100%"}}   src={left}></img>
                </div>
                <div style={{width:modalUrl[0], height:modalUrl[1], marginTop:"20px", boxShadow: "0 2.8px 2.2px rgba(92, 92, 92, 0.034), 0 6.7px 5.3px rgba(92, 92, 92, 0.048), 0 12.5px 10px rgba(92, 92, 92, 0.06), 0 22.3px 17.9px rgba(92, 92, 92, 0.072), 0 41.8px 33.4px rgba(92, 92, 92, 0.086), 0 100px 80px rgba(92, 92, 92, 0.12)"}} >
                    <img style={{height: "100%", width: "100%"}} src={modalUrl[2]} />
                </div>
                <div onClick={(e)=>handleRightImageModal(e)} className="arrow" style={{left:"0", marginTop:modalUrl[1]/2.3+20}}>
                    <img style={{height: "100%", width: "100%"}}   src={right}></img>
                </div>
                </div>
                }
        </>
    );
};

export default Canvas;