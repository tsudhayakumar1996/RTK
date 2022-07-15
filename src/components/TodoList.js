import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { addTodo , deleteTodo, getTodosAsync, updateTodo } from '../redux/todoSlice'

export default function TodoList() {

    const dispatch = useDispatch();
    useEffect(() => {                
        dispatch(getTodosAsync());       
    },[dispatch]);

    const selector = useSelector((state) => state.todos.lists)                                

    const [input, setInput] = useState('');  
    const [update, setUpdate] = useState('');  
    const [idtoupdate, setidtoupdate] = useState() 
       
    const [displaystate, setdisplaystate] = useState(false)

    const toSubmit = () => {                              
        dispatch(addTodo({
            title:input,
        }));        
    }      
    
    const toDelete = (id) => {                   
        dispatch(deleteTodo({
            id:id,
        }))
    } 
    
    const toUpdate = () => {                 
        dispatch(updateTodo({
            id:idtoupdate,
            title:update
        }))
        setdisplaystate(false)
    } 

    const toedit = (id) => {
        setidtoupdate(id)
        setdisplaystate(!displaystate)
    }

    return (
        <div style={StylingObject.ContainerBox}>  
            <div style={{opacity: displaystate ? '0.2' : '1'}}>
                <div style={{marginTop:'20px', backgroundColor:'grey', padding:'10px'}}>
                    <p style={{margin:'0px', paddingBottom:'10px'}}>New to do</p>
                    <input placeholder='new todo' onChange = {(e) => setInput(e.target.value)}></input>
                    <button style={StylingObject.addbtn} onClick = {() => toSubmit()}>Add</button>    
                </div>            
                {selector.map((each,index)=>
                    <div style={{marginTop:'20px'}} key = {index}>
                        <div style={{display:'inline', textAlign:'left'}}>
                        <label>{each.title}</label>
                        </div>
                        <button style={StylingObject.deletebtn} onClick={() => toDelete(each.id)}>Delete</button> 
                        <button style={StylingObject.editbtn} onClick={() => toedit(each.id)}>Edit</button>                                                                              
                    </div>                
                )}                
                <p style={{backgroundColor:'lightblue'}}>No of Todos : {selector.length}</p> 
            </div> 
            {displaystate &&
                <div style={StylingObject.centerposition}>
                    <input placeholder='to update' style={{marginLeft:'10px'}} onChange = {(e) => setUpdate(e.target.value)}></input>     
                    <button style={StylingObject.updatebtn} onClick={() => toUpdate()}>Update</button>               
                </div>
            }                    
        </div>
    )
}

var StylingObject = {
    ContainerBox : {
        textAlign: 'center',
        border: '2px solid black',
        borderRadius: '10px',
        marginTop: '50px',
        marginBottom: '50px',
        marginRight: '200px',
        marginLeft: '200px',
        backgroundColor: 'pink',
        position: 'relative'
    },
    deletebtn : {
        backgroundColor:'red',
        border:'none',
        borderRadius:'5px',
        marginLeft:'20px'
    },
    editbtn : {
        backgroundColor:'green',
        border:'none',
        borderRadius:'5px',
        marginLeft:'10px'
    },
    updatebtn : {
        backgroundColor:'lightblue',
        border:'none',
        borderRadius:'5px',
        marginLeft:'10px'
    },
    addbtn : {
        backgroundColor:'lightblue',
        border:'none',
        borderRadius:'5px',
        marginLeft:'10px'
    },
    centerposition : {
        position: 'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)'
    },    
    ContainerBoxOpac : {
        opacity:'0.2',
    }
}
