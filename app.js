var mainList = document.getElementById('mainList')
var todoInput = document.getElementById('inp')
var todoInputId = document.getElementById('inpId')
var ToDoDataset={
    Id:"",
    Description:""
}

function addTodo() {
    SaveData()
    var inputText = todoInput.value
    var text = document.createTextNode(inputText)
    var li = document.createElement('li')
    li.setAttribute('class', 'list')
    li.appendChild(text)
    console.log(li)
    mainList.appendChild(li)
    todoInput.value = ''
    todoInputId.value=''

    var btnDiv = document.createElement('div')
    //=== Create Delete Button =====
    var deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('class', 'btn')
    deleteBtn.setAttribute('onClick', 'deletTodo(this)')
    var deleteBtnText = 'Delete Todo'
    var deleteText = document.createTextNode(deleteBtnText)
    deleteBtn.appendChild(deleteText)
    btnDiv.appendChild(deleteBtn)

    //=== Create Edit Button =====
    var editBtn = document.createElement('button')
    editBtn.setAttribute('class', 'btn')
    editBtn.setAttribute('onClick', 'editTodo(this)')
    var editText = document.createTextNode('Edit Todo')
    editBtn.appendChild(editText)
    btnDiv.appendChild(editBtn)

    li.appendChild(btnDiv)
}

function deletTodo(e) {
    var key=prompt("Enter the Id")
    e.parentNode.parentNode.remove()
    firebase.database().ref('ToDo/'+key).remove()
}

function editTodo(e) {
    var key=prompt("Enter the Id")
    var editText = prompt('Update Current Text')
    console.log(e.parentNode.parentNode.childNodes[0])
    var listText = e.parentNode.parentNode.firstChild
    listText.nodeValue = editText
    ToDoDataset.Description=editText
    firebase.database().ref('ToDo/'+key).set(ToDoDataset)
    
}

function deleteAll() {
    mainList.innerHTML = ''
    firebase.database().ref('ToDo/').remove()
}

function SaveData(){
    //Save Data On Firebase
    var key=todoInputId.value
    ToDoDataset.Id=todoInputId.value
    ToDoDataset.Description=todoInput.value
    firebase.database().ref('ToDo/'+key).set(ToDoDataset)
}











