import React, { useState, useEffect } from 'react';
import Navbar from './navbar'

const Home = ( ) =>{
    const [data, setData] = useState([])    
useEffect(()=>{
    fetch('/allpost',{
        headers: {
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    })
    .then(res=> res.json())
    .then(result=>{
        setData(result)
    })
},[])
    
    // console.log(data.data)
// const deletePost = (postid) => {
//     fetch(`/deletePost/${postid}`, {
//     method: "delete"
//     }).then(res=> res.json()).then(result=> {
//         const newData = data.filter(item=>{
//             return item._id !== result._id
//         })
//             setData (newData)
//     })

// }


    return (
        
        <div>
            <Navbar /> 
            <div>  
            {
                
                data.map(item =>{
                    
                return (
                
                <div className="data-item" >
                <div className="data-body" key={item._id}>
                    <div className="item-name" >
                     - {item.postedBy.name}
                    </div>
                    <div className="item-title">
                    {item.title}
                    </div>
                    <div className="item-content">
                    <p>{item.content}</p>
                    </div>
                   </div>
                </div>
            )
        }) 
            }
            </div>
        </div>
    )
}

export default Home