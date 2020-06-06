document.onkeydown	= keyDown;
function keyDown(event) {
  if (isfocus == 1) {return;}
    var key = event.which || event.keyCode;
    switch(key) {
      case 65:
        break;
      case 67:
        break;
      case 68:
        constButtonPressed();
        break;
      case 70:
        changeSeats();
        break;
      case 83:
        maleButtonPressed();
        break;
      case 88:
        removeTableWithPrompt();
        break;
      case 90:
        makeTableWithPrompt();
        break;
   }
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
      a += "<td><input class = 'normal cell' type = 'text' onclick = 'tableSelected(this)' onfocusin = 'isfocus = 1;' onfocusout = 'isfocus = 0;' onkeyup = 'this.value = this.value.replace(/¡/gi, \"\").replace(/¿/gi, \"\");'></input></td>";
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
      a += "<td><input class = 'normal cell' type = 'text' onclick = 'tableSelected(this)' onfocusin = 'isfocus = 1;' onfocusout = 'isfocus = 0;' onkeyup = 'this.value = this.value.replace(/¡/gi, \"\").replace(/¿/gi, \"\");'></input></td>";
    }
    a += "</tr>";
  }
  a += "</table>";
  tablemaker.innerHTML = a; //생성한 표 삽입
  document.getElementsByClassName("main")[0].appendChild(tablemaker);
}

function removeTableWithPrompt() {
  var main = document.getElementsByClassName("main")[0];
  var tip = document.getElementsByClassName("tip");
  var tableAmount = document.getElementsByClassName("table");
    if (tableAmount.length == 0) {
      tip[0].innerHTML = "<font color = '#E55B5B'>오류 : 지울 분단이 없습니다!</font>";
       return;
     }
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
    cell = document.getElementsByClassName("cell");
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
    if (select.className != "male cell") {select.className = "male cell";} else {select.className = "normal cell";}
  }
  if (mode == 2) {
    if (select.className != "const cell") {select.className = "const cell";} else {select.className = "normal cell";}
  }
  for (i = female.length-1; i >= 0; i--) {female[i].className = "normal cell";}
  for (i = female_empty.length-1; i >= 0; i--) {female_empty[i].className = "normal cell";}
  for (i = normal_empty.length-1; i >= 0; i--) {normal_empty[i].className = "normal cell";}
  for (i = male_empty.length-1; i >= 0; i--) {male_empty[i].className = "male cell";}
  for (i = const_empty.length-1; i >= 0; i--) {const_empty[i].className = "const cell";}
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
    for (i = female.length-1; i >= 0; i--) {female[i].className = "normal cell";}
    for (i = female_empty.length-1; i >= 0; i--) {female_empty[i].className = "normal cell";}
  }
  for (i = normal_empty.length-1; i >= 0; i--) {//normal_empty -> normal
    if (normal_empty[i].value.replace(" ","") != "") {
      normal_empty[i].className = "normal cell";
    }
  }
  for (i = male_empty.length-1; i >= 0; i--) {//male_empty -> male
    if (male_empty[i].value.replace(" ","") != "") {
      male_empty[i].className = "male cell";
    }
  }
  for (i = const_empty.length-1; i >= 0; i--) {//const_empty -> male
    if (const_empty[i].value.replace(" ","") != "") {
      const_empty[i].className = "const cell";
    }
  }
  for (i = normal.length-1; i >= 0; i--) {//normal -> normal_empty
    if (normal[i].value.replace(" ","") != "") {
      normal[i].className = "normal cell";
      normalList.push(normal[i].value);
    }
    else {
      normal[i].className = "normal_empty cell";
    }
  }
  for (i =male.length-1; i >= 0; i--) {//male -> male_empty
    if (male[i].value.replace(" ","") != "") {
      male[i].className = "male cell";
      maleList.push(male[i].value);
    }
    else {
      male[i].className = "male_empty cell";
    }
  }
  for (i =const_.length-1; i >= 0; i--) {//const -> const_empty
    if (const_[i].value.replace(" ","") == "") {
      const_[i].className = "const_empty cell";
    }
  }
  normalList = shuffleSeats(normalList);
  maleList = shuffleSeats(maleList);
  for (i = 0; i < normalList.length; i++) {normal[i].value = normalList[i];}
  for (i = 0; i < maleList.length; i++) {male[i].value = maleList[i];}
  if (male.length != 0 || male_empty.length != 0) { //normal class -> female class
    for (i = normal.length-1; i >= 0; i--) {normal[i].className = "female cell";}
    for (i = normal_empty.length-1; i >= 0; i--) {normal_empty[i].className = "female_empty cell";}
  }
}
function tipMsg(command) {
  var tip = document.getElementsByClassName("tip");
  var table = document.getElementsByClassName("table");
  switch(command) {
    case "default":
      tip[0].innerHTML = "<font color = 'gray'>자리바꾸기 공장에 오신 것을 환영합니다!</font>";
      break;
    case "info":
      tip[0].innerHTML = "감이 잡히지 않으신다면, <font color = '#ED7D31'>도움말</font>을 확인해 보세요!";
      break;
    case "male":
      if (mode == 1) {tip[0].innerHTML = "<font color = '#6DE3FF'>남학생 자리 지정 </font>모드를 비활성화합니다.";}
      else {tip[0].innerHTML = "<font color = '#6DE3FF'>남학생 자리 지정 </font>모드를 활성화합니다. 남학생 자리가 지정되면, 성별을 구분하여 자리가 배정됩니다.";}
      break;
    case "const":
      if (mode == 2) {tip[0].innerHTML = "<font color = '#FFD966'>고정석 지정 </font>모드를 비활성화합니다.";}
      else {tip[0].innerHTML = "<font color = '#FFD966'>고정석 지정 </font>모드를 활성화합니다. 고정석으로 지정된 자리는 자리가 바뀌지 않습니다.";}
      break;
    case "change":
      if (table[0] == undefined) {tip[0].innerHTML = "최종적으로 자리를 바꿉니다. 그러려면, 먼저 분단을 만드셔야겠죠?"}
      else {tip[0].innerHTML = "최종적으로 자리를 바꿉니다. 준비 되셨으면, 누르세요!";}
      break;
    case "create":
      if (table.length >= 10) {tip[0].innerHTML = "<font color = '#6DFFA5'>새로운 분단</font>을 만듭니다. 근데 선생님, 분단이 대체 몇 개인가요...";}
      else {tip[0].innerHTML = "<font color = '#6DFFA5'>새로운 분단</font>을 만듭니다. 가로, 세로 칸 수로 분단의 크기를 결정하실 수 있습니다.";}
      break;
    case "remove":
      if (table.length >= 1) {tip[0].innerHTML = "분단을 지정해 <font color = '#FF5B96'>지울</font> 수 있습니다.";}
      else {tip[0].innerHTML = "분단을 지정해 <font color = '#FF5B96'>지울</font> 수 있습니다. 우선 분단부터 만들어 보세요!";}
      break;
    case "save":
      tip[0].innerHTML = "지금까지의 작업을 <font color = '#A15BFF'>저장</font>합니다. 다음에 다시 방문하실 때, 저장하신 내용을 불러옵니다.";
      break;
    case "saved":
      tip[0].innerHTML = "지금까지의 작업이 <font color = '#A15BFF'>저장</font>되었습니다!";
      break;
    case "load":
      tip[0].innerHTML = "<font color = 'gray'>다시 돌아오신 것을 환영합니다! 이전에 저장하셨던 내용을 불러왔어요!</font>";
      break;
  }
}

function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    var cookie_value = escape(value) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
}

function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');
    for (var i = 0; i < val.length; i++) {
      x = val[i].substr(0, val[i].indexOf('='));
      y = val[i].substr(val[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, '');
      if (x == cookie_name) {
        return unescape(y);
      }
   }
}

function saveSeats() {
  var text = "작성하신 내용을 저장할까요?\n주의 : 입력하신 정보는 쿠키의 형태로 브라우저에 저장됩니다.\n서버에 저장되지 않으며, 정보를 저장하는 용도로만 사용될 것입니다.\n자세한 사항은 도움말을 참고하십시오. 계속하시겠습니까?";
  if (document.cookie != "") {text = "작성하신 내용을 저장할까요?\n주의 : 기존 데이터를 덮어씌우게 됩니다."}
  var table = document.getElementsByClassName("table");
  var cell = document.getElementsByClassName("cell");
  var num = 0;
  var data = "";
  if (table.length == 0) {return;}
  if (confirm(text) == false) {return;}
  for (i = 0; i < table.length; i++) {
    data += table[i].rows[0].cells.length + "¡" + table[i].rows.length;
    if (i != table.length - 1) {data += "¡";}
  }
  data += "¿";
  for (j = 0; j < cell.length; j++) {
    data += cell[j].className.split(" ")[0] + "¡" + cell[j].value.replace(/¿/gi, "").replace(/¡/, "");
    if (j != cell.length - 1) {data += "¡";}
  }
  data = data.replace(/normal/gi, 0).replace(/normal_empty/gi, 0).data.replace(/male/gi, 1).data.replace(/male_empty/gi, 1).data.replace(/const/gi, 2).data.replace(/const_empty/gi, 2).replace(/female/gi, 3).replace(/female_empty/gi, 3);
  setCookie("data", data, 365);
  tipMsg("saved");
}

function loadSeats() {
  var data = getCookie("data");
  if (data == "") {return;}
  cell = document.getElementsByClassName("cell");
  try {
    var layout = data.split("¿")[0].split("¡");
    var value = data.split("¿")[1].split("¡");
  }
  catch(e) {return;}
  if (layout.length % 2 != 0 || value.length % 2 != 0) {return;}
  for (i = 0; i < layout.length; i++) {if (isNaN(layout[i] || layout[i] > 10)) {return;}}
  for (i = 0; i < value.length; i = i + 2) {
    if (isNaN(value[i])) {return;}
    if (value[i] == 0 || value[i] == 1 || value[i] == 2 || value[i] == 3) {
      value[i] = value[i].replace(0, "normal cell").replace(1, "male cell").replace(2, "const cell").replace(3, "female cell");
    }
    else {return;}
  }
  try {
    for (k = 0; k < layout.length; k = k + 2) { //함수와의 충돌 방지를 위해 변수 변경
      makeTableAuto(layout[k], layout[k+1]);
    } //제작 작업
    cell[0].className[0] = value[0] + " cell";
    cell[0].value = value[1];
    for (i = 2; i < value.length; i = i + 2) {
      cell[i/2].className = value[i];
      cell[i/2].value = value[i+1];
    }
  } catch(e) {return;}
tipMsg("load");
}
