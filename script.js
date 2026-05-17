const memoInput =
document.getElementById("memoInput");

const saveMemoBtn =
document.getElementById("saveMemoBtn");

const memoContainer =
document.getElementById("memoContainer");

let memos =
JSON.parse(localStorage.getItem("memos"))
|| [];


// SAVE MEMOS
function saveMemos(){

  localStorage.setItem(
    "memos",
    JSON.stringify(memos)
  );

}


// RENDER MEMOS
function renderMemos(){

  memoContainer.innerHTML = "";

  const reversedMemos =
  [...memos].reverse();

  reversedMemos.forEach(
    (memo,index)=>{

      const card =
      document.createElement("div");

      card.classList.add(
        "memo-card"
      );

      const realIndex =
      memos.length - 1 - index;

      card.innerHTML = `

        <p>${memo.text}</p>

        <button
        onclick="deleteMemo(${realIndex})">

          Delete

        </button>

      `;

      memoContainer.appendChild(card);

    }
  );

}


// DELETE MEMO
function deleteMemo(index){

  memos.splice(index,1);

  saveMemos();

  renderMemos();

}


// SAVE NEW MEMO
saveMemoBtn.addEventListener(
  "click",
  ()=>{

    const text =
    memoInput.value.trim();

    if(!text) return;

    memos.push({

      text

    });

    saveMemos();

    renderMemos();

    memoInput.value = "";

  }
);

renderMemos();

// SECRET ACCESS

const hiddenPortal =
document.getElementById(
  "hiddenPortal"
);

const privateSection =
document.getElementById(
  "privateSection"
);

const heroSection =
document.querySelector(".hero");

hiddenPortal.addEventListener(
  "click",
  ()=>{

    const password =
    prompt("Enter Password");

    if(password === "WhyAlwaysMe"){

      heroSection.classList.add(
        "hidden"
      );

      privateSection.classList.remove(
        "hidden"
      );

    }

    else{

      alert("Wrong Password");

    }

  }
);


// LOGOUT

const logoutBtn =
document.getElementById(
  "logoutBtn"
);

logoutBtn.addEventListener(
  "click",
  ()=>{

    privateSection.classList.add(
      "hidden"
    );

    heroSection.classList.remove(
      "hidden"
    );

  }
);


// DIARY SYSTEM

const diaryTitle =
document.getElementById(
  "diaryTitle"
);

const diaryText =
document.getElementById(
  "diaryText"
);

const saveDiaryBtn =
document.getElementById(
  "saveDiaryBtn"
);

const entriesContainer =
document.getElementById(
  "entriesContainer"
);

let diaryEntries =
JSON.parse(
  localStorage.getItem(
    "diaryEntries"
  )
)
|| [];


// SAVE ENTRIES
function saveDiaryEntries(){

  localStorage.setItem(
    "diaryEntries",
    JSON.stringify(diaryEntries)
  );

}


// RENDER ENTRIES
function renderEntries(){

  entriesContainer.innerHTML = "";

  const reversedEntries =
  [...diaryEntries].reverse();

  reversedEntries.forEach(
    (entry,index)=>{

      const card =
      document.createElement("div");

      card.classList.add(
        "entry-card"
      );

      const realIndex =
      diaryEntries.length - 1 - index;

      card.innerHTML = `

        <h4>
          ${entry.title}
        </h4>

        <p>
          ${entry.text}
        </p>

        <button
        onclick="deleteEntry(${realIndex})">

          Delete

        </button>

      `;

      entriesContainer.appendChild(
        card
      );

    }
  );

}


// DELETE ENTRY
function deleteEntry(index){

  diaryEntries.splice(index,1);

  saveDiaryEntries();

  renderEntries();

}


// SAVE NEW ENTRY
saveDiaryBtn.addEventListener(
  "click",
  ()=>{

    const title =
    diaryTitle.value.trim();

    const text =
    diaryText.value.trim();

    if(!title || !text) return;

    diaryEntries.push({

      title,
      text

    });

    saveDiaryEntries();

    renderEntries();

    diaryTitle.value = "";
    diaryText.value = "";

  }
);

renderEntries();