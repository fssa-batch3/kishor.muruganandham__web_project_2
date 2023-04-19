async function getData(endpoint) {
  try {
    const response = await fetch(
      `https://library-management-53e19-default-rtdb.firebaseio.com/${endpoint}.json`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function postData(endpoint, data) {
  try {
    const response = await fetch(
      `https://library-management-53e19-default-rtdb.firebaseio.com/${endpoint}.json`,
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
      `https://library-management-53e19-default-rtdb.firebaseio.com/${endpoint}.json`,
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
      `https://library-management-53e19-default-rtdb.firebaseio.com/${endpoint}.json`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
