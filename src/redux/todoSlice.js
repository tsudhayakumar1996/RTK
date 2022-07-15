import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../components/fetch";

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const response = await fetchApi("http://localhost:4000/todos"); 
        return response
    }
)

const todoSlice = createSlice({
    name: "todos",
    initialState:
        {            
            lists:[],            
        },    
    reducers: {
        addTodo : ( state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
            };
            state.lists.push(newTodo);
        },
        deleteTodo : (state, action) => { 
            console.log(action)           
            const objIndex = state.lists.findIndex((each) => each.id === action.payload.id);
            state.lists.splice(objIndex,1);
        },
        updateTodo : (state, action) => {
            const objIndex = state.lists.findIndex((each) => each.id === action.payload.id);
            console.log(objIndex);    
            const newProp = {
                id: action.payload.id,
                title: action.payload.title,
            };        
            state.lists.splice(objIndex,1,newProp);          
        },        
    },
    // extraReducers : {
    //     [getTodosAsync.pending]: (state, action) => {            
    //         state.status = 'fetching in progress!!...'          
    //     },
    //     [getTodosAsync.rejected]: (state, action) => {                    
    //         state.status = 'api fetch failed...!!'                                               
    //     },
    //     [getTodosAsync.fulfilled]: (state, action) => {                                          
    //         console.log(action.payload)          
    //         state.lists=action.payload;   
    //         state.status = 'api fetch completed!!'                   
    //     },        
    // }   
    extraReducers: (builder) => {        
        builder.addCase(getTodosAsync.fulfilled, (state, action) => {            
            state.lists.push(...action.payload)
        })
    }
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;