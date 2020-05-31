function onLoad() {
  mode = 0;
  document.getElementsByName("info_button")[0].disabled = false;
  document.getElementsByName("male_button")[0].disabled = false;
  document.getElementsByName("const_button")[0].disabled = false;
  document.getElementsByName("change_button")[0].disabled = false;
  document.getElementsByName("create_button")[0].disabled = false;
  document.getElementsByName("remove_button")[0].disabled = false;
  document.getElementsByName("save_button")[0].disabled = false;
}
function makeTableWithPrompt() {
var tableMessage = "새로 만드실 분단의 가로, 세로 칸 수를 정해주세요. 예시) 2,6";
  while(true) {
    var answer = prompt(tableMessage);
    if (answer == null) {return;}
    try {splitAnswer = answer.split(",");}
    catch(e) {
      tableMessage = "새로 만드실 분단의 가로, 세로 칸 수를 정해주세요. 예시) 2,6\n[ ! ] 예시를 참고하여 다시 입력해주시겠어요?"
      continue;
    }
    if (splitAnswer.length == "2") {
      var rows = Number(splitAnswer[0]);
      var columns = Number(splitAnswer[1]);
      if (rows % 1 == 0 && rows > 0 && columns % 1 == 0 && columns > 0) {
        if (rows <= 10 && columns <= 10) {
          console.log("정상적으로 숫자가 입력되었습니다.");
          break;
        }
        else {
          tableMessage = "새로 만드실 분단의 가로, 세로 칸 수를 정해주세요. 예시) 2,6\n[ ! ] 너무 큰 수는 입력할 수 없어요! 10 이하의 수로 입력해 주시겠어요?";
        }
      }
      else {
        tableMessage = "새로 만드실 분단의 가로, 세로 칸 수를 정해주세요. 예시) 2,6\n[ ! ] 자연수만 입력해 주시겠어요?";
      }
    }
    else {
      tableMessage = "새로 만드실 분단의 가로, 세로 칸 수를 정해주세요. 예시) 2,6\n[ ! ] 예시를 참고하여 다시 입력해 주시겠어요?";
    }
  }
  var tablemaker = document.createElement("table") //새로운 테이블 엘리먼트 생성
  tablemaker.setAttribute("class","table"); //class 설정
  var a = "";
  for (i = 1; i <= columns; i++) {
    a += "<tr>";
    for (j = 1; j <= rows; j++) {
      a += "<td><input class = 'normal' id = 'cell' type = 'text' onclick = 'tableSelected(this)'></input></td>";
    }
    a += "</tr>";
  }
  a += "</table>";
  tablemaker.innerHTML = a; //생성한 표 삽입
  document.getElementsByClassName("main")[0].appendChild(tablemaker);
}

function makeTableAuto(rows, columns) {
  var tablemaker = document.createElement("table") //새로운 테이블 엘리먼트 생성
  tablemaker.setAttribute("class","table"); //class 설정
  var a = "";
  for (i = 1; i <= columns; i++) {
    a += "<tr>";
    for (j = 1; j <= rows; j++) {
      a += "<td><input class = 'normal' id = 'cell' type = 'text' onclick = 'tableSelected()'></input></td>";
    }
    a += "</tr>";
  }
  a += "</table>";
  tablemaker.innerHTML = a; //생성한 표 삽입
  document.getElementsByClassName("main")[0].appendChild(tablemaker);
}

function removeTableWithPrompt() {
  var main = document.getElementsByClassName("main")[0];
  var tableAmount = document.getElementsByClassName("table");
    if (tableAmount.length == 0) {alert("지울 분단이 없습니다."); return;}
  if (tableAmount.length == 1) {
    if (confirm("1분단을 지우시겠어요?")){
      main.removeChild(tableAmount[0]);
    }
    return;
  }
  var removeMessage = "몇 분단을 지우시겠어요? 예시) 2";
  while(true) {
    var answer = prompt(removeMessage);
    if (answer == null) {return;}
    answer = Number(answer.replace("분단",""));
    if (answer != NaN) {
      if (answer % 1 == 0 && answer > 0) {
        if (answer <= tableAmount.length){
          main.removeChild(tableAmount[answer-1]);
          return;
        }
        else {
          removeMessage = "몇 분단을 지우시겠어요? 예시) 2\n[ ! ] "+tableAmount.length+ "분단까지만 지우실 수 있습니다!";
        }
      }
      else {
        removeMessage = "몇 분단을 지우시겠어요? 예시) 2\n[ ! ] 자연수만 입력해 주시겠어요?";
      }
    }
    else {
      removeMessage = "몇 분단을 지우시겠어요? 예시) 2\n[ ! ] 예시를 참고하여 다시 입력해주시겠어요?";
    }
  }
}

function maleButtonPressed() {
  if (mode == 1) {
    mode = 0;
    document.getElementById("male_button").src = "images/btn_male.png";
  }
  else {
    mode = 1;
    document.getElementById("male_button").src = "images/btn_male_activated.png";
    document.getElementById("const_button").src = "images/btn_const.png";
  }
}

function constButtonPressed() {
  if (mode == 2) {
    mode = 0;
    document.getElementById("const_button").src = "images/btn_const.png";
  }
  else {
    mode = 2;
    document.getElementById("const_button").src = "images/btn_const_activated.png";
    document.getElementById("male_button").src = "images/btn_male.png";
  }
}

function tableSelected(select) {
  var normal = document.getElementsByClassName("normal");
  var normal_empty = document.getElementsByClassName("normal_empty");
  var female = document.getElementsByClassName("female");
  var female_empty = document.getElementsByClassName("female_empty");
  var male_empty = document.getElementsByClassName("male_empty");
  var const_empty = document.getElementsByClassName("const_empty");
  if (mode == 1) {
    if (select.className != "male") {select.className = "male";} else {select.className = "normal";}
  }
  if (mode == 2) {
    if (select.className != "const") {select.className = "const";} else {select.className = "normal";}
  }
  for (i = female.length-1; i >= 0; i--) {female[i].className = "normal";}
  for (i = female_empty.length-1; i >= 0; i--) {female_empty[i].className = "normal";}
  for (i = normal_empty.length-1; i >= 0; i--) {normal_empty[i].className = "normal";}
  for (i = male_empty.length-1; i >= 0; i--) {male_empty[i].className = "male";}
  for (i = const_empty.length-1; i >= 0; i--) {const_empty[i].className = "const";}
}

function shuffleSeats(list) {
  var index, temp;
  for (i = list.length- 1; i > 0; i--) {
    index = Math.floor((i+1) * Math.random()); //랜덤 인덱스 생성
    temp = list[i]; // 마지막 값 임시저장
    list[i] = list[index]; // 마지막 값에 인덱스 값 덮어씌우기
    list[index] = temp; // 임시 값을 바뀐 위치에 저장
  }
  return list;
}
function changeSeats() {
  var normal = document.getElementsByClassName("normal");
  var male = document.getElementsByClassName("male");
  var const_ = document.getElementsByClassName("const");
  var normal_empty = document.getElementsByClassName("normal_empty");
  var male_empty = document.getElementsByClassName("male_empty");
  var const_empty = document.getElementsByClassName("const_empty");
  var female = document.getElementsByClassName("female");
  var female_empty = document.getElementsByClassName("female_empty");
  var normalList = [];
  var maleList = [];
  if (female.length != 0 || female_empty.length != 0) { //female class -> normal class
    for (i = female.length-1; i >= 0; i--) {female[i].className = "normal";}
    for (i = female_empty.length-1; i >= 0; i--) {female_empty[i].className = "normal";}
  }
  for (i = normal_empty.length-1; i >= 0; i--) {//normal_empty -> normal
    if (normal_empty[i].value.replace(" ","") != "") {
      normal_empty[i].className = "normal";
    }
  }
  for (i = male_empty.length-1; i >= 0; i--) {//male_empty -> male
    if (male_empty[i].value.replace(" ","") != "") {
      male_empty[i].className = "male";
    }
  }
  for (i = const_empty.length-1; i >= 0; i--) {//const_empty -> male
    if (const_empty[i].value.replace(" ","") != "") {
      const_empty[i].className = "const";
    }
  }
  for (i = normal.length-1; i >= 0; i--) {//normal -> normal_empty
    if (normal[i].value.replace(" ","") != "") {
      normal[i].className = "normal";
      normalList.push(normal[i].value);
    }
    else {
      normal[i].className = "normal_empty";
    }
  }
  for (i =male.length-1; i >= 0; i--) {//male -> male_empty
    if (male[i].value.replace(" ","") != "") {
      male[i].className = "male";
      maleList.push(male[i].value);
    }
    else {
      male[i].className = "male_empty";
    }
  }
  for (i =const_.length-1; i >= 0; i--) {//const -> const_empty
    if (const_[i].value.replace(" ","") == "") {
      const_[i].className = "const_empty";
    }
  }
  normalList = shuffleSeats(normalList);
  maleList = shuffleSeats(maleList);
  for (i = 0; i < normalList.length; i++) {normal[i].value = normalList[i];}
  for (i = 0; i < maleList.length; i++) {male[i].value = maleList[i];}
  if (male.length != 0 || male_empty.length != 0) { //normal class -> female class
    for (i = normal.length-1; i >= 0; i--) {normal[i].className = "female";}
    for (i = normal_empty.length-1; i >= 0; i--) {normal_empty[i].className = "female_empty";}
  }
}
