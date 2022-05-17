const form = document.querySelector('form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const data = {
    email,
    password,
  };

  console.log(data);

  const submitTodoItem = await sigin(data);
});

const sigin = async (data) => {
    try {
      const response = await axios.post(`http://localhost:5000/auth/signin`, data, { headers: {'Content-Type': 'application/json'}, withCredentials: true, 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'});
      const newResponseItem = response.data;

      console.log(response.headers);
      
      if(response.status == 200){
        window.location.href = 'http://127.0.0.1:5500/frontend/pages/dashboard.html'
      }
  
      return newResponseItem;
    } catch (errors) {
      console.log(errors);
    }
  };