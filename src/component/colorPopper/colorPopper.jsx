import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import paint from '../../assets/paint-board-and-brush.png';
import './colorPopper.css'
import { changeColor } from '../../service/dataServices';
import Tooltip from '@mui/material/Tooltip';

export default function ColorPopper(props) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const colorArray = [{ id: "#FFFFFF", name: "white"},
  { id: "#F28B82", name: "red" },
  { id: "#F7BC04", name: "orange" },
  { id: "#FCF474", name: "yellow" },
  { id: "#CCFF90", name: "green" },
  { id: "#A7FFEB", name: "teal" },
  { id: "#CBF0F8", name: "blue" },
  { id: "#AECBFA", name: "navy blue" },
  { id: "#D7AEFB", name: "purple" },
  { id: "#FACFE8", name: "pink" },
  { id: "#E6C9A8", name: "Brown" },
  { id: "#E8EAED", name: "grey" }]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const pickColor = (e) => {
    console.log(props.action)
    console.log(e.target.id)
    if(props.action == "create"){
        props.setColor(e.target.id)
    }
    else{
        let a=e.target.id;
        a=a.replace('#','%23');
        let colorObj = {
            noteId: props.noteID,
            color: a
          }
        console.log(props.noteID)        
        console.log(colorObj)
        changeColor(colorObj).then((resp) => {
            console.log(resp)
            props.getUpdateColor(true)
            setOpen(false);
        }).catch((err) => {
            console.log(err)
        })
    }
  }

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      <Tooltip title="Add color" placement="bottom"><img src={paint}  id="pictures" alt="colour" onClick={handleClick}/></Tooltip>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className='colors'>
                {
                    colorArray.map(item => <div key={item.id} id={item.id} title={item.name} style={{backgroundColor:item.id}}  className='colorDiv'  onClick={pickColor}></div>)
                }               
            </div>
          </Fade>
        )}
      </Popper>
    </>
  );
}
