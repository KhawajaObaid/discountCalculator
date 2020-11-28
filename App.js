import React, { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Modal,FlatList,Image,ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import {
  Kaede,
  Hoshi,
  Jiro,
  Isao,
  Madoka,
  Akira,
  Hideo,
  Kohana,
  Makiko,
  Sae,
  Fumi,
} from "react-native-textinput-effects";

 


const App = () => {


  calculateDiscount = () => {
    if (discountPrc <= 100 && originalPrice >= 0 && discountPrc >= 0) {
      var saved = (originalPrice * discountPrc) / 100;
      var final_Price = originalPrice - saved;
      setSavedAmount(saved.toFixed(2));
      setFinalPrice(final_Price.toFixed(2));
      setCalError("")
    } else if (discountPrc > 100) {
      setCalError("Discount Cannot be greater than 100%");
    } else if (originalPrice < 0 || discountPrc < 0) {
      setCalError("Original Price or Discount Price must be greater than 0");
    }
  }

  saveResult = () => {
    var dash = " | ";
    var result = "Rs: " + originalPrice + dash + discountPrc + "% " + dash + "Rs: " + finalPrice;
    console.log(result);
    setHistory(oldHistory => [...history, result]);

    setOriginalPrice("");
    setDicountPrc("");
  }

  viewHistory = () => {
    setModalVisible(true);
  }

  
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrc, setDicountPrc] = useState("");
  const [savedAmount, setSavedAmount] = useState("0.00");
  const [finalPrice, setFinalPrice] = useState("0.00");

  const [calError, setCalError] = useState("");

  const [history, setHistory] = useState([""]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
     <ImageBackground style={ styles.background } 
                 resizeMode='cover' 
                 source={require('./shop.jpg')}>


        
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Discount Calculator</Text>
        
      </View>
      
      <View style={styles.mainView}>


        <View style={[styles.card2]}>
        <Fumi
          label={"Pervious Price"}
          labelStyle={{ color: "#a3a3a3" }}
          inputStyle={{ color: "#f95a25" }}
          iconClass={FontAwesomeIcon}
          iconName={"money"}
          iconColor={"#f95a25"}
          iconSize={15}
          keyboardType={"number-pad"} 
          value={originalPrice} 
          style={styles.textFields} 
          onChangeText={(orgPrice) => setOriginalPrice(orgPrice)} 
         
        />
        <Fumi
          style={styles.input}
          label={"Discount Percentage"}
          iconClass={FontAwesomeIcon}
          iconName={"percent"}
          iconColor={"#77116a"}
          keyboardType={"number-pad"}
          style={styles.textFields} 
          value={discountPrc}
          onChangeText={(discountPercentage) => setDicountPrc(discountPercentage)}
        />
      </View>




        
        <View style={{ paddingTop: 20 }} />
        <TouchableOpacity
          style={styles.appButtonContainer} onPress={() => calculateDiscount()}>
          
          <Text style={styles.appButtonText} >Calculate New Price</Text>
        </TouchableOpacity>
        
        <View style={{ paddingTop: 5 }} />
        <Text style={{ fontSize: 15, color: 'red' }}>{calError}</Text>
        <View style={{ paddingTop: 5 }} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.resultText}>Price To Pay :</Text>
          <Text style={styles.finalPriceText}> Rs {finalPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.resultText}>Discount :</Text>
          <Text style={[styles.finalPriceText, { color: `#00ffff` }]}> Rs {savedAmount}</Text>
        </View>
        <View style={{ paddingTop: 5 }} />
        <TouchableOpacity onPress={() => saveResult()} style={styles.hisbtncon}>
          <Text style={styles.hisbtn2}>Save Calculation</Text>
        </TouchableOpacity>
        <View style={{ paddingTop: 10 }} />
        
        <View style = { styles.container2 }>
        <Modal
            animationType = {"slide"}
            transparent={false}
            visible={modalVisible}
            style = {styles.modelq}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
            }}>

            <Image 
              source={require('./modimg.jpg')}
              style = { styles.image }/>
              



              <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeading}>Discount History</Text>
              <FlatList

                data={history}
                renderItem={({ item }) => { return <Text style={styles.listTextItem}>{item}</Text> }}
                keyExtractor={(index) => { return index }} />

              <TouchableOpacity
                style={{ ...styles.closeHistory, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>   





              
          </Modal>
            
          <TouchableOpacity
              style={styles.hisbtncon}
              onPress={() => {
              viewHistory()
              }}>
              <Text style={styles.hisbtn2}>View History</Text>
          </TouchableOpacity>          
       




      </View>

      </View>
            </View>

      
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "white",
  },
  container2:{
    opacity:0.8

  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: "center",
    color: "#404d5b",
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  orignal:{
    paddingTop:15,
  
  },
  image: {
    marginTop: 0,
    marginBottom: 10,
    width: '100%',
    height: 150,
  },
    appButtonContainer: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
   hisbtncon: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  hisbtn2:{
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appButtonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
   button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#748279',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 ,
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 0,
    marginBottom: 10,
    width: '100%',
    height: 150,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
modalq:{
  backgroundColor:'black',
  opacity:0.8
},
  modalView: {
    margin: 20,
    borderRadius: 10,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeHistory: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    width: 100,
    height: 30,
    elevation: 2,
    justifyContent: 'center'
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  firstIndexHistoryText: {
    fontSize: 18,
  },
  header: {
   paddingTop:100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 8.0,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  headerText: {
    fontSize: 24,
    color: 'white',
   
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  
  },
  textFields: {
    height: 50,
    width: 280,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 18,
    borderRadius: 10
    ,color: 'blue'
  },
  calcBtn: {
    height: 50,
    width: 200,
    backgroundColor: '#CB4335',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  calcBtnText: {
    fontSize: 24,
    color: 'white'
  },
  resultText: {
    fontSize: 20,
    color:`#778899` 
  },
  finalPriceText: {
    fontSize: 20,
    fontWeight: "bold"
    ,fontStyle:"italic",
    color:`#87ceeb`,
    textDecorationLine:"underline",

  }, background: {
      
      width: '100%',
      height: '100%',
       flexDirection: 'column',
    },
  saveBtn: {
    height: 35,
    width: 150,
    backgroundColor: '#388E3C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  saveBtnText: {
    fontSize: 18,
    color: 'white'
  },
  historyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyBtnText: {
    fontSize: 18,
    color: '#566573'
  },
  listTextItem: {
    fontSize: 18
  }
});

export default App;