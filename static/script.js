console.log("Page is running")

// Creating a function to get request
const getRequest = async (url) => {

  // Fetching data by url
  const response = await fetch(url);

  // Converting data to json
  const data = await response.json();

  // Returning data
  return data
}

// Creating note and post to database
// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postBtn.addEventListener('click', async () => {
  console.log("Event is clicked")
  let title = document.getElementById("title")
  let note = document.getElementById("note")
  console.log(title.value, note.value)
  let noteData = {
    'title': title.value,
    'note': note.value
  }
  title.value = "";
  note.value = "";
  let resp = await postData('/postNote', noteData)
  console.log(resp)
  showNotes();
})

// Getting saved notes from database
showNotes = async () => {
  let notes = []
  tableRow = "";
  let resp = await getRequest('/getNotes').then(data => {
    // console.log(data)
    notes.push(data)

  });
  // console.log(notes[0][0].title)
  notes[0].forEach((element, index) => {
    // console.log(element.title)

    tableRow += `
    <tr>
    <th>${index+1}</th>
    <td>${element.title}</td>
    <td>${element.note}</td>
  </tr>
    `
  });
  let tableData = document.getElementById("tableData")
  tableData.innerHTML = tableRow
}

showNotes();