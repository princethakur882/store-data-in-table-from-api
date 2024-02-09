let currentPage = 1;
let itemsPerPage = 10;
let data = [];
let currentSortProperty = null;
let isSortAscending = true;

function fetchPage(page) {
    fetch("https://dummyjson.com/products?limit=100")
        .then((response) => {
            return response.json();
        })
        .then((objectData) => {
            data = objectData.products;
            displayTable(page);
        });
}
function displayTable(page) {
    let tabledata = "";
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let slicedData = data.slice(start, end);

    slicedData.map((values) => {
        tabledata += `<tr>
            <td>${values.id}</td>
            <td>${values.brand}</td>
            <td>${values.title}</td>
            <td>${values.description}</td>
            <td>${values.price}</td>
            <td>${values.category}</td>
        </tr>`;
    });

    document.getElementById('tablebody').innerHTML = tabledata;
}

function sortData(property) {
    if (currentSortProperty === property) {
        isSortAscending = !isSortAscending;
    } else {
        isSortAscending = true;
        currentSortProperty = property;
    }
    slicedData.sort((a, b) => {
        const valueA = a[property].brand;
        const valueB = b[property].brand;

        if (valueA < valueB) {
            return isSortAscending ? -1 : 1;
        }
        if (valueA > valueB) {
            return isSortAscending ? 1 : -1;
        }
        return 0;
    });
    displayTable(currentPage);
}

document.querySelector(".sort").addEventListener('click', function () {

    let property = this.dataset.property;

    document.querySelectorAll('.sort').forEach((header) => {
        if (header !== this) {
            header.classList.remove('ascending', 'descending');
        }
    });

    this.classList.toggle(isSortAscending ? 'ascending' : 'descending');
    sortData(property);
});

function filterData(searchTerm) {
    return data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

document.getElementById('searchButton').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchBar').value;
    let filteredData = filterData(searchTerm);
    data = filteredData;
    displayTable(currentPage);
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < 10) {
        currentPage++;
        displayTable(currentPage);
    }
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayTable(currentPage);
    }
});

fetchPage(currentPage);
