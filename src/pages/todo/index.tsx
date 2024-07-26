import React, { useEffect, useState } from 'react'
import { Button, List, ListItem, ListItemText, IconButton,  Box, Grid, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Popup from '../../components/todoAppPopup';

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const ToDo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[])

  const handleAddTask = async(title: any) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title: title, completed: false, userId: 1 });
      const newTask = response.data;

      setTasks([newTask, ...tasks]); 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async(taskId: number) => {
    // console.log(taskId)
    // const newTasks = tasks.filter((_, i) => i !== index);

    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
      const newTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(newTasks);
    } catch (error) {
      console.log(error)
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSubmit = (value) => {
  //   console.log('Submitted value:', value);
  // };

  return (
    <Grid sx={{ marginTop: 4, background: '#f0f0f0', width: '100%', height: '100vh'}}>
      {/* <Typography variant="h4" gutterBottom>
        ToDo List
      </Typography> */}
      {loading && <div>Loading .....</div>}
      {/* <TextField
        variant="outlined"
        label="Task title"
        sx={{ width: '90vw' }}
        size='small'
        value={task.title? task.title : ''}
        onChange={(e) => setTask({...task , title: e.target.value})}
      />
      <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ paddingBottom: '9px', marginTop: '5px', marginBottom: '5px' }}>
        Add Task
      </Button> */}
      <Button variant="contained" onClick={handleClickOpen}>
        Add Task
      </Button>
      <hr />
      <Popup open={open} onClose={handleClose} onSubmit={handleAddTask} title='Add Task'/>
      <Box overflow='auto' maxHeight='80vh'>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <Checkbox value={task.completed}/>
              <ListItemText primary={task.title} />
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Grid>
  )
}

export default ToDo