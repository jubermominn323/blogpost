import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import Navbar from './navbar'

const Create = ( ) => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")


const handleSubmit = () =>{
    
    if(!title || !content){
        toast.error("Please add all the fields.")
    }

    else{
        fetch("/createpost", {
        method:'post',
        headers :{
            "Authorization":"Bearer "+localStorage.getItem("token"),
        "Content-Type": "application/json"
        },
        body : JSON.stringify({
            title,
            content
        }),
         
        }).then(res => res.json())
        .then(data =>{
            if(data)
            {
                console.log(data)
                history.push('/home')
            }
            
        })
    }
    
        //history.push('/home')
}

return (
    <div>
        <ToastContainer />
        <Navbar />
    
    <div className="adPost">
        <div className='title'>
            <center>
        <h1>Add Post</h1>
        </center>
        </div>
        
        
        <ul style={{listStyleType:"none"}}>
        <div className="form-group">
        <li><label> Title:</label></li>
            <input type="text" id="input-title" className="form-control-lg" style={{height:"40px",width:"90%",backgroundColor:"rgba(0, 0, 0, 0)"}} value={title} onChange={e => setTitle(e.target.value)}   required />
        </div>
        <div className="form-group">
        <li><label> Body: </label></li>
            <textarea value={content} id="input-content" className="form-control-lg" rows="5" style={{height:"100px",width:"90%"}} onChange={e => setContent(e.target.value)} required ></textarea>
        
        </div>
        <br />
        <button type="submit" onClick={()=>handleSubmit()} className="btn btn-outline-success btn-block btn-lg" style={{height:"40px",width:"90%"}} > Submit </button>
        <br />
        </ul>
        
    </div>
    </div>
    )
}

export default Create;