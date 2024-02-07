let currentPage = 1;
let itemsPerPage = 10;
let data = [];

function fetchPage(page) {
    fetch("https://dummyjson.com/products")
    .then((response) => {
        return response.json();
    })
    .then((objectData) => {
        data = objectData.products;
        console.log(objectData);
        let tabledata = "";
        let start = (page - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        data.slice(start, end).map((values) => {
            tabledata += `<tr>
            <td>${values.id}</td>
            <td>${values.title}</td>
            <td>${values.brand}</td>
            <td>${values.description}</td>
            <td>${values.price}</td>
            <td>${values.category}</td>
            </tr>`;
        });
        document.getElementById('tablebody').innerHTML = tabledata;
    })
}

function displayData(filteredData) {
    let tabledata = "";
    filteredData.map((values) => {
        tabledata += `<tr>
            <td>${values.id}</td>
            <td>${values.title}</td>
            <td>${values.brand}</td>
            <td>${values.description}</td>
            <td>${values.price}</td>
            <td>${values.category}</td>
        </tr>`;
    });
    document.getElementById('tablebody').innerHTML = tabledata;
}

fetchPage(currentPage);

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < 3) {
        currentPage++;
        fetchPage(currentPage);
    }
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchPage(currentPage);
    }
});

// Function to sort data by a given property
function sortData(property, ascending) {
    data.sort(function(a, b) {
        if (ascending) {
            return a[property] > b[property] ? 1 : -1;
        } else {
            return a[property] < b[property] ? 1 : -1;
        }
    });
}



document.querySelector(".sort").addEventListener('click', function() {
        let ascending = this.classList.contains('ascending');
        sortData(property, ascending);
        // Remove 'ascending' class from all other headers
        document.querySelector('.sort').forEach((header) => {
            if (header !== this) {
                header.classList.remove('ascending');
            }
        });
        this.classList.toggle('ascending');
        fetchPage(currentPage);
    });


function filterData(searchTerm) {
    let filteredData = data.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredData;
}

document.getElementById('searchButton').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchBar').value; 
    let filteredData = filterData(searchTerm);
    displayData(filteredData); 
});


