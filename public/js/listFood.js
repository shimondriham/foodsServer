const init = () => {
    doApi();
    declareViewEvents();
}
const declareViewEvents = () => {
    let id_form = document.querySelector("#id_form");
    id_form.addEventListener("submit", (e) => {
        e.preventDefault();
        let obgBody = {
            name: document.querySelector("#id_name").value,
            cals: document.querySelector("#id_cals").value,
            price: document.querySelector("#id_price").value,
            img: document.querySelector("#id_img").value
        }
        console.log(obgBody);
        doPostApi(obgBody);
    })
}
const doPostApi = async (_body) => {
    let url = "http://localhost:3002/foods";
    try {

        let resp = await axios({
            url,
            method: "POST",
            data: _body
        })
        console.log(resp.data);
        if (resp.data._id) {

            doApi();
        }
    }
    catch (err) {
        console.log(err);
    }
}

const doApi = async () => {
    let url = "http://localhost:3002/foods";
    let resp = await axios.get(url);
    console.log(resp.data);
    createFoodsList(resp.data)
}
const createFoodsList = (_ar) => {
    document.querySelector("#id_list").innerHTML = "";
    _ar.forEach(item => {
        let li = document.createElement("li");
        li.className = "my-1";
        document.querySelector("#id_list").append(li);
        li.innerHTML += `
     <button class="btn btn-danger x-btn">x</button>
     ${item.name} - ${item.price} NIS
     `
        let delBtn = li.querySelector(".x-btn")
        delBtn.addEventListener("click",()=>{
            if(window.confirm("are you shur"));
            doApiDel(item._id);
        })
    });
}
const doApiDel = async (_idDel)=>{
    let url = "http://localhost:3002/foods";
    try {
        let resp = await axios({
            url:url,
            method: "DELETE"
        })
        console.log(resp.data);
        if (resp.data.deleteCount == 1) {
            doApi();
        }
    }
    catch (err) {
        console.log(err);
    }
}

init();