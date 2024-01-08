const $main = document.querySelector('main');
const $addTime = document.querySelectorAll('.addTime');
const $inputTime = document.querySelector('.inputTime');
const $completeTime = document.querySelector('#completeTime');

const days = ['월','화','수','목','금'];
const getDay = (index) => {
  return days[index];
}

const makeTimetable = (grade) => {
  const timetable = document.querySelector(`#timetable-${grade}`)
  for(let i=9; i<18; i++){
    const hour = `${i}:00 ~ ${i+1}:00`
    const row = document.createElement('tr');
    const timecell = document.createElement('th');
    timecell.textContent=hour;
    row.appendChild(timecell);
    for(let j=0; j<5; j++){
      const cell = document.createElement('td');
      // 요일-학년-시간
      cell.id = `${getDay(j)}-${grade}-${i}`;
      row.appendChild(cell);
    }
    timetable.appendChild(row);
  }
}

makeTimetable(1);
makeTimetable(2);
makeTimetable(3);
makeTimetable(4);


let selectGrade = '';
$addTime.forEach((addbtn,index)=>{
  addbtn.addEventListener('click',()=>{
    $inputTime.style.display ='inline-block';
    $overlay.classList.add('active');
    selectGrade = index+1;
    console.log(selectGrade);
  })
})

$completeTime.addEventListener('click',()=>{
  let lectureName = document.querySelector('#lecture_name').value;  
  if(lectureName === ''){
    alert('강의명을 입력하세요');
    return
  }
  
  let day = '';

  let isChecked = false;
  document.getElementsByName('radio').forEach((radio)=>{
    if(radio.checked === true){
      day = radio.value;
      isChecked = true;
    }
  })
  if(!isChecked){
    alert('요일을 선택하세요');
    return
  }

  let startTime = +getstartTime();
  let endTime = +getEndTime();
  if(startTime >= endTime){
    alert('종료시간이 시작시간보다 앞섭니다.');
    return
  }
  let selectedColor = document.querySelector('#select_color').value;

  // 시간표 나타내기
  renderTimeTable(lectureName,day,startTime,endTime,selectedColor);
  // render 후 초기화
  clearinputTimeModal();
}) 

const getstartTime = () => {
  const $start_time = document.querySelector('#start_time');
  const startTime = $start_time.options[$start_time.selectedIndex].textContent;
  return startTime
}
const getEndTime = () => {
  const $end_time = document.querySelector('#end_time');
  const endTime = $end_time.options[$end_time.selectedIndex].textContent;
  return endTime
}

const renderTimeTable = (lectureName,day,startTime,endTime,selectedColor) => {  
  const $timetable= document.querySelector(`#timetable-${selectGrade}`);
  const cellToMerge = $timetable.rows[startTime-9+1].cells[days.indexOf(day)+1]
  console.log(cellToMerge);
  cellToMerge.setAttribute('rowspan',`${endTime-startTime}`)

  // display : none 하니까 edit할때 안될 수도
  for(let i=startTime+1; i<endTime; i++){
    $timetable.rows[i-9+1].cells[days.indexOf(day)+1].style.display ='none';
  }

  cellToMerge.innerHTML = `
  <div class = "btns">
    <button onclick="editSchedule()"><i class="fa-solid fa-pen"></i></button>
    <button onclick="deleteSchedule()"><i class="fa-solid fa-trash"></i></button>
  </div>
  <div>${lectureName}</div>
  `
  cellToMerge.style.backgroundColor = selectedColor;
}

// 현재 여러번 클릭하면 overlay active가 활성화된다.
const clearinputTimeModal = () => {
  $inputTime.style.display = 'none';
  $overlay.classList.remove('active');
  document.querySelector('#lecture_name').value ='';
  document.getElementsByName('radio').forEach((radio)=>{
    if(radio.checked === true){
      radio.checked = false;
    }
  })
  document.querySelector('#start_time').selectedIndex = 0;
  document.querySelector('#end_time').selectedIndex = 0;
  document.querySelector('#select_color').value = 0;
}

const editSchedule = () => {
  // 모달과 오버레이를 다시 연다. 입력한 정보와 시간을 채워서 연다.

  // 문제는 겹치는 시간이 있을 때 등록안되게 해놓을텐데 여기도 적용됨
}

const deleteSchedule = () => {

}

const clearTimetable = () => {

}