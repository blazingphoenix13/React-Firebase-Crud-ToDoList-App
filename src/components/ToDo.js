import React,{useState} from 'react'
import './ToDo.css'
import {List, Button, ListItemAvatar, ListItem, ListItemText, Modal } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {db} from '../config/firebase'
import {makeStyles} from '@material-ui/core/styles'



const useStyles = makeStyles((theme) => ({
    paper : {
      position : 'absolute',
      width : 400,
      backgroundColor : theme.palette.background.paper,
      border : '2px solid #000',
      boxShadow : theme.shadows[5],
      padding : theme.spacing(2,4,3)
    },
  })
);


function ToDo(props) {
    console.log('props',props)
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [input ,setInput] = useState()

    const deleteTodo =(e) =>{
        db.collection('todos').doc(props.text.id).delete()
    }

    // const handleOpen =() =>{
    //     setOpen(true)
    // }
    
    // const handleClose =() =>{
    //     setOpen(false)
    // }

    const updateTodo = () => {
        db.collection('todos').doc(props.text.id).set({
            todo : input
        },{merge : true})
        setOpen(false)
    }

    return (
        <>
        <Modal open={open} onClose={e=> setOpen(false)}>
            <div className={classes.paper}>
            <p>Modal pops up</p>
            <input placeholder={props.text.todo} value={input} onChange={e=> setInput(e.target.value)}/>
            <Button onClick={updateTodo}>Update</Button>
            </div>
        </Modal>
        <List className="todo_list">
            {/* <ListItem>
                <ListItemAvatar> */}
                    <AccessTimeIcon/>
                {/* </ListItemAvatar>
            </ListItem> */}
            <ListItemText key={props.text.id} primary={props.text.todo}/>
            <Button onClick={e=> setOpen(true)}><EditIcon className="edit_todo"/></Button>
            <Button onClick={deleteTodo}><DeleteIcon className="delete_icon"/></Button>
            {/* <Button onClick={e => db.collection('todos').doc(props.text.id).delete()}><DeleteIcon/></Button> */}
        </List>
        </>
    )
}

export default ToDo
