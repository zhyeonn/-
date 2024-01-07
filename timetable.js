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
  for(let i=9; i<=18; i++){
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

// 클릭한 버튼의 index+1을 해서 timetable-(index+1) 의 요소 수정
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
  const lectureName = document.querySelector('#lecture_name').value;  
  let day = '';

  document.getElementsByName('radio').forEach((radio)=>{
    if(radio.checked === true){
      day = radio.value;
    }
  })

  let startTime = +getstartTime();
  let endTime = +getEndTime();
  if(startTime >= endTime){
    alert('종료시간이 시작시간보다 앞섭니다.');
    return
  }
  
  const selectedColor = document.querySelector('#select_color').value;

  // 시간표 나타내기
  renderTimeTable(lectureName,day,startTime,endTime,selectedColor);
  // render 후 초기화
  $inputTime.style.display = 'none';
  $overlay.classList.remove('active');
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

//  colspan은 가로 방향으로의 병합을, rowspan은 세로 방향
const renderTimeTable = (lectureName,day,startTime,endTime,selectedColor) => {
  for(let i=startTime; i<endTime; i++){
    const $timetable = document.querySelector(`#${day}-${selectGrade}-${i}`);
    $timetable.textContent = lectureName;
    $timetable.style.backgroundColor = selectedColor;
  }
  
  // const $timetable= document.querySelector(`#timetable-${selectGrade}`);
  // const cellToMerge = $timetable.rows[startTime-9+1].cells[days.indexOf(day)+1]
  // cellToMerge.setAttribute('rowspan',`${endTime-startTime}`)
  // day를 index로 불러와서 딱 위치 지정해서 end-start만큼 병합
}