import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import { getTaskIconHandler } from "../../Tasks/TaskList";

export const shortenTextHandler = (text, lengthOfText) => {
  if(text.length > lengthOfText) {
    return text.slice(0, lengthOfText) + ".....";
  }
  return text;
};

export default function CalenderTaskList({ selectedTask }) {

  let selectedTaskContent = "";

  if(selectedTask == [] || selectedTask.length == 0 || selectedTask  == null) {
    selectedTaskContent = <Alert severity="info" sx={{ margin: "20% 0", width: "100%"}}>No task available for this day</Alert>;
  }

  else {
    selectedTaskContent = (
      <Box sx={{ width: '100%', padding: "1rem 0", margin: "0", height: "300px", overflowY: "scroll" }}>
        <List>
            {selectedTask.map(task => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {getTaskIconHandler(task.status)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={shortenTextHandler(task.title, 30)} secondary={task.status} />
              </ListItem>
            )  
          })}
        </List>
      </Box>
    );
  };

  return (
    <Box sx={{ padding: ".5rem 0"}}>
      {selectedTaskContent}
    </Box>
  );
}