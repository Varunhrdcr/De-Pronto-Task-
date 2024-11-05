let users=[];
async function loadUsers(){
    try{
        const response = await fetch('https://localhost:3000/users');
        const data =await response.json();
        users=data.users;
        displayUsers();
    }catch(error){
        console.error("Error loading users:",error);
    }
}

function displayUsers(){
    const userTable = document.getElementById('userTable');
    userTable.innerHTML=`<tr><th>First_Name</th><th>Last_name</th><th>Phone</th><th>Action</th></tr>` + 
    users.map((u,i)=>`<tr><td>${u.first_name}</td><td>${u.last_name}</td><td>${u.phone_number}</td>
    <td>
    <button onclick="editUser(${i})">Edit</button>
    <button onclick="deleteUser(${i})">Delete</button>
    </td>
    </tr>`).join('');
}

async function saveUsers(){
try{
    const response = await fetch('http://localhost:3000/update-users', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({users})
    });
}catch(error){
    console.error("Error saving users:",error);
}
}

function editUser(index){
    const First_Name = prompt("Enter new first name :", users[index].first_name);
    const Last_Name = prompt("Enter last name :", users[index].last_name);
    const phone_Number = prompt("Enter Phone number :", users[index].phone_number);
    if (First_Name) users[index].first_name=First_Name;
    if (Last_Name) users[index].first_name=Last_Name;
    if (phone_Number) users[index].first_name=phone_Number;
    displayUsers();
    saveUsers();

}

function deleteUser(index){
    users.splice(index,1);
    displayUsers();
    saveUsers();
}

function addUser(){
    const First_Name = prompt("Enter first name :", "");
    const Last_Name = prompt("Enter last name :", "");
    const phone_Number = prompt("Enter Phone number :", "");
    if (First_Name && Last_Name && phone_Number){
        users.push({first_name:First_Name,last_name:Last_Name,phone_number:phone_Number
    });
    displayUsers();
    saveUsers();
}
}
loadUsers();