import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const INTRO_VIDEOS = [
  'https://youtu.be/4ys5ZC-SjR8?feature=shared', // Replace with actual career-related videos
  'https://youtube.com/shorts/gIQjemt3Q9Q?feature=shared',
];

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showVideos, setShowVideos] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isLogin && showVideos) {
      playNextVideo();
    }
  }, [currentVideoIndex, showVideos]);

  const playNextVideo = () => {
    if (currentVideoIndex < INTRO_VIDEOS.length - 1) {
      setTimeout(() => {
        setCurrentVideoIndex(currentVideoIndex + 1);
      }, 30000); // 30 seconds per video
    } else {
      setShowVideos(false);
    }
  };

  const handleAuth = () => {
    if (isLogin) {
      // Login logic
      if (email && password) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Please fill all fields');
      }
    } else {
      // Register logic
      if (email && password && confirmPassword && name) {
        if (password !== confirmPassword) {
          Alert.alert('Error', 'Passwords do not match');
          return;
        }
        setShowVideos(true);
        setTimeout(() => {
          router.replace('/career-details');
        }, 90000); // After all videos
      } else {
        Alert.alert('Error', 'Please fill all fields');
      }
    }
  };

  if (!isLogin && showVideos) {
    return (
      <View style={styles.videoContainer}>
        <Text style={styles.videoTitle}>Welcome to Saksham!</Text>
        <Text style={styles.videoSubtitle}>
          Video {currentVideoIndex + 1} of {INTRO_VIDEOS.length}
        </Text>
        
        {/* Replace with actual YouTube video player */}
        <View style={styles.videoPlayer}>
          <Text style={styles.videoPlaceholder}>
            Career Introduction Video {currentVideoIndex + 1}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => {
            setShowVideos(false);
            router.replace('/career-details');
          }}
        >
          <Text style={styles.skipButtonText}>Skip Videos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#405de6', '#5851db', '#833ab4']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.authContainer}>
          <Text style={styles.title}>🌱 SAKSHAM</Text>
          <Text style={styles.subtitle}>“Har Sapna, Har Baccha -Saksham”</Text>

          <View style={styles.formContainer}>
            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            )}
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            )}

            <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
              <Text style={styles.authButtonText}>
                {isLogin ? 'Log In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchButtonText}>
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Log in'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  authContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  authButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  authButtonText: {
    color: '#405de6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  videoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  videoSubtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  videoPlayer: {
    width: width - 40,
    height: 200,
    backgroundColor: '#333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  videoPlaceholder: {
    color: '#fff',
    fontSize: 16,
  },
  skipButton: {
    backgroundColor: '#405de6',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
