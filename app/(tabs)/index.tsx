import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Mock data for career-related shorts
const CAREER_SHORTS = [
  {
    id: '1',
    title: 'Top 5 Skills for Software Engineers',
    creator: 'TechCareer',
    videoUrl: 'https://youtube.com/shorts/lLiPGyg7hc4?feature=shared',
    thumbnail: 'https://via.placeholder.com/300x400',
    likes: 1250,
    comments: 89,
    shares: 45,
  },
  {
    id: '2',
    title: 'How to Ace Your Job Interview',
    creator: 'CareerGuru',
    videoUrl: 'https://youtube.com/shorts/6bwRlZOXUlE?feature=shared',
    thumbnail: 'https://via.placeholder.com/300x400',
    likes: 2100,
    comments: 156,
    shares: 78,
  },
  // Add more shorts...
];

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const flatListRef = useRef(null);

  type CareerShort = {
    id: string;
    title: string;
    creator: string;
    videoUrl: string;
    thumbnail: string;
    likes: number;
    comments: number;
    shares: number;
  };

  const renderShort = ({ item }: { item: CareerShort }) => (
    <View style={styles.shortContainer}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.video} />
        
        {/* Play button overlay */}
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={50} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Right side actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setLiked({...liked, [item.id]: !liked[item.id]})}
        >
          <Ionicons
            name={liked[item.id] ? "heart" : "heart-outline"}
            size={30}
            color={liked[item.id] ? "#ff3040" : "#fff"}
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={30} color="#fff" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={30} color="#fff" />
          <Text style={styles.actionText}>{item.shares}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom info */}
      <View style={styles.infoContainer}>
        <Text style={styles.creator}>@{item.creator}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.hashtags}>#career #growth #skills</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={CAREER_SHORTS}
        renderItem={renderShort}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / height);
          setCurrentIndex(index);
        }}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />

      {/* Top header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Career Shorts</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shortContainer: {
    width,
    height,
    position: 'relative',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  actionsContainer: {
    position: 'absolute',
    right: 15,
    bottom: 100,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 100,
    left: 15,
    right: 80,
  },
  creator: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  hashtags: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
});
