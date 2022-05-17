const form = document.querySelector('form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const name = document.querySelector('#name').value;
  const surname = document.querySelector('#surname').value;
  const phone = document.querySelector('#phone').value;

  const data = {
    name,
    surname,
    phone,
    email,
    password,
  };

  console.log(data);

  await sigup(data);
});

const sigup = async (data) => {
    try {
      const response = await axios.post(`http://localhost:5000/auth/signup`, data, { headers: {'Content-Type': 'application/json'}, withCredentials: true});
      const newResponseItem = response.data;

      console.log(newResponseItem);
      return newResponseItem;
    } catch (errors) {
      console.log(errors);
    }
  };