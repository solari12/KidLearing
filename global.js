// filepath: c:\ITAssignment\React-Native\KidLearing\globalStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   floatingTabBar: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      borderRadius: 15,
      backgroundColor: '#FFF',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      height: 70,
      paddingBottom: 10,
      paddingTop: 5,
   },
   tabBarVisible: {
      opacity: 1,
   },
   tabBarHidden: {
      opacity: 0,
      height: 0,
   },
   floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#333333',
      borderRadius: 50,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      width: 55,
   },
   floatingButtonText: {
      color: '#FFF',
      fontSize: 12,
      marginTop: 5,
      width: 40,
      textAlign: 'center',
   }, container: {
      flex: 1,
      backgroundColor: '#F0F8FF',
   },
   screen: {
      flex: 1,
      padding: 20,
      paddingTop: 100,
   },
   header: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
   },
   backButton: {
      marginRight: 16,
   },
   backButtonText: {
      fontSize: 16,
      color: '#007AFF',
   },
   screenTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
   },
   title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 32,
      color: '#333',
   },
   menuGrid: {
      flex: 1, // Take up the full available space
      flexDirection: 'row', // Arrange items in rows
      flexWrap: 'wrap', // Allow wrapping to the next row
   },
   menuItem: {
      width: '50%', // Each item takes 50% of the width
      height: '50%', // Each item takes 50% of the height
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
   },
   menuItemBackground: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'cover', // Ensure the image covers the entire item
   },
   menuText: {
      fontSize: 32,
      color: '#F0F7EE', // Main text color
      textAlign: 'center',
      textShadowColor: '#000', // Black outline
      textShadowOffset: { width: 2, height: 2 }, // Offset for the shadow
      textShadowRadius: 2, // Blur radius for the shadow
      fontFamily: 'Lexend', // Use a rounded font (default for Android)
      padding: 5,
      borderRadius: 5, // Optional: Add a slight border radius for better appearance
   },
   // Styles cho màn hình chữ cái
   alphabetGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingBottom: 32,
   },
   letterItem: {
      width: '23%',
      aspectRatio: 1,
      backgroundColor: '#FFE8E8',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
   },
   letterText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
   },
   wordHint: {
      fontSize: 12,
      color: '#666',
   },
   letterDetail: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   bigLetter: {
      fontSize: 96,
      fontWeight: 'bold',
      color: '#FF6B6B',
      marginBottom: 16,
   },
   letterWord: {
      fontSize: 32,
      color: '#333',
      marginBottom: 8,
   },
   letterPronoun: {
      fontSize: 24,
      color: '#666',
      marginBottom: 32,
   },
   backToListButton: {
      backgroundColor: '#007AFF',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 24,
   },
   backToListText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
   },
   // Styles cho màn hình số
   numbersGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingBottom: 32,
   },
   numberItem: {
      width: '30%',
      aspectRatio: 1,
      backgroundColor: '#FFF0DB',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
   },
   numberText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FF8C42',
   },
   numberDetail: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   bigNumber: {
      fontSize: 96,
      fontWeight: 'bold',
      color: '#FF8C42',
      marginBottom: 16,
   },
   numberWord: {
      fontSize: 32,
      color: '#333',
      marginBottom: 8,
   },
   numberExample: {
      fontSize: 24,
      color: '#666',
      marginBottom: 32,
   },
   // Styles cho màn hình hình dạng
   shapesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingBottom: 32,
   },
   shapeItem: {
      width: '50%', // Each item takes up half the width
      height: '33.33%', // Each item takes up half the height
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0, // Optional: Add a border for better visibility
      borderColor: '#ccc', // Optional: Border color
      backgroundColor: '#FFF', // Default background color
   },
   shapeText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
   },
   shapeDetail: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   shapeSample: {
      width: 200,
      height: 200,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
   },
   shapeDesc: {
      fontSize: 20,
      color: '#333',
      textAlign: 'center',
      marginBottom: 32,
      paddingHorizontal: 20,
   },
   // Styles cho màn hình màu sắc
   colorsContainer: {
      flex: 1,
      paddingBottom: 32,
   },
   colorItem: {
      width: '50%',
      height: '25%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   colorText: {
      fontSize: 22,
      fontWeight: 'bold',
   },
});

export default styles;