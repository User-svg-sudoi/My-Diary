// TASK SYSTEM

const taskInput =
document.getElementById("taskInput");

const addTaskBtn =
document.getElementById("addTaskBtn");

const taskList =
document.getElementById("taskList");

let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];


// SAVE TASKS
function saveTasks(){

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}


// RENDER TASKS
function renderTasks(){

  taskList.innerHTML = "";

  tasks.forEach((task,index)=>{

    const li =
    document.createElement("li");

    li.classList.add("task-item");

    li.innerHTML = `

      <div class="task-left">

        <input
        type="checkbox"
        ${task.completed ? "checked" : ""}>

        <span class="${
          task.completed
          ? "completed"
          : ""
        }">

          ${task.text}

        </span>

      </div>

      <button class="delete-btn">
        ✕
      </button>

    `;

    const checkbox =
    li.querySelector("input");

    const deleteBtn =
    li.querySelector(".delete-btn");

    checkbox.addEventListener(
      "change",
      ()=>{

        tasks[index].completed =
        checkbox.checked;

        saveTasks();
        renderTasks();

      }
    );

    deleteBtn.addEventListener(
      "click",
      ()=>{

        tasks.splice(index,1);

        saveTasks();
        renderTasks();

      }
    );

    taskList.appendChild(li);

  });

}


// ADD TASK
addTaskBtn.addEventListener(
  "click",
  ()=>{

    const text =
    taskInput.value.trim();

    if(text === "") return;

    tasks.push({

      text,
      completed:false

    });

    saveTasks();
    renderTasks();

    taskInput.value = "";

  }
);

renderTasks();


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