import React, { useDebugValue, useEffect, useState } from 'react'
import { TextField, Button, List, ListItem, ListItemText, IconButton, Container, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);

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

  useEffect(()=> {
    console.log(tasks);
  }, [tasks])

  const handleAddTask = async() => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title: task.title, completed: false, userId: 1 });
      const newTask = response.data;

      setTasks([newTask, ...tasks]); 
      setTask({});
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async(taskId) => {
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

  return (
    <Container  sx={{ marginTop: 4, background: '#f0f0f0', width: '100vw', height: '100vh'}}>
      {/* <Typography variant="h4" gutterBottom>
        ToDo List
      </Typography> */}
      {loading && <div>Loading .....</div>}
      <TextField
        variant="outlined"
        label="Task title"
        sx={{ width: '90vw' }}
        size='small'
        value={task.title? task.title : ''}
        onChange={(e) => setTask({...task , title: e.target.value})}
      />
      <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ paddingBottom: '9px', marginTop: '5px' }}>
        Add Task
      </Button>
      <Box overflow='auto' maxHeight='70vh'>
        <List sx={{ marginTop: 2 }}>
          {tasks.map((task, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            } >
              <ListItemText primary={task.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  )
}

export default ToDo