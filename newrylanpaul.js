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


var skillword_parent = document.querySelector('.SkillsBG');
const numspans = 125;
for (let index = 0; index < numspans; index++) {
    var element = document.createElement("span");
    const randvalue = Math.random();
    element.style = '--i:' + randvalue.toString() + ";";
    element.classList.add("SkillBGPanel");
    skillword_parent.appendChild(element);
};





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
var skillword_spans = document.querySelectorAll('.SkillsWords span');
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
    skillword_spans = [];
    skill_list[skills_index].split("").forEach(element => {
        var esp = document.createElement("span");
        esp.innerHTML = element;
        if (element == " "){
            esp.style = "margin: 1%;"
        }
        skills.appendChild(esp);
        skillword_spans.push(esp);
    });
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
};



