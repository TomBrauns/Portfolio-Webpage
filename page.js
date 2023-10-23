// Attempt to add a Scroll Animation for the Projects by following along the video https://www.youtube.com/watch?v=T33NN_pPeNI&list=WL&index=3&t=124s

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
});

const projectElements = document.querySelectorAll('.project');
projectElements.forEach((el) => observer.observe(el));