async function login(e){
    e.preventDefault();
    try{
        const response = await fetch('user.json');
        const{users}=await response.json();
        const user = users.find(u =>u.userid === userid.value && u.password === password.value);
        if(users){
            document.cookie=`user=$
                {encodeURIComponent(JSON.stringify(user))}; path=/`;
                location.href='landing.html';
            }
            else{
                errorMessage.textContent ="Invalid Credentials";
            }
        }catch(error){
            console.error("Error loading users",error);
            errorMessage.textContent="An error occourd while logging in";
        }

    }
    loginForm.onsubmit = login;