const $main = document.querySelector('main');
const $addTimebtn = document.querySelectorAll('.addTime');
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

const openInputTimeModal = () => {
  $overlay.classList.add('active');
  $inputTime.style.display = 'inline-block';
}

const closeInputTimeModal = () => {
  $overlay.classList.remove('active');
  $inputTime.style.display = 'none';
}

const schedule = [
  {
    'schedule-1' : {'월':[],'화':[],'수':[],'목':[],'금':[]}
  },
  {
    'schedule-2' : {'월':[],'화':[],'수':[],'목':[],'금':[]}
  },
  {
    'schedule-3' : {'월':[],'화':[],'수':[],'목':[],'금':[]}
  },
  {
    'schedule-4' : {'월':[],'화':[],'수':[],'목':[],'금':[]}
  },
];

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
  let startTime = +getstartTime();
  let endTime = +getEndTime();
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
  addSubject(day,lectureName,startTime,endTime,selectedColor);
  console.log(schedule);
  renderSchedule();
  closeInputTimeModal();
}

const addSubject = (day,lectureName,startTime,endTime,selectedColor) => {
  if(duplicateCheck(day,startTime,endTime)){
    schedule[selectedGrade-1][`schedule-${selectedGrade}`][day].push
    ({'startTime':startTime,'endTime':endTime,'lectureName':lectureName,'color':selectedColor})
  }
  else{
    alert('해당 시간에 이미 수업이 있습니다.');
  }
}

const duplicateCheck = (day,startTime,endTime) => {
  const daySchedule = schedule[selectedGrade-1][`schedule-${selectedGrade}`][day];
  let isDuplicateCheck = true;
  daySchedule.forEach((v)=>{
    const existingStartTime = v.startTime;
    const existingEndTime = v.endTime;
    if((startTime >= existingStartTime && startTime < existingEndTime )||
      (endTime > existingStartTime && endTime <= existingEndTime) ||
      (startTime <= existingStartTime && endTime >= existingEndTime))
    {
      isDuplicateCheck = false;
      return isDuplicateCheck
    }
  })
  return isDuplicateCheck
}

let selectedGrade = '';
$addTimebtn.forEach((button,index)=>{
  button.addEventListener('click', ()=>{
    selectedGrade = index+1;
    console.log(selectedGrade);
    openInputTimeModal();
  });
})

$completeTime.addEventListener('click',()=>{
  addSchedule(selectedGrade);
})

const renderSchedule = () => {
  schedule.forEach((gradeSchedule, gradeIndex) => {
    const timetable = document.getElementById(`timetable-${gradeIndex + 1}`);
    
    for (let i = 9; i <= 18; i++) {
      const hour = `${i}:00`;
      const timeCells = document.querySelectorAll(`#timetable-${gradeIndex + 1} td[id$='-${hour}']`);
      let currentMerge = null;
      
      timeCells.forEach((targetCell, cellIndex) => {
        const day = getDay(cellIndex);
        const scheduleData = gradeSchedule[`schedule-${gradeIndex + 1}`][day];
        
        if (scheduleData.some(item => item.startTime === hour)) {
          if (!currentMerge) {
            currentMerge = targetCell;
            currentMerge.rowSpan = 1;
          } else {
            currentMerge.rowSpan += 1;
            targetCell.style.display = 'none';
          }
        } else {
          if (currentMerge) {
            currentMerge = null;
          }
          targetCell.style.display = 'table-cell';
        }
      });
    }
  });
}


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


renderSchedule();
