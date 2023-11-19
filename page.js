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

    projects.sort(function (firstProject, secondProject) {
        var firstValue, secondValue;

        if (type === 'alphabetical') {
            firstValue = firstProject.querySelector('h3').innerText.toLowerCase();
            secondValue = secondProject.querySelector('h3').innerText.toLowerCase();
        } else if (type === 'latest') {
            var firstDateText = getLastModificationText(firstProject);
            var secondDateText = getLastModificationText(secondProject);

            var firstDate = parseDate(firstDateText);
            var secondDate = parseDate(secondDateText);

            console.log("First date: ", firstDate);
            console.log("Second date: ", secondDate);

            firstValue = firstDate;
            secondValue = secondDate;
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

function getLastModificationText(project) {
    var paragraphs = project.querySelectorAll('.project p');
    var lastModificationText = '';

    for (var i = 0; i < paragraphs.length; i++) {
        var paragraphText = paragraphs[i].innerText.trim();
        if (paragraphText.startsWith('Letzte Änderung:')) {
            lastModificationText = paragraphText.replace('Letzte Änderung: ', '');
            break;
        }
    }

    return lastModificationText;
}



function parseDate(dateText) {

    console.log("Input date text: ", dateText);

    var dateParts = dateText.split('.');

    if (dateParts.length !== 3) {
        console.log("Invalid date format");
        return null; // or any other value that indicates no date
    }

    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript Date objects
    var year = parseInt(dateParts[2], 10);
    
    return new Date(year, month, day);
}
