
filter_list_2()





// 모든 필타 목록 출력
async function filter_list_2() {
    console.log("연33333333333s")
    // 해당 url로 요청보내고 응답데이터 받기 : fetch
    const response = await fetch('http://127.0.0.1:8000/filter/?sort=modal', {
        method:'GET'
    }).then(response => {return response.json()})
    // Promise 안에 담긴 데이터 꺼내오기
    console.log(response)
   
  
    var posts = document.getElementById("table"); // 부모 div
    console.log("posts는",posts)
  
    for (i = 0; i < response['results'].length; i++) {
  
      const image = response['results'][i]['filter_image'];
      console.log(image)
  
      const new_image = `<div class='table_item'>
            <img src='${image}'>
            </div>`;
      console.log(new_image)
      posts.insertAdjacentHTML("beforeend",new_image)
     
    }
}