import React, { useDebugValue, useEffect, useState } from 'react'
import { TextField, Button, List, ListItem, ListItemText, IconButton, Container, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [cc, setcc] = useState([])
  const [task, setTask] = useState();
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

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
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
        sx={{ width: '80vw' }}
        size='small'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Task Description"
        sx={{ width: '80vw' }}
        size='small'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ paddingBottom: '9px', marginLeft: '5px' }}>
        Add Task
      </Button>
      <Box overflow='auto' maxHeight='70vh'>
        <List sx={{ marginTop: 2 }}>
          {tasks.map((task, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            } >
              <ListItemText primary={task.title} secondary={task.body} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  )
}

export default ToDo