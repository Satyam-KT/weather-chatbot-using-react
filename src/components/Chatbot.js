import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Paper } from '@mui/material';


const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Try asking 'What's the weather in Delhi?'", type: 'bot' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, type: 'user' }]);
      handleUserInput(input);
      setInput('');
    }
  };

  const handleUserInput = (input) => {
    const location = parseLocation(input);
    if (location) {
      getWeatherInfo(location);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Please provide a location to get weather information.', type: 'bot' }
      ]);
    }
  };

  const parseLocation = (input) => {
    // Simple parsing: assuming the last word in the input is the location
    const words = input.split(' ');
    return words[words.length - 1];
  };

  const getWeatherInfo = async (location) => {
    const apiKey = 'dfb5e511fab0fc8d931e5dafff281120';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      const weather = response.data;
      const weatherMessage = `The current temperature in ${weather.name} is ${weather.main.temp}°C with ${weather.weather[0].description}.`;
      setMessages((prevMessages) => [...prevMessages, { text: weatherMessage, type: 'bot' }]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, I could not fetch the weather information.', type: 'bot' }
      ]);
    }
    setLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, width: '400px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ overflowY: 'auto', flexGrow: 1, mb: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              style={{
                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.type === 'user' ? '#2196f3' : '#ff00ff',
                borderRadius: '20px',
                color: 'white',
                padding: '10px',
                marginBottom: '5px'
              }}
            >
              <ListItemText primary={msg.text} />
            </ListItem>
          ))}
          {loading && (
            <ListItem>
              <CircularProgress />
            </ListItem>
          )}
        </List>
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <TextField
          label="Type a message"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Paper>
  );

};

export default Chatbot;
