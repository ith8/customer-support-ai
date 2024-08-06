'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Box, Stack, TextField, Button, Paper } from '@mui/material';
import styles from './page.module.css';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((prevMessages) => {
          let lastMessage = prevMessages[prevMessages.length - 1];
          let otherMessages = prevMessages.slice(0, prevMessages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        padding: 2,
      }}
    >
      <Stack
        sx={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: 2,
        }}
      >
        {messages.map((message, index) => (
          <Paper
            key={index}
            sx={{
              padding: 1,
              marginBottom: 1,
              backgroundColor: message.role === 'user' ? 'primary.main' : 'background.paper',
              color: message.role === 'user' ? 'text.primary' : 'text.secondary',
              alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {message.content}
          </Paper>
        ))}
        <div ref={messagesEndRef} />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'text.primary',
              '& fieldset': {
                borderColor: 'text.secondary',
              },
              '&:hover fieldset': {
                borderColor: 'text.primary',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          disabled={isLoading}
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Stack>
    </Box>
  );
}
