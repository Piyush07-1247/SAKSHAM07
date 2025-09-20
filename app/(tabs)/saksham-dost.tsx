import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import React, { useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  videoLink?: string;
  websiteLink?: string;
}

export default function SakshamDostScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Saksham Dost, your AI career assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

    const generateAIResponse = (userInput: string): Message => {
    // Simple AI response logic (replace with actual AI integration)
    let response = "I understand you're asking about career guidance. ";
    let videoLink = "";
    let websiteLink = "";

    const input = userInput.toLowerCase();

    if (input.includes('interview')) {
      response = "Here's comprehensive guidance on interview preparation:";
      videoLink = "https://www.youtube.com/watch?v=interview-tips";
      websiteLink = "https://www.naukri.com/interview-tips";
    } else if (input.includes('resume') || input.includes('cv')) {
      response = "Let me help you with resume building:";
      videoLink = "https://www.youtube.com/watch?v=resume-building";
      websiteLink = "https://resume.io";
    } else if (input.includes('skill')) {
      response = "Here are resources for skill development:";
      videoLink = "https://www.youtube.com/watch?v=skill-development";
      websiteLink = "https://www.coursera.org";
    } else if (input.includes('job')) {
      response = "Here are the best job search strategies:";
      videoLink = "https://www.youtube.com/watch?v=job-search";
      websiteLink = "https://www.linkedin.com/jobs";
    } else {
      response = "Here are some general career resources that might help:";
      videoLink = "https://www.youtube.com/watch?v=career-guidance";
      websiteLink = "https://www.careerguidance.com";
    }

    return {
      id: Date.now().toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
      videoLink,
      websiteLink,
    };
  };

  const speakMessage = (text: string) => {
    Speech.speak(text, {
      language: 'en-US',
      pitch: 1,
      rate: 0.8,
    });
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.aiMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.isUser ? styles.userMessageText : styles.aiMessageText
      ]}>
        {item.text}
      </Text>
      
      {!item.isUser && (
        <View style={styles.messageActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => speakMessage(item.text)}
          >
            <Ionicons name="volume-high" size={16} color="#405de6" />
          </TouchableOpacity>
          
          {item.videoLink && (
            <TouchableOpacity
              style={styles.linkBtn}
              onPress={() => openLink(item.videoLink!)}
            >
              <Ionicons name="play-circle" size={16} color="#ff0000" />
              <Text style={styles.linkText}>Video</Text>
            </TouchableOpacity>
          )}
          
          {item.websiteLink && (
            <TouchableOpacity
              style={styles.linkBtn}
              onPress={() => openLink(item.websiteLink!)}
            >
              <Ionicons name="globe" size={16} color="#405de6" />
              <Text style={styles.linkText}>Website</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saksham Dost</Text>
        <Text style={styles.headerSubtitle}>AI Career Assistant</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me about your career..."
          multiline
          maxLength={500}
        />
        
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={() => setIsRecording(!isRecording)}
        >
          <Ionicons 
            name={isRecording ? "mic" : "mic-outline"} 
            size={24} 
            color={isRecording ? "#ff0000" : "#405de6"} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#405de6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 15,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#405de6',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#333',
  },
  messageActions: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  actionBtn: {
    padding: 5,
    marginRight: 10,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginTop: 4,
  },
  linkText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#405de6',
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.6,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  voiceButton: {
    padding: 10,
    marginRight: 5,
  },
  sendButton: {
    backgroundColor: '#405de6',
    borderRadius: 20,
    padding: 10,
  },
});

