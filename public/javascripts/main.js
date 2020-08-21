
const departs = document.querySelectorAll('.departs');

departs.forEach((date) => {
    if (new Date(date.innerHTML) < new Date()) {date.classList.add('red');}
})
