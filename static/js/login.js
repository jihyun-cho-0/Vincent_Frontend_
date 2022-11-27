
//signIn//
// 입력 없으면 표시 현재 구현 안됨
window.onload = () => {
    console.log("load")
}

window.addEventListener('load', () => {
    const forms = document.getElementsByClassName('validation-form');

    Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
}, false);


async function handleSignIn() {
    console.log("로그인함수 시작")
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
        // const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    });

    const response_json = await response.json();

    console.log(response_json);

    localStorage.setItem("access", response_json.access); //로컬스토리지에 access 토큰 저장
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1]; // access토큰의 두번째 요소인 Payload 정보만 취함
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload); // Payload를 로컬스토리지에 저장

    window.location.href="http://127.0.0.1:5500/main.html"

};



async function handleMock() {
    // const response = await fetch('http://127.0.0.1:8000/users/mock/', {
    const response = await fetch('http://127.0.0.1:8000/users/mock/', {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
}

async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}

async function go_Signup() {
    move_page('signlog.html');
}

function move_page(page) {
    window.location.href = page
}

async function handleSocial() {
    const clientID = process.env.SOCIAL_AUTH_GITHUB_CLIENT_ID
    const clientSecret = process.env.SOCIAL_AUTH_GITHUB_SECRET
     
    const app = express()
     
    app.get('/callback', (req, res) => {
      //'/callback': 인증 정보를 바탕으로 access token을 받아올 수 있도록 도와주는 라우터이다.
      const requestToken = req.query.code //이 req.query.code가 위의 'code=[Authorization Code]' 에 해당한다.
      axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
          accept: 'application/json',
        },
      }).then((response) => {
        const accessToken = response.data.access_token //Github가 access_token을 응답으로 줄 것이다. 
        res.redirect(`/welcome.html?access_token=${accessToken}`) //그리고 이렇게 accessToken을 받은 사용자에 한해서만 welcome 페이지로 리다이렉트 된다. 
        //그리고 welcome 페이지를 구성하는 client에서 get fetch를 통해 token및 데이터를 받아오게 된다.
      }).catch((err) => {
          console.error(err)
      })
    })

    fetch('//api.github.com/user', {
    headers: {
      // 이와 같이 Authorization 헤더에 `token ${token}`과 같이
      // 인증 코드를 전송하는 형태를 가리켜 Bearer Token 인증이라고 한다.
      Authorization: 'token ' + token
    }
  })
    .then(res => res.json())
    .then(res => { 
      // 이 응답에 대한 문서는 GitHub 공식 문서를 참조하세요
      // https://developer.github.com/v3/users/#get-the-authenticated-user
 
      document.body.innerText = `${res.name}님 환영합니다!`
    })



}


//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
//signUp//
// 입력 없으면 표시 
window.onload = () => {
    console.log("load")
}

async function check_value() {
    const forms = document.getElementsByClassName('validation-form');
    Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}
// window.addEventListener('load', () => {
//     const forms = document.getElementsByClassName('validation-form');
//     Array.prototype.filter.call(forms, (form) => {
//         form.addEventListener('submit', function(event) {
//             if (form.checkValidity() === false) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
//             form.classList.add('was-validated');
//         }, false);
//     });
// }, false);

async function handleSignUp() {
    const username = document.getElementById("username2").value
    const password = document.getElementById("password2").value
    const email = document.getElementById("email2").value
        // const response = await fetch('http://127.0.0.1:8000/users/signup/', {
    const response = await fetch('http://127.0.0.1:8000/users/signup/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password,
            "email" : email
        })
    });

}
