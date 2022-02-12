export const connectToBackend = async () => {
  const res = await fetch("http://localhost:5000/", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res.json();
};

