import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

interface CareerStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  resources: string[];
}

export default function CareerMapScreen() {
  const [hasAssessment, setHasAssessment] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [careerPath, setCareerPath] = useState<CareerStep[]>([]);
  const [selectedPath, setSelectedPath] = useState('');

  const mockCareerPath: CareerStep[] = [
    {
      id: '1',
      title: 'Complete Basic Skills Assessment',
      description: 'Take government aptitude test to identify your strengths',
      duration: '1 week',
      completed: false,
      resources: ['Government Skills Portal', 'Aptitude Test Guide'],
    },
    {
      id: '2',
      title: 'Skill Development Phase',
      description: 'Focus on developing core competencies in your chosen field',
      duration: '3-6 months',
      completed: false,
      resources: ['Online Courses', 'Certification Programs'],
    },
    {
      id: '3',
      title: 'Practical Experience',
      description: 'Gain hands-on experience through internships or projects',
      duration: '6-12 months',
      completed: false,
      resources: ['Internship Portals', 'Project Platforms'],
    },
    {
      id: '4',
      title: 'Professional Networking',
      description: 'Build professional connections in your industry',
      duration: 'Ongoing',
      completed: false,
      resources: ['LinkedIn', 'Industry Events'],
    },
    {
      id: '5',
      title: 'Job Application Phase',
      description: 'Apply for positions matching your skills and interests',
      duration: '2-4 months',
      completed: false,
      resources: ['Job Portals', 'Company Websites'],
    },
  ];

  useEffect(() => {
    // Check if user has completed assessment
    checkAssessmentStatus();
  }, []);

  const checkAssessmentStatus = () => {
    // Mock check - replace with actual logic
    setHasAssessment(false);
    setCareerPath(mockCareerPath);
  };

  const startAssessment = () => {
    setShowWebView(true);
  };

  const generateCareerMap = () => {
    Alert.alert(
      'Career Map Generated!',
      'Your personalized career roadmap has been created based on your assessment results.',
      [{ text: 'OK', onPress: () => setHasAssessment(true) }]
    );
    setShowWebView(false);
    setCareerPath(mockCareerPath);
  };

  const toggleStepCompletion = (stepId: string) => {
    setCareerPath(prev =>
      prev.map(step =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  };

  if (showWebView) {
    return (
      <View style={styles.container}>
        <View style={styles.webViewHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowWebView(false)}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.webViewTitle}>Career Assessment</Text>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={generateCareerMap}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
        
        <WebView
          source={{ uri: 'https://web.careeradvisor.wadhwanifoundation.org/en/career-advisor/landing-page' }}
          style={styles.webView}
        />
      </View>
    );
  }

  if (!hasAssessment) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.assessmentContainer}
        >
          <Ionicons name="map" size={80} color="#fff" />
          <Text style={styles.assessmentTitle}>Create Your Career Map</Text>
          <Text style={styles.assessmentDescription}>
            Take our comprehensive career assessment to get a personalized roadmap
            for your professional growth.
          </Text>
          
          <TouchableOpacity
            style={styles.startButton}
            onPress={startAssessment}
          >
            <Text style={styles.startButtonText}>Start Assessment</Text>
          </TouchableOpacity>
          
          <View style={styles.features}>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.featureText}>Government Certified Test</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.featureText}>Personalized Roadmap</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.featureText}>AI-Powered Recommendations</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Career Map</Text>
        <Text style={styles.headerSubtitle}>
          Follow your personalized roadmap to success
        </Text>
        
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => setHasAssessment(false)}
        >
          <Ionicons name="refresh" size={16} color="#405de6" />
          <Text style={styles.retakeButtonText}>Retake Assessment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Overall Progress</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(careerPath.filter(step => step.completed).length / careerPath.length) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {careerPath.filter(step => step.completed).length} of {careerPath.length} steps completed
        </Text>
      </View>

      <View style={styles.roadmapContainer}>
        {careerPath.map((step, index) => (
          <View key={step.id} style={styles.stepContainer}>
            <View style={styles.stepLine}>
              {index < careerPath.length - 1 && (
                <View style={styles.connector} />
              )}
            </View>
            
            <TouchableOpacity
              style={[
                styles.stepCircle,
                step.completed && styles.completedCircle,
              ]}
              onPress={() => toggleStepCompletion(step.id)}
            >
              <Ionicons
                name={step.completed ? "checkmark" : "ellipse-outline"}
                size={20}
                color={step.completed ? "#fff" : "#405de6"}
              />
            </TouchableOpacity>
            
            <View style={styles.stepContent}>
              <Text style={[
                styles.stepTitle,
                step.completed && styles.completedText,
              ]}>
                {step.title}
              </Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
              <Text style={styles.stepDuration}>Duration: {step.duration}</Text>
              
              <View style={styles.resourcesContainer}>
                <Text style={styles.resourcesTitle}>Resources:</Text>
                {step.resources.map((resource, idx) => (
                  <TouchableOpacity key={idx} style={styles.resourceItem}>
                    <Ionicons name="link" size={14} color="#405de6" />
                    <Text style={styles.resourceText}>{resource}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  assessmentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  assessmentTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  assessmentDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 40,
  },
  startButtonText: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: 'bold',
  },
  features: {
    alignItems: 'flex-start',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  webViewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#405de6',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  webViewTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  doneButtonText: {
    color: '#405de6',
    fontWeight: 'bold',
  },
  webView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#405de6',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 15,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  retakeButtonText: {
    color: '#405de6',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  progressContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#405de6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  roadmapContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  stepLine: {
    alignItems: 'center',
    marginRight: 15,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#405de6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedCircle: {
    backgroundColor: '#405de6',
  },
  connector: {
    position: 'absolute',
    top: 40,
    width: 2,
    height: 50,
    backgroundColor: '#ddd',
  },
  stepContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  stepDuration: {
    fontSize: 12,
    color: '#405de6',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resourcesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  resourcesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  resourceText: {
    fontSize: 12,
    color: '#405de6',
    marginLeft: 5,
  },
});
