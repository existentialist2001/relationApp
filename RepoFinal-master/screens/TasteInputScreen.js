import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
//취향에 대한 구체적 내용을 입력받는 페이지

/*
  <View style={styles.dateContainer}>
          <Text style={{ color: "grey" }}>일시</Text>
          <TextInput 
          style={styles.dateInputStyle}
          onChangeText={(text)=>setInputedDate(text)}
          />
  </View>
*/
/*
title, main의 컨테이너들은 모두 width를 전체의 80%로 주었다,,
*/

import { MaterialIcons } from "@expo/vector-icons";
//화살표 아이콘  <MaterialIcons name="arrow-back-ios" size={24} color="black" />

const TasteInputScreen = (props) => {
  //호칭 불러오는 로직
  let foundIndex = 0;
  for (let i = 0; i < props.tastes.length; i++) {
    //찾는다면
    if (props.tastes[i].name === props.currentTaste) {
      //해당하는 인덱스 넣기
      foundIndex = i;
      break;
    }
  }

  //찾은 인덱스를 바탕으로, 내용을 불러와서 변수에 저장
  let foundContent = props.tastes[foundIndex].content;

  //입력받은 구체적 호칭 내용 저장할 state
  const [inputedContent, setInputedContent] = useState('');
  //날짜(일단 스트링으로)
  const [inputedDate, setInputedDate] = useState('');
  //날짜 저장을 위한 로직
  const getDate = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week =["일","월","화","수","목","금","토"];
    //요일을 한글로 저장
    let dayOfWeek = week[now.getDay()];
    let hours =now.getHours();
    let minutes =now.getMinutes();

    return todayYear + "년 " + todayMonth + "월 " + todayDate +"일 "+ dayOfWeek+"요일 " + hours + " : " + minutes ;
  }


  //저장버튼 눌렸을 때
  const saveHandler = () =>{
    //변수에 저장한 내용으로 array 업데이트
    //내용저장
    props.tastes[foundIndex].content = inputedContent ;
    //날짜저장
    props.tastes[foundIndex].date=getDate();
    //인덱스 확인해서, 직접입력으로 새로 추가된 취향이면 그 통일된 이미지 주소 저장까지 해야함(인덱스는 0부터 시작이니 1 더해주기)
    //이거 여기서 하는거 아님
    // if (foundIndex+1 > 6)
    // {
    //   props.tastes[foundIndex].image ="../images/custom.png";
    // }

    //console.log("저장 버튼 누를 시점의 tastes배열",props.tastes);
    props.setTastes(currentLists => props.tastes);
    //처음 페이지(상세페이지)의 기본정보
    // props.changeScreenNum(1);

    //저장 버튼 누를시, content를 저장할 뿐만 아니라 처음 페이지로 돌아가도록
    //기본 취향을 통해서 들어왔다면
    if (props.fromWhere ==='click'){

      props.goback(false);
      props.turnOffTasteScreen(false);
    }
    //직접취향입력을 통해 들어왔다면
    else {

      props.goback(false);
      props.turnOffDirectInput(false);
    };
  };


  
  /*
  호칭 클릭해서 들어왔으면, 뒤로가기 할때 단순히 뒤로가기 하면됨
  호칭 새로 입력해서 들어왔으면, 뒤로가기 하면서 직전에 입력했던 호칭 내부적으로 지워야함.
  이전 component로 부터 fromWhere prop 받아서 구분,,
  */
  const gobackHandler = () => {
    if (props.fromWhere === "click") {
      //호칭 클릭해서 들어왔다면, 뒤로 갈때 그냥 뒤로 가면 됨
      props.goback(false);
    } 
    else {
      //그렇지 않은 경우에는 방금 입력했던 호칭 삭제하고 뒤로가기
      //삭제해주는 로직
      /*
        prop으로 변수나 함수를 받아오면, 사실 지역변수라고 할 수 있으므로,
        prop을 받아온 컴포넌트 안에서는 자유롭게 사용할 수 있으니까,
        pop함수를 사용했다.
        prop으로 받아오는 취향 종류들이 최신 상태이므로, 정상적으로 작동한다!
        */
      props.tastes.pop();
      props.setTastes((currentLists) => props.tastes);
      // console.log("삭제 후", props.tastes);
      //이걸 제일 마지막에 해야지..;;
      props.goback(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.container}>
          <TouchableOpacity onPress={gobackHandler}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {props.currentTaste}
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={saveHandler}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#627cec" }}
            >
              저장
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.title}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>이소망님의</Text>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {props.currentTaste} 취향은 어떤가요?
        </Text>
      </View>

      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <TextInput 

          placeholder={ (foundContent===null)? "내용을 입력해주세요": foundContent } 
          onChangeText={(text)=>setInputedContent(text)}
          />
        </View>
        <View style={styles.dateContainer}>
          <Text style={{color:'grey'}}>일시</Text>
          <View style={styles.dateStyle}>
          <Text style={{color:'grey', textAlign:'center'}}> {props.tastes[foundIndex].date}</Text>  
          </View>   
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flex: 1,
    marginTop: Dimensions.get("window").height / 20,
    marginLeft: Dimensions.get("window").width / 20,
    marginRight: Dimensions.get("window").width / 20,
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor: "yellow",
  },
  container: {
    flexDirection: "row",
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    //텍스트 왼쪽에서 띄우기 위해
    marginLeft: Dimensions.get("window").width * 0.1,
    marginBottom: Dimensions.get("window").width / 20,
    //backgroundColor: "green",
  },
  main: {
    flex: 8,
    //border를 main에서 설정해야함. title에는 width를 80%만 주었기 떄문에, 끝까지 border가 생기지 않음.
    borderTopWidth: 0.5,
    borderColor: "grey",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  inputContainer: {
    //내용을 입력해주세요 문구 border에서 띄우기 위해
    marginTop: Dimensions.get("window").height / 20,
    width: "80%",
    height: "50%",
    // backgroundColor: "green",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    // backgroundColor:'yellow',
   
  },
  dateStyle: {
    width: "80%",
    borderRadius:5,
    //backgroundColor:'red',
  },
});

export default TasteInputScreen;
