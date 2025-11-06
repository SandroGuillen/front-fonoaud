async function onEndGame(data) {
  const response = await request.put("/scores", data);
  return response.status;
}
async function addScore(data) {
  const response = await request.post("/scores", data);
  return response;
}
