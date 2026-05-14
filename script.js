const heroPage =
document.getElementById("heroPage");

const privatePage =
document.getElementById("privatePage");

const singleDiaryPage =
document.getElementById("singleDiaryPage");

const logoutBtn =
document.getElementById("logoutBtn");

const openedDiaryTitle =
document.getElementById("openedDiaryTitle");

const entryTitle =
document.getElementById("entryTitle");

const entryText =
document.getElementById("entryText");

const saveBtn =
document.getElementById("saveBtn");

const entriesContainer =
document.getElementById("entriesContainer");

let currentDiary = null;


// DEFAULT PRIVATE DIARY NAMES
let diaryNames =
JSON.parse(localStorage.getItem("diaryNames"))
|| [
  "Diary 1",
  "Diary 2",
  "Diary 3",
  "Diary 4",
  "Diary 5",
  "Diary 6"
];


// LOAD PRIVATE DIARY NAMES
function loadDiaryNames(){

  diaryNames.forEach((name,index)=>{

    const diary =
    document.getElementById(
      `privateDiary${index}`
    );

    if(diary){

      diary.innerText = name;

    }

  });

}

loadDiaryNames();


// SECRET ACCESS
document.querySelector(".logo")
.addEventListener("dblclick",()=>{

  const password =
  prompt("Enter Password");

  if(password === "WhyAlwaysMe"){

    heroPage.classList.add("hidden");

    privatePage.classList.remove("hidden");

  }

  else{

    alert("Wrong Password");

  }

});


// OPEN PRIVATE DIARY
function openPrivateDiary(index){

  currentDiary = diaryNames[index];

  privatePage.classList.add("hidden");

  singleDiaryPage.classList.remove("hidden");

  openedDiaryTitle.innerText =
  currentDiary;

  renderEntries();

}


// BACK TO PRIVATE PAGE
function backToPrivate(){

  singleDiaryPage.classList.add("hidden");

  privatePage.classList.remove("hidden");

}


// LOGOUT
logoutBtn.addEventListener("click",()=>{

  privatePage.classList.add("hidden");

  heroPage.classList.remove("hidden");

});


// SAVE ENTRY
saveBtn.addEventListener("click",()=>{

  const title =
  entryTitle.value.trim();

  const text =
  entryText.value.trim();

  if(!title || !text) return;

  // GET OLD ENTRIES
  const oldEntries =
  JSON.parse(localStorage.getItem(currentDiary))
  || [];

  // RENAME DIARY
  if(oldEntries.length === 0){

    const diaryIndex =
    diaryNames.indexOf(currentDiary);

    diaryNames[diaryIndex] = title;

    localStorage.setItem(
      "diaryNames",
      JSON.stringify(diaryNames)
    );

    currentDiary = title;

    loadDiaryNames();

    openedDiaryTitle.innerText =
    currentDiary;

  }

  const today = new Date();

  const entry = {

    title,
    text,

    date:
    today.toLocaleDateString()

  };

  // GET UPDATED ENTRIES
  const updatedEntries =
  JSON.parse(localStorage.getItem(currentDiary))
  || [];

  updatedEntries.push(entry);

  localStorage.setItem(

    currentDiary,

    JSON.stringify(updatedEntries)

  );

  // CLEAR INPUTS
  entryTitle.value = "";
  entryText.value = "";

  renderEntries();

});


// RENDER ENTRIES
function renderEntries(){

  entriesContainer.innerHTML = "";

  const entries =
  JSON.parse(localStorage.getItem(currentDiary))
  || [];

  const reversedEntries =
  [...entries].reverse();

  reversedEntries.forEach((entry,index)=>{

    const div =
    document.createElement("div");

    div.classList.add("entry");

    const realIndex =
    entries.length - 1 - index;

    div.innerHTML = `

      <div class="entry-header">

        <h3>${entry.title}</h3>

        <span class="entry-date">

          ${entry.date}

        </span>

      </div>

      <p>${entry.text}</p>

      <button
      class="delete-btn"
      onclick="deleteEntry(${realIndex})">

        Delete

      </button>

    `;

    entriesContainer.appendChild(div);

  });

}


// DELETE ENTRY
function deleteEntry(index){

  const entries =
  JSON.parse(localStorage.getItem(currentDiary))
  || [];

  entries.splice(index,1);

  localStorage.setItem(

    currentDiary,

    JSON.stringify(entries)

  );

  renderEntries();

}