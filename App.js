import { StatusBar } from 'expo-status-bar'

import { StyleSheet, SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native'


import React, { useState } from 'react'
//import { color } from 'react-native-reanimated';
import Data from './data.json';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [yanitlar, setYanitlar] = useState([]);

  const [dogru, setDogru] = useState(0);
  const data = Data[0];      //Datanın içindeki ilk item erişim sağlandı.
  const questions = data.questions;      //itemin içindeki questions dizisine ulaştık
  const cevaplar = questions[currentQuestion].answers;
  const soruAdi = questions[currentQuestion].name;
  const cevapTiklama = (item) => {
    if (currentQuestion == 4) {
      setShowScore(true);

      setYanitlar([...yanitlar, { "answer": item.name, "score": item.score, "questionNum": currentQuestion + 1, "key": currentQuestion + 1 }]);

      return;
    }     //soru sayısı 5 i geçmesin
    setScore(item.score);
    if (item.isCorrect == "true") {
      setDogru(dogru + 1);
    };
    setCurrentQuestion(currentQuestion + 1);        //soru sayısını 1 arttırdım


    setYanitlar([...yanitlar, { "answer": item.name, "score": item.score, "questionNum": currentQuestion + 1, "key": currentQuestion + 1 }]);   //önceki yanıtlara , ekle yazdığım ifadeyi koy
  };
  return (
    <View style={styles.container} >
      {showScore ? (
        <View style={styles.sonuc}>

          <Text style={styles.score}>	You scored {dogru} out of {questions.length}</Text>
          <FlatList
            data={yanitlar}
            renderItem={({ item }) => (
              <Text style={styles.answerText}> Questions {item.questionNum} Your answer :{item.answer} Your Score : {item.score} </Text>
            )}
          />
        </View>
      ) : (
          <>
            <View style={styles.header}>
              <View style={styles.questionTitle}>
                <Text style={styles.question}>Question {currentQuestion + 1}</Text>
              </View>
              <View style={styles.questionView} ><Text style={styles.questionText} >{soruAdi}</Text></View>
            </View>

            <View style={styles.answers}>
              <FlatList
                data={cevaplar}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => cevapTiklama(item)}>
                    <View style={styles.answerView}>
                      <Text style={styles.answerText}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </>
        )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33506d',
    //alignItems: 'center',
    //justifyContent: "flex-end",
    //position:"relative",
    //padding:20,

  },

  questionView: {
    //width: "100%",
    backgroundColor: "#1e2c3d",
    borderColor: "#0c0c0c",
    borderWidth: 2,
    borderRadius: 25,
    //height: 70,
    //marginBottom: 50,
    //justifyContent: "center",
    //padding: 10,
    // flexDirection:"row",
    alignItems: "center",
    //marginTop:33,
    //paddingRight:10,
    padding: 15

  },

  questionText: {
    color: "white",
    marginRight: 10,
    paddingLeft: 15,
    textAlign: "left",
  },

  answerView: {
    //width: "100%",
    backgroundColor: "#1e2c3d",
    borderRadius: 25,
    //height: 50,
    borderColor: "#0c0c0c",
    borderWidth: 2,
    borderStyle: "dashed",
    //marginBottom: 260,
    //paddingRight: 10,
    //flexDirection:"column",
    alignItems: "center",
    //paddingTop:14,
    //paddingHorizontal:24.5,
    marginTop: 8,
    padding: 15,
    paddingBottom: 18,
    paddingTop: 18,


  },
  answerText: {

    color: "white",

    //paddingTop: 2,
    //paddingBottom: 2,
    //marginBottom: 2,
    //marginTop:1,
    fontSize: 15,
    //lineHeight: 30,
    //marginRight:10,
    //paddingLeft:1,
    textAlign: "left",

  },
  score: {
    //width: "90%",
    backgroundColor: "#465881",
    borderRadius: 25,
    //height: 50,
    //marginBottom: 20,
    justifyContent: "center",
    //padding: 10,
    color: 'white'
  },

  question: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  questionTitle: {
    //flexDirection:"row",
    //marginTop:70,
    //justifyContent:"space-between",
    marginLeft: 30,
    padding: 20
  },

  header: {

    marginTop: 90,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },

  answers: {
    marginTop: 20,
  },

  sonuc: {

    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex:1,
    marginTop:180,
    padding:20,
 
  },

})
