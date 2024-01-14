const $main = document.querySelector('main');
const $addScheduleBtn = document.querySelectorAll('.addSchedule');
const $addScheduleModal = document.querySelector('.addScheduleModal');
const $completeAddSchedule = document.querySelector('#completeAddSchedule');
const $start_time = document.querySelector('#start_time');
const $end_time = document.querySelector('#end_time');
const $cancelAddSchedule = document.querySelector('#cancelAddSchedule');


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

const openAddScheduleModal = () => {
  $overlay.classList.add('strongActive');
  $addScheduleModal.style.display = 'inline-block';
}
const closeAddScheduleModal = () => {
  $overlay.classList.remove('strongActive');
  $addScheduleModal.style.display = 'none';
}

let selectedGrade = '';
$addScheduleBtn.forEach((button,index)=>{
  button.addEventListener('click', ()=>{
    selectedGrade = index+1;
    console.log(selectedGrade);
    openAddScheduleModal();
  });
})
$completeAddSchedule.addEventListener('click',()=>{
  addSchedule(selectedGrade);
})

const schedule = [];

const addSchedule = (grade) => {
  let lectureName = document.querySelector('#lecture_name').value;
  let day = '';
  let isChecked = false;
  document.getElementsByName('radio').forEach((radio)=>{
    if(radio.checked === true){
      day = radio.value;
      isChecked = true;
    }
  })

  let startTime = +$start_time.options[$start_time.selectedIndex].textContent;
  let endTime = +$end_time.options[$end_time.selectedIndex].textContent;
  let selectedColor = document.querySelector('#select_color').value;
  if(lectureName === ''){
    alert('강의명을 입력하세요');
    return
  }
  if(!isChecked){
    alert('요일을 선택하세요');
    return
  }
  if(startTime >= endTime){
    alert('종료시간이 시작시간보다 앞섭니다.');
    return
  }
  if(!addSubject(day,lectureName,startTime,endTime,selectedColor)){
    return
  };
  console.log(schedule);
  renderSchedule();
  closeAddScheduleModal();
}

const addSubject = (day,lectureName,startTime,endTime,selectedColor) => {
  if(duplicateCheck(day,startTime,endTime,selectedGrade)){
    const subject = {'grade': selectedGrade, 'day' : day, 'lectureName' : lectureName, 'startTime' : startTime, 'endTime' : endTime, 'color':selectedColor}
    schedule.push(subject)
    return true
  }
  else{
    alert('해당 시간에 이미 수업이 있습니다.');
    return false
  }
}

const duplicateCheck = (day,startTime,endTime,selectedGrade) => {
  let isDuplicateCheck = true;
  schedule.forEach((v,i)=>{
    const existingDay = v.day;
    const existingStartTime = v.startTime;
    const existingEndTime = v.endTime;
    const existingGrade = v.grade;
    if( (v.day === day) && (v.grade === selectedGrade) &&
    ((startTime >= existingStartTime && startTime < existingEndTime )||
    (endTime > existingStartTime && endTime <= existingEndTime) ||
    (startTime <= existingStartTime && endTime >= existingEndTime)) ) { // 같은날 일 때
      isDuplicateCheck = false;
      return isDuplicateCheck
    }
  })
  return isDuplicateCheck
}

const renderSchedule = () => {
  schedule.forEach((v,i)=>{
    const cellMerge = document.querySelector(`#${v.day}-${v.grade}-${v.startTime}`);
    cellMerge.setAttribute('rowspan',(v.endTime-v.startTime));
    cellMerge.innerHTML = `
    <div class = "btns">
    <button onclick="editSchedule('${v.day}',${v.grade},${v.startTime},${v.endTime})"><i class="fa-solid fa-pen"></i></button>
    <button onclick="deleteSchedule('${v.day}',${v.grade},${v.startTime},${v.endTime})"><i class="fa-solid fa-trash"></i></button>
    </div>
    <div>${v.lectureName}</div>
    `
    cellMerge.style.backgroundColor = v.color;
    console.log('111');
    //숨기기
    for(let j=v.startTime+1; j<v.endTime; j++){
      const hiddenCell = document.querySelector(`#${v.day}-${v.grade}-${j}`);
      hiddenCell.style.display = 'none';
    }
  })
}

//편집을 누르고 취소를 누르면 다시 되돌려야 함
let isClickCancel = false;
$cancelAddSchedule.addEventListener('click',()=>{
  closeAddScheduleModal();
})

const editSchedule = (day,grade,startTime,endTime) => {
  openAddScheduleModal();
  if(isClickCancel === true){
    isClickCancel = false;
    return
  }
  deleteSchedule(day,grade,startTime,endTime);
}

const deleteSchedule = (day,grade,startTime,endTime) => {
    schedule.forEach((v,i)=>{
      if((v.day === day) && (v.grade === grade) && (v.startTime == startTime) && (v.endTime === endTime) ){
        schedule.splice(i,1);
        console.log(schedule);
      }
    })
    const cancelMergeCell = document.querySelector(`#${day}-${grade}-${startTime}`);
    cancelMergeCell.setAttribute('rowspan','');
    cancelMergeCell.style.backgroundColor = 'white';
    cancelMergeCell.textContent = '';
    for(let i=startTime+1; i<endTime; i++){
      document.querySelector(`#${day}-${grade}-${i}`).style.display = 'table-cell';
    }
}