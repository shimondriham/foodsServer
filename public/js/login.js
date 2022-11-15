const init = () => {
    declareEvents();
}
const declareEvents = () => {
    let id_form = document.querySelector("#id_form");
    id_form.addEventListener("submit", (e) => {
        e.preventDefault();
        let obgBody = {
            email: document.querySelector("#id_email").value,
            pass: document.querySelector("#id_password").value
        }
        console.log(obgBody);

        let url = "http://localhost:3002/users/login";
        fetch(url, {
            method: "POST",
            body: JSON.stringify(obgBody),
            headers: {
                'Contect-type': 'appliction/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                if(data.token){
                  localStorage.setItem("tokenFoods",data.token) 
                }
                else{
                    console.log("user or password worng")
                }
            })
    })
}
init();