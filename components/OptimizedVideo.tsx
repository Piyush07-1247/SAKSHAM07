import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNetworkOptimization } from '../hooks/useNetworkOptimization';

const { width, height } = Dimensions.get('window');

interface OptimizedVideoProps {
  videoUrl: string;
  thumbnail?: string;
  title?: string;
  onPlaybackStatusUpdate?: (status: any) => void;
}

export default function OptimizedVideo({
  videoUrl,
  thumbnail,
  title,
  onPlaybackStatusUpdate,
}: OptimizedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<Video>(null);
  const { networkState, getOptimizedVideoQuality } = useNetworkOptimization();

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const getVideoSource = () => {
    const quality = getOptimizedVideoQuality();
    
    // In a real app, you would have different quality URLs
    // For now, we'll use the same URL but could add quality parameters
    return {
      uri: videoUrl,
      // Add quality parameters based on network
      ...(quality === 'low' && { 
        headers: { 'Accept-Encoding': 'gzip' } 
      }),
    };
  };

  if (!networkState.isConnected) {
    return (
      <View style={styles.offlineContainer}>
        <Ionicons name="wifi-outline" size={50} color="#ccc" />
        <Text style={styles.offlineText}>No Internet Connection</Text>
        <Text style={styles.offlineSubtext}>
          Please check your connection and try again
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() => setShowControls(!showControls)}
        activeOpacity={1}
      >
        <Video
          ref={videoRef}
          source={getVideoSource()}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay={false}
          isLooping={true}
          onLoad={handleLoad}
          onLoadStart={handleLoadStart}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            {networkState.isSlowConnection && (
              <Text style={styles.loadingText}>
                Optimizing for slow connection...
              </Text>
            )}
          </View>
        )}

        {/* Play/Pause Controls */}
        {showControls && (
          <View style={styles.controlsOverlay}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={handlePlayPause}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={50}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Network Status Indicator */}
        {networkState.isSlowConnection && (
          <View style={styles.networkIndicator}>
            <Ionicons name="cellular" size={16} color="#fff" />
            <Text style={styles.networkText}>Slow Connection</Text>
          </View>
        )}
      </TouchableOpacity>

      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    padding: 20,
  },
  networkIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,152,0,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  networkText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  offlineText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 15,
  },
  offlineSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
