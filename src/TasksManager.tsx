import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, TextField, Button, List, ListItem, ListItemText,
  ListItemSecondaryAction, IconButton, Divider, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Slide, Select, MenuItem
} from '@mui/material';
import { Check, Delete, PriorityHigh, Schedule, LowPriority, NotInterested } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

interface Task {
  id: number;
  text: string;
  type: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'neither';
  done: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TasksManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]') as Task[]);
  const [newTask, setNewTask] = useState<string>('');
  const [taskType, setTaskType] = useState<'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'neither'>('urgent-important');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj: Task = {
        id: Date.now(),
        text: newTask,
        type: taskType,
        done: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const markTaskAsDone = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: true } : task));
  };

  const handleDeleteClick = (id: number) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter(task => task.id !== taskToDelete));
      setTaskToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setTaskToDelete(null);
    setDeleteDialogOpen(false);
  };

  const renderTasks = (type: Task['type']) => (
    <List>
      {tasks.filter(task => task.type === type && !task.done).map(task => (
        <ListItem key={task.id} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
          <ListItemText primary={task.text} />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => markTaskAsDone(task.id)}>
              <Check />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDeleteClick(task.id)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );

  const renderDoneTasks = () => (
    <List>
      {tasks.filter(task => task.done).map(task => (
        <ListItem key={task.id} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
          <ListItemText primary={task.text} />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => handleDeleteClick(task.id)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tasks Manager
      </Typography>
      <Box display="flex" mb={2}>
        <TextField
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          fullWidth
        />
        <Select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value as Task['type'])}
          variant="outlined"
          sx={{ ml: 2, minWidth: 200 }}
        >
          <MenuItem value="urgent-important">
            <PriorityHigh color="error" /> Urgent & Important
          </MenuItem>
          <MenuItem value="not-urgent-important">
            <Schedule color="primary" /> Not Urgent But Important
          </MenuItem>
          <MenuItem value="urgent-not-important">
            <LowPriority color="secondary" /> Urgent But Not Important
          </MenuItem>
          <MenuItem value="neither">
            <NotInterested color="disabled" /> Neither Urgent Nor Important
          </MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={addTask} sx={{ ml: 2 }}>
          Add Task
        </Button>
      </Box>
      <Divider />
      <Box mt={2}>
        <Typography variant="h6" color="error">
          Urgent & Important Tasks
        </Typography>
        {renderTasks('urgent-important')}
      </Box>
      <Box mt={2}>
        <Typography variant="h6" color="primary">
          Not Urgent But Important Tasks
        </Typography>
        {renderTasks('not-urgent-important')}
      </Box>
      <Box mt={2}>
        <Typography variant="h6" color="secondary">
          Urgent But Not Important Tasks
        </Typography>
        {renderTasks('urgent-not-important')}
      </Box>
      <Box mt={2}>
        <Typography variant="h6" color="textSecondary">
          Neither Urgent Nor Important Tasks
        </Typography>
        {renderTasks('neither')}
      </Box>
      <Box mt={2}>
        <Typography variant="h6" color="success">
          Done Tasks
        </Typography>
        {renderDoneTasks()}
      </Box>
      <Dialog
        open={deleteDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this task? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TasksManager;