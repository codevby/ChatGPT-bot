const url = 'https://open-ai21.p.rapidapi.com/chatgpt';
const options = {
  method: 'POST',
  headers: {
    'x-rapidapi-key': '80ad31d0ffmshfc2a215b4bc65b1p1a263cjsned150dde27a9',
    'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({  // Changed to stringify the body
    messages: [
      {
        role: 'user',
        content: 'hello chat gpt tell me a joke'
      }
    ],
    web_access: false
  })
};

try {
  fetchData();
} catch (error) {
  console.error(error);
}

async function fetchData() {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);
}