// Attempt to add a Scroll Animation for the Projects by following along the video https://www.youtube.com/watch?v=T33NN_pPeNI&list=WL&index=3&t=124s

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, { threshold: 0.2 });

const projectElements = document.querySelectorAll('.project');
projectElements.forEach((el) => observer.observe(el));

// Set the defaults of the booleans
let alphabeticalOrderAsc = true;
let dateOrderAsc = true;

function toggleAlphabeticalSort(type) {
    alphabeticalOrderAsc = !alphabeticalOrderAsc; // Toggle the sorting order

    var buttonText = alphabeticalOrderAsc ? 'Alphabetisch Sortieren (A-Z)' : 'Alphabetisch Sortieren (Z-A)';
    document.querySelector('#alphabeticalSortButton').innerText = buttonText;

    sortProjects('alphabetical', alphabeticalOrderAsc ? 'desc' : 'asc');
}

function toggleDateSort() {
    dateOrderAsc = !dateOrderAsc; // Toggle the sorting order

    var buttonText = dateOrderAsc ? 'Älteste Projekte' : 'Aktuellste Projekte';
    document.querySelector('#dateSortButton').innerText = buttonText;

    sortProjects('latest', dateOrderAsc ? 'asc' : 'desc');
}


function sortProjects(type, order) {
    var projectsContainer = document.getElementById('projectContainer');
    var projects = Array.from(document.querySelectorAll('.project'));

    projects.sort(function (firstValue, secondValue) {
        var firstValue, secondValue;

        if (type === 'alphabetical') {
            firstValue = firstValue.querySelector('h3').innerText.toLowerCase();
            secondValue = secondValue.querySelector('h3').innerText.toLowerCase();
        } else if (type === 'latest') {
            firstValue = new Date(firstValue.dataset.access);
            secondValue = new Date(secondValue.dataset.access);
            console.log("firstValue:", firstValue);
            console.log("secondValue:", secondValue);
        }

        if (order === 'asc') {
            return firstValue > secondValue ? 1 : firstValue < secondValue ? -1 : 0;
        } else if (order === 'desc') {
            return firstValue < secondValue ? 1 : firstValue > secondValue ? -1 : 0;
        }
    });

    // Clear existing projects and append the sorted projects
    projectsContainer.innerHTML = '';
    projects.forEach(function (project) {
        projectsContainer.appendChild(project);
    });
}