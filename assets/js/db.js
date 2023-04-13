async function getData(endpoint) {
  try {
    const response = await fetch(
      `https://64134e33a68505ea732ffd2a.mockapi.io/${endpoint}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function postData(endpoint, data) {
  try {
    const response = await fetch(
      `https://64134e33a68505ea732ffd2a.mockapi.io/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function putData(endpoint, data) {
  try {
    const response = await fetch(
      `https://64134e33a68505ea732ffd2a.mockapi.io/${endpoint}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function deleteData(endpoint) {
  try {
    const response = await fetch(
      `https://64134e33a68505ea732ffd2a.mockapi.io/${endpoint}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
