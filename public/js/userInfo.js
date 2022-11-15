const init = () => {
  doApi();
}
const doApi = async () => {
    let url = "http://localhost:3002/users/userInfo";
    fetch(url,{
       method:"GET",
       headers: {
        "x-api-key":localStorage["tokenFoods"],
        'Contect-type': 'appliction/json'
    }
    })
    .then(resp => resp.json())
    .then(data =>{
        console.log(data);
        document.querySelector("#id_name").innerHTML = data.name
        document.querySelector("#id_email").innerHTML = data.email
        document.querySelector("#id_id").innerHTML = data._id
    })
}
init();