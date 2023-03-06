console.log("Page is running")
// showNotes()

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


// Function for delete api 





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
  // console.log(resp)
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
    // console.log(element.id)

    tableRow += `
    <tr>
    <td id="${index + 1}">${index + 1}</td>
    <td id="elemTitle">${element.title}</td>
    <td id="elemNote">${element.note}</td>
    <td><button onclick="deleteNote(this.id)" id="${element.title}" class="btn btn-outline-dark" >Delete</button></td>
  </tr>
    `

    /*
    Task to delete button
    1. Delete function for onclick attribute
    2. Fetching title parameter for function 
    3. 
    */
    deleteNote = async (title) => {
      console.log("Deleting....",title)
      data = {
        "title": title
      }
      let deleteResp = await postData("/deleteNote", data)
      // console.log(deleteResp)
      showNotes()
    }
  });
  let tableData = document.getElementById("tableData")
  tableData.innerHTML = tableRow
}

// Delete element 



showNotes();