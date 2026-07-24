let dates = []; let mins = []; let maxs = [];
function ppp() {
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], //lables
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3], //info
        borderWidth: 1,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'yellow',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
     plugin: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart'
        }
    }
  });
}
document.getElementById('data').innerText = data;
    // Parse it with Papa Parse (connection on the html page) 
    const results = Papa.parse(data, {
      header: true,          // Use first row as column headers
      skipEmptyLines: true,  // Ignore blank rows
    });
    
    // The parsed data is an array of objects
    const records = results.data;
 
    // Loop through records
    records.forEach(row => {
      console.log(`Date: ${row.date}, Min: ${row.min}, Max: ${row.max}`);
      
      dates.push(row.date);
      mins.push(parseInt(row.min));
      maxs.push(parseInt(row.max));
      
    });

  let date;
  async function fetchUserData() {
    try {
        const response = await fetch("temp.csv");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text(); //parsed
       
        console.log(data); //logs the entire csv file as text
 
        document.getElementById('data').innerText = data; //displays the csv file in the html element with id 'data'
    
 
 
    } catch (error) {
        document.getElementById("output").innerText = "Error fetching data!";
        console.error("Error:", error);
    }
  }
fetchUserData();
