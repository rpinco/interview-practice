export default function handler(req, res) {
  const { query, body, method } = req;

  console.log(body);
  const parsedBody = JSON.parse(body);
  
  if(parsedBody.username === 'test@test.com') {
    res.status(401).json('Username already exists');
  } else {
    res.status(200).json('success!')
  }
}