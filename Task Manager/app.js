
document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code here

    // const TaskManager = [];
    const TaskManager = JSON.parse(localStorage.getItem('allTask')) || [];
    // if(TaskManager==null){
    //     TaskManager[];

    // }


    document.getElementById('addform').addEventListener('submit', (e) => {
        e.preventDefault();
        let todo = document.getElementById('addTask').value;
        TaskManager.push({ todo: todo, status: "pending" });
        displayContent(TaskManager); // Call the function to update the display    
        // Clear the input field after adding the task
        document.getElementById('addTask').value = '';
        addModal.hide();
        // Save to local storage
        saveToLocalStorage(TaskManager);
    });

    console.log(TaskManager);

    
      

    const displayContent = (data) => {
        const elements = document.getElementById('content');
        elements.innerHTML = "";
        // Mapping this content to display content when it's rendered
        // add a data-id attribute to the "edit" button to store the task's index
        
    data.map((val, key) => {
        let statusBackgroundColor = "bg-secondary"; // Default background color

        if (val.status === "completed") {
            statusBackgroundColor = "bg-warning";
        } else if (val.status === "in-progress") {
            statusBackgroundColor = "bg-success";
        }

        elements.innerHTML += `
            <div class="card border-0 shadow-sm mt-3">
                <div class="card-body">
                    <h2 class="text-capitalize">${val.todo}</h2>
                    <button class="btn edit-button" data-id="${key}"><i class="fa-solid fa-pen-to-square"></i>edit</button>
                    <button class="btn trash-button" data-id="${key}"><i class="fa-solid fa-trash"></i>delete</button>
                    <span class="badge float-end p-2 ${statusBackgroundColor}">
                        ${val.status}
                    </span>
                </div>
            </div>
        `;   
        })
        // Save to local storage
        saveToLocalStorage(data);
        localStorage.getItem('allTask', JSON.stringify(data));
        
    }

    function saveToLocalStorage(data) {
        localStorage.setItem('allTask', JSON.stringify(data));
    }

    displayContent(TaskManager);

    
    var addModal= new bootstrap.Modal(document.getElementById('exampleModal'));
    var editModal= new bootstrap.Modal(document.getElementById('editModal'));


    // eventlistener for the edit button when rendered to show edit form
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-button')) {
            editModal.show();
            // Retrieve the task's id from the data-id attribute
            const id = e.target.dataset.id;
            document.getElementById('editTask').value=TaskManager[id].todo
            document.getElementById('editStatus').value=TaskManager[id].todo
            document.getElementById('taskId').value=id
        }
    });


    // function for edit and save

    document.getElementById('editform').addEventListener('submit', (e)=>{
        e.preventDefault();

        let todo=document.getElementById('editTask').value
        let status=document.getElementById('editStatus').value
        let id=document.getElementById('taskId').value


        TaskManager[id].todo=todo
        TaskManager[id].status=status


        displayContent(TaskManager);
        // hide the modal when edit is saved
        editModal.hide();

    })

    // function for delete
    // eventlistener for the delete button when rendered to trash task
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('trash-button')) {
            // Retrieve the task's ID from the data-id attribute
            const id = e.target.dataset.id;

            // Use confirm to ask for user confirmation
            if(confirm('are you sure')){
                TaskManager.splice(id, 1)
                displayContent(TaskManager);
            }
           
        }
    });
    
    
    
    
    
    
    
    
    
    
});




