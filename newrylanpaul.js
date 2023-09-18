const spans = document.querySelectorAll('.RylanPaul span');

spans.forEach((span, idx) => {
    span.addEventListener('mouseover', (e) => {
        e.target.classList.add('active');
    });
    span.addEventListener('animationend', (e) => {
        e.target.classList.remove('active');
        e.target.classList.remove('start');
    });

    setTimeout(() => {
		span.classList.add('start');
	}, 0 * (idx))
});
const skills_spans = document.querySelectorAll('.SkillsText span');

skills_spans.forEach((span, idx) => {
    span.addEventListener('mouseover', (e) => {
        e.target.classList.add('active');
    });
    span.addEventListener('animationend', (e) => {
        e.target.classList.remove('active');
        e.target.classList.remove('start');
    });

    setTimeout(() => {
		span.classList.add('start');
	}, 0 * (idx))
});

var skills = document.querySelector('.SkillsWords');
const skill_list = ["Swift in Xcode", "Firebase by Google", "Fusion 360", "Python", "C# with Unity", "Microsoft Office", "Google Workspace", "HTML, CSS, JS", "3D Priting", "Raspberry Pi", "Ardiuno"];
var skills_index = 0;
DisplayWords()
setInterval(DisplayWords, 4000);

function DisplayWords(){
    
    skills_index += 1;
    if (skills_index >= skill_list.length){
        skills_index = 0;
    }
    while (skills.firstChild) {
        skills.removeChild(skills.firstChild);
    }
    skill_list[skills_index].split("").forEach(element => {
        var esp = document.createElement("span");
        esp.innerHTML = element;
        if (element == " "){
            esp.style = "margin: 1%;"
        }
        skills.appendChild(esp);
    });
    const skillword_spans = document.querySelectorAll('.SkillsWords span');

    skillword_spans.forEach((span, idx) => {
        span.addEventListener('mouseover', (e) => {
            e.target.classList.add('active');
        });
        span.addEventListener('animationend', (e) => {
            e.target.classList.remove('active');
            e.target.classList.remove('start');
        });
        span.classList.add('start');
    });
}