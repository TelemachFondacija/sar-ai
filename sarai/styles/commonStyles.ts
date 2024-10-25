// styles/commonStyles.ts
import { StyleSheet, Platform } from 'react-native';

export const COLORS = {
  primary: '#2C4C3B',
  secondary: '#739072',
  accent: '#A0C49D',
  highlight: '#F1F7EE',
  background: '#E5F2E9',
  text: '#1C3829',
  inactive: '#AFC8AD',
  error: '#FF6B6B',
  success: '#4CAF50',
  warning: '#FFA726',
  glass: 'rgba(241, 247, 238, 0.8)',
};

export const commonStyles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'sans-serif',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Add other reusable styles here...
});
