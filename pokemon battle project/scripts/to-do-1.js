function Pokemon(name){
    let pokemon = Object.create({});
    pokemon.name = name;
    pokemon.health = 100;
    pokemon.powerAttack = Math.ceil(Math.random() * 50 + 25);
    pokemon.powerDefense = Math.ceil(Math.random() * 50 + 25);
    pokemon.attack = function () {
        return pokemon.powerAttack;
    };
    pokemon.isAlive = function () {
        return pokemon.health > 0
    };
    pokemon.receiveDamage = function (damage) {
        pokemon.health -= damage;
    };

return pokemon;
}

function Fight(team1, team2) {
    let fight = Object.create({});
    fight.team1 = team1;
    fight.team2 = team2; 
    fight.organizeTeams = function () {
        return [fight.team1, fight.team2].sort((a, b) => b.starter - a.starter);
    };
    fight.currentFight = function (position) {
        fight.numberFight = position;
    };
    fight.f1vsf2 = function (teamName) {
        const attacker = [fight.team1, fight.team2].filter(
            team => team.name === teamName
        )[0];

        const defender = [fight.team1, fight.team2].filter(
        team => team.name !== teamName
        )[0];

        defender.members[fight.numberFight].receiveDamage(
            attacker.members[fight.numberFight].attack()
        );
    };
    fight.areStillFighting = function () {
    return 
        (fight.team1.members[fight.numberFight].isAlive &&
        fight.team2.members[fight.numberFight].isAlive);
        
    };
    fight.selectWinner = function () {
        const team1Alive = fight.team1.members.filter(member => member.isAlive);
        const team2Alive = fight.team2.members.filter(member => member.isAlive);
        
        return team1Alive.length > team2Alive.length
            ? fight.team1.name
            : fight.team2.name;

    };
    return fight;
}

function UI() {
    let ui = new Object({});
        ui.container = document.querySelector('#body');
        ui.clearContainer = function () {
        [...ui.container.children].forEach(child => {
        ui.container.removeChild(child);
        });
    };
    ui.createElement = function (type, classes) {
        const element = document.createElement(type);
        element.className = classes;

        return element;
    };
    ui.showMessage = function (message, variant, team) {
        const pClasses = {
            title: 'text-lg font-semibold text-pokemon-blue mb-3',
            subtitle: 'text-base font-normal text-pokemon-blue mb-3 w-full',
            'Team 1': 'text-left', 
            'Team 2': 'text-right', 
            result: 'text-lg font-semibold text-pokemon-red mt-5 mb-5 text-center',
            final: 'text-4x1 font-bold text-pokemon-yellow mt-5 mb-10',
        };

        const p=ui.createElement('p',`${pClasses[variant]} ${pClasses[team]}`);
        
        p.innerText=message;
        
        ui.container.appendChild(p);
    };
    ui.showRestart = function () {
        const button = ui.createElement(
            'button',
            'hover:bg-pokemon-blue text-pokemon-blue hover:text-white inline px-5 py-3 rounded-lg',
        );
        button.innerText = 'Restart battle';
        button.onclick = resetTeams;

        ui.container.appendChild(button);
    };
    ui.restart = function () {
        ui.clearContainer();

        document
            .querySelectorAll('img')
            .forEach(tag => (tag.src = './assets/pokeball.jpeg'));

        const button = ui.createElement(
            'button',
            'hover:bg-pokemon-blue text-pokemon-blue hover:text-white inline px-5 py-3 rounded-lg',
        );
        button.innerText = 'Start Fight';
        button.onclick = startFight;

        ui.container.appendChild(button);
    };

    return ui;

};