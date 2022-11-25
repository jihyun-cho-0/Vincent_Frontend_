// 필터 스크롤
function $(el) {
    return  document.querySelector(el);
}
function slid() {
 // input value
 var sv=$("#slid").value;
 // cards contenar width minus perent width divide input max range value multi input value
 var pw=(($("#cards").clientWidth-$("#contenar").clientWidth)/50)*sv;
 $("#cards").style="right:"+pw+"px";
 
 // the width of the cerlc
 var cer=$("#cerlc").offsetWidth;
 // cerlc perent width minus the cerlc width divide input max range multi input value
 var iw=(($("#slid").clientWidth-cer)/50)*sv;
 $("#cerlc").style="left:"+iw+"px";
}








//////////////////////////////////////////적용 작업중//////////////////////////////////////////////////////////////////////



var server = "http://127.0.0.1:8000"

window.onload = ()=>{
    console.log("게시글 생성 js 로딩완료");
    filter_list()  
    
}


// 모든 필터 목록 출력
async function filter_list() {
    // 해당 url로 요청보내고 응답데이터 받기 : fetch
    const response = await fetch('http://127.0.0.1:8000/filter/?sort=modal', {
        // headers:{
        //     "Authorization":"Bearer "+localStorage.getItem("access")
        // },
        method:'GET'
    })
    // Promise 안에 담긴 데이터 꺼내오기
    .then(response => {
        return response.json();
    }).then(data => {
        return data
    });

    console.log("1sssssssssssssss1",response)

    var filters = document.getElementById("cards"); // 각각의 필터이름,이미지가 담긴 div를 추가할 부모 div

    for (i = 0; i < response['results'].length; i++) {
        const filter_pk = response['results'][i]['pk'];

        var filter_info = document.createElement("div"); // 이미지와 이름을 묶어주는 컨테이너 div 생성
        filter_info.className = "card"; // css class 지정
        filters.appendChild(filter_info);

        var filter_image = document.createElement("img"); // img 테그 생성
        filter_image.className = "card_img"; // css class 지정
        filter_image.src = response['results'][i]['filter_image']; // img 테그 scr 경로 지정
        filter_image.alt = response['results'][i]['pk']; // img 테그 alt 경로 지정
        filter_image.id = response['results'][i]['pk']; // img 테그 id값 지정
        filter_image.setAttribute("onclick", "filter_pick("+filter_pk+")"); // 선택한 div 클릭 시 해당 함수 호출
        filter_info.appendChild(filter_image);


        const filter_name = document.createElement("span"); // div 테그 생성
        filter_name.className = "card_title"; // css class 지정
        filter_name.innerText = response['results'][i]['filter_name']; // div 테그 안의 텍스트 지정
        filter_name.setAttribute("onclick", "filter_pick("+filter_pk+")"); // 선택한 div 클릭 시 해당 함수 호출
        filter_info.appendChild(filter_name);
        }
}




// 사용자가 필터 선텍 시 머신러닝 실행시키는 함수 + 머신러닝 실행 버튼 누르면 실행
async function filter_pick(filter_pk) {
    const formData = new FormData();
    
    if (filter_pk) { // 기존 필터 선택 시 -> 필터 pk값 저장
        const filter = filter_pk 
        formData.append("filter", filter)
        console.log("filter는",filter)
    } else { // 사용자가 직적 필터 추가 시 -> 사용자가 추가한 필터 이미지파일 저장
        const user_filter = document.getElementById("user_filter").files[0] 
        formData.append("user_filter", user_filter)
        console.log("user_filter는",user_filter)
    };

    // 사용자가 바꾸고자하는 원본 이미지 저장
    const temp_image = document.getElementById("temp_image").files[0]
    formData.append("temp_image", temp_image)
    console.log("temp_image는",temp_image)
    

    const response = await fetch('http://127.0.0.1:8000/main/image/', {
        // headers:{
        //     "Authorization":"Bearer "+localStorage.getItem("access")
        // },
        method:'POST',
        body: formData
        })
        // Promise 안에 담긴 데이터 꺼내오기
        .then(response => {
            return response.json();
        }).then(data => {
            return data
        });

        var post_image = document.getElementById("post_image"); // 머신러닝 결과 이미지가 담긴 img테그
        post_image.src = server+response; // img 테그 scr 경로 지정
        console.log(post_image.src)

}

// 제목, 내용 작성칸 보여주기
async function submit() {
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    title.style.display = 'block';
    content.style.display = 'block';
}


async function convertURLtoFile(url) {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename, metadata);
}






// 게시글 생성
async function post() {
    // 1. HTML에서 사용자에게 입력받은 제목, 내용, 이미지 가져오기
    const formData = new FormData();
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value 
    // const post_image = convertURLtoFile(document.getElementById("post_image").src) // 기존 작성내용
    
    // test = convertURLtoFile(document.getElementById("post_image").src)
    // test.then(data => formData.append("post_image", data))


    url = document.getElementById("post_image").src
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    const result = new File([data], filename, metadata);

    

    console.log(result)
    console.log(title)
    console.log(content)
    // console.log(post_image)

    

    formData.append("title", title)
    formData.append("content", content)
    formData.append("post_image", result)


    const response2 = await fetch('http://127.0.0.1:8000/post/', {
        headers:{
            "Authorization":"Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY5MzI2NjgxLCJpYXQiOjE2NjkzMDg2ODEsImp0aSI6ImY0N2Q2NWZiYzYwOTRhYmM5MjM2ODUyOTE4ODJkZGJmIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.8Aa-G3dcF2iZua5gF9GVsUlBE5kMPLeFlxtpkQvrY0Y"
        },
        // headers:{
        //     "Authorization":"Bearer "+localStorage.getItem("access")
        // },
        method:'POST',
        body: formData
        });
    
};


