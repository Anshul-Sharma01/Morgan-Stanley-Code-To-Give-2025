import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text, ImageBackground, TouchableWithoutFeedback, Dimensions, Animated, Easing } from 'react-native';
import MonthButton from '../components/MonthButton';
import ProgressModal from '../components/ProgressModal';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TimelineScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const scrollViewRef = useRef(null);

  // Animation values
  const headerAnim = useRef(new Animated.Value(-50)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const welcomeScale = useRef(new Animated.Value(0.9)).current;
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const yearScale = useRef(new Animated.Value(0.9)).current;
  const yearOpacity = useRef(new Animated.Value(0)).current;

  // Expanded progress data including previous year
  const progressData = {
    2023: {
      'January': { marks: 78, assessments: [
        { id: 1, title: 'Math Quiz', score: 75, date: '2023-01-10' },
        { id: 2, title: 'Science Test', score: 82, date: '2023-01-20' },
      ]},
      'February': { marks: 82, assessments: [
        { id: 1, title: 'History Essay', score: 88, date: '2023-02-05' },
        { id: 2, title: 'English Presentation', score: 76, date: '2023-02-15' },
      ]},
      'March': { marks: 85, assessments: [
        { id: 1, title: 'Physics Lab', score: 90, date: '2023-03-08' },
        { id: 2, title: 'Chemistry Test', score: 80, date: '2023-03-18' },
      ]},
      'April': { marks: 79, assessments: [
        { id: 1, title: 'Geography Project', score: 85, date: '2023-04-12' },
        { id: 2, title: 'Biology Quiz', score: 73, date: '2023-04-22' },
      ]},
      'May': { marks: 88, assessments: [
        { id: 1, title: 'Math Final', score: 92, date: '2023-05-05' },
        { id: 2, title: 'Science Final', score: 84, date: '2023-05-15' },
      ]},
      'June': { marks: 91, assessments: [
        { id: 1, title: 'End of Year Project', score: 95, date: '2023-06-10' },
        { id: 2, title: 'Final Presentation', score: 87, date: '2023-06-20' },
      ]},
      'July': { marks: 0, assessments: [] }, // Summer break
      'August': { marks: 0, assessments: [] }, // Summer break
      'September': { marks: 80, assessments: [
        { id: 1, title: 'Back to School Quiz', score: 80, date: '2023-09-15' },
      ]},
      'October': { marks: 83, assessments: [
        { id: 1, title: 'Mid-term Exam', score: 83, date: '2023-10-20' },
      ]},
      'November': { marks: 86, assessments: [
        { id: 1, title: 'Research Paper', score: 86, date: '2023-11-10' },
      ]},
      'December': { marks: 89, assessments: [
        { id: 1, title: 'Final Exam', score: 89, date: '2023-12-15' },
      ]},
    },
    2024: {
      'January': { marks: 78, assessments: [
        { id: 1, title: 'Math Quiz', score: 75, date: '2023-01-10' },
        { id: 2, title: 'Science Test', score: 82, date: '2023-01-20' },
      ]},
      'February': { marks: 82, assessments: [
        { id: 1, title: 'History Essay', score: 88, date: '2023-02-05' },
        { id: 2, title: 'English Presentation', score: 76, date: '2023-02-15' },
      ]},
      'March': { marks: 85, assessments: [
        { id: 1, title: 'Physics Lab', score: 90, date: '2023-03-08' },
        { id: 2, title: 'Chemistry Test', score: 80, date: '2023-03-18' },
      ]},
      'April': { marks: 79, assessments: [
        { id: 1, title: 'Geography Project', score: 85, date: '2023-04-12' },
        { id: 2, title: 'Biology Quiz', score: 73, date: '2023-04-22' },
      ]},
      'May': { marks: 88, assessments: [
        { id: 1, title: 'Math Final', score: 92, date: '2023-05-05' },
        { id: 2, title: 'Science Final', score: 84, date: '2023-05-15' },
      ]},
      'June': { marks: 91, assessments: [
        { id: 1, title: 'End of Year Project', score: 95, date: '2023-06-10' },
        { id: 2, title: 'Final Presentation', score: 87, date: '2023-06-20' },
      ]},
      'July': { marks: 0, assessments: [] }, // Summer break
      'August': { marks: 0, assessments: [] }, // Summer break
      'September': { marks: 80, assessments: [
        { id: 1, title: 'Back to School Quiz', score: 80, date: '2023-09-15' },
      ]},
      'October': { marks: 83, assessments: [
        { id: 1, title: 'Mid-term Exam', score: 83, date: '2023-10-20' },
      ]},
      'November': { marks: 86, assessments: [
        { id: 1, title: 'Research Paper', score: 86, date: '2023-11-10' },
      ]},
      'December': { marks: 89, assessments: [
        { id: 1, title: 'Final Exam', score: 89, date: '2023-12-15' },
      ]},
    },
    2025: {
      'January': { marks: 82, assessments: [
        { id: 1, title: 'Winter Math Challenge', score: 85, date: '2024-01-15' },
        { id: 2, title: 'Science Olympiad', score: 79, date: '2024-01-25' },
      ]},
      'February': { marks: 86, assessments: [
        { id: 1, title: 'Literature Analysis', score: 90, date: '2024-02-10' },
        { id: 2, title: 'History Presentation', score: 82, date: '2024-02-20' },
      ]},
      'March': { marks: 88, assessments: [
        { id: 1, title: 'Biology Project', score: 92, date: '2024-03-05' },
        { id: 2, title: 'Math Competition', score: 84, date: '2024-03-15' },
      ]},
      // Other months can be added as they progress
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  // Determine which months are active based on current date
  const activeMonths = useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-based index

    // Function to check if a month is active
    const isMonthActive = (monthIndex, year) => {
      if (year < currentYear) return true; // All months in previous years are active
      if (year > currentYear) return false; // Future years are inactive
      return monthIndex <= currentMonth; // In current year, only months up to current month
    };

    // Create an object mapping months to their active status
    const activeMonthsObj = {};
    
    // Add current and previous years
    [currentYear, currentYear - 1, currentYear - 2].forEach(year => {
      activeMonthsObj[year] = months.reduce((acc, month, index) => {
        acc[month] = {
          active: isMonthActive(index, year),
          year: year
        };
        return acc;
      }, {});
    });

    return activeMonthsObj;
  }, []);

  useEffect(() => {
    // Get current date details
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-based index
  
    // Find index of current month in the selected year
    const yearIndex = Object.keys(progressData).indexOf(currentYear.toString());
    if (yearIndex === -1) return; // Year not found in progressData
  
    // Calculate scroll position based on year and month
    setTimeout(() => {
      if (scrollViewRef.current) {
        const monthIndex = months.indexOf(Object.keys(progressData[currentYear])[currentMonth]);
        if (monthIndex !== -1) {
          scrollViewRef.current.scrollTo({
            y: (yearIndex * 12 + monthIndex) * 160, // Adjusted for year & month
            animated: true,
          });
        }
      }
    }, 1000); // Small delay to ensure layout is ready
  }, []);
  

  useEffect(() => {
    // Animate header
    Animated.parallel([
      Animated.spring(headerAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
      }),
      Animated.spring(headerOpacity, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
      }),
    ]).start();

    // Animate welcome overlay if visible
    if (welcomeVisible) {
      Animated.parallel([
        Animated.spring(welcomeScale, {
          toValue: 1,
          useNativeDriver: true,
          damping: 15,
        }),
        Animated.spring(welcomeOpacity, {
          toValue: 1,
          useNativeDriver: true,
          damping: 15,
        }),
      ]).start();
    }
  }, []);

  const handleWelcomeDismiss = () => {
    Animated.parallel([
      Animated.timing(welcomeScale, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(welcomeOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setWelcomeVisible(false);
    });
  };

  // Enhanced month press handler with animations
  const handleMonthPress = (month) => {
    if (welcomeVisible) {
      setWelcomeVisible(false);
    }

    const currentDate = new Date();
    const years = [currentDate.getFullYear(), currentDate.getFullYear() - 1, currentDate.getFullYear() - 2];
    const validYear = years.find(year => 
      progressData[year] && progressData[year][month]
    );

    if (validYear && activeMonths[validYear][month].active) {
      setCurrentYear(validYear);
      setSelectedMonth(month);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Render years in descending order
  const yearsToRender = [currentYear - 2, currentYear - 1, currentYear]
    .filter(year => progressData[year]);

  // Welcome overlay
  const WelcomeOverlay = () => (
    <Animated.View 
      style={[
        styles.welcomeOverlay,
        {
          opacity: welcomeOpacity,
        }
      ]}
    >
      <TouchableWithoutFeedback onPress={handleWelcomeDismiss}>
        <Animated.View 
          style={[
            styles.welcomeContent,
            {
              transform: [{ scale: welcomeScale }],
            }
          ]}
        >
          <Text style={styles.welcomeTitle}>Welcome to Your Academic Journey!</Text>
          <Text style={styles.welcomeSubtitle}>Tap anywhere to explore your progress</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );

  // Header
  const Header = () => (
    <Animated.View 
      style={[
        styles.header,
        {
          transform: [{ translateY: headerAnim }],
          opacity: headerOpacity,
        }
      ]}
    >
      <Text style={styles.headerTitle}>Student Timeline</Text>
      <Text style={styles.headerSubtitle}>View your progress by month</Text>
    </Animated.View>
  );

  // Year container
  const YearContainer = ({ year, children, index }) => {
    useEffect(() => {
      const delay = index * 200;
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.spring(yearScale, {
            toValue: 1,
            useNativeDriver: true,
            damping: 15,
          }),
          Animated.spring(yearOpacity, {
            toValue: 1,
            useNativeDriver: true,
            damping: 15,
          }),
        ]),
      ]).start();
    }, []);

    return (
      <Animated.View 
        style={[
          styles.yearContainer,
          {
            transform: [{ scale: yearScale }],
            opacity: yearOpacity,
          }
        ]}
      >
        <Text style={styles.yearTitle}>{year} Academic Year</Text>
        {children}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../../assets/bgApp.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.7)', 'rgba(119, 119, 119, 0.9)']}
          style={StyleSheet.absoluteFillObject}
        />
        
        {welcomeVisible && <WelcomeOverlay />}
        <Header />
        
        <View style={styles.timelineContainer}>
          <ScrollView 
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={160}
            snapToAlignment="center"
          >
            {yearsToRender.map((year, yearIndex) => (
              <YearContainer key={year} year={year} index={yearIndex}>
                {months.map((month, index) => {
                  let horizontalOffset = 0;
                  const quarterSize = Math.ceil(months.length / 4);
                  
                  if (index < quarterSize) {
                    horizontalOffset = -60 * (quarterSize - index);
                  } else if (index < quarterSize * 2) {
                    horizontalOffset = 60 * (index - quarterSize);
                  } else if (index < quarterSize * 3) {
                    horizontalOffset = -60 * (index - 2 * quarterSize + 1);
                  } else {
                    horizontalOffset = -60 * (4 * quarterSize - index);
                  }
                  
                  return (
                    <View 
                      key={month}
                      style={[
                        styles.monthButtonContainer,
                        {
                          marginLeft: horizontalOffset,
                          opacity: activeMonths[year][month].active ? 1 : 0.3
                        }
                      ]}
                    >
                      <MonthButton 
                        month={month} 
                        onPress={handleMonthPress} 
                        disabled={!activeMonths[year][month].active}
                        isActive={activeMonths[year][month].active}
                      />
                    </View>
                  );
                })}
              </YearContainer>
            ))}
          </ScrollView>
        </View>
        
        <ProgressModal 
          visible={modalVisible} 
          month={selectedMonth} 
          data={selectedMonth ? progressData[currentYear][selectedMonth] : null}
          onClose={closeModal} 
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  welcomeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 10,
  },
  welcomeContent: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 30,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(187, 222, 251, 0.8)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#1976D2',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  timelineContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  yearContainer: {
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  yearTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  monthButtonContainer: {
    alignSelf: 'center',
    marginVertical: 5,
  },
});

export default TimelineScreen;