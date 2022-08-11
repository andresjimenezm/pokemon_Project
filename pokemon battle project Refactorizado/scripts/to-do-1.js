class Pokemon {
    constructor(name) {
        this.name = name[0].toUpperCase() + name.slice(1);
        this.powerAttack = this.#setPowerAttack();
        this.powerDefense = this.#setPowerDefense();
        this.health = 100;
        }

        #setPowerAttack() {
        return Math.ceil(Math.random() * 50 + 25);
        }

        #setPowerDefense() {
        return Math.ceil(Math.random() * 50 + 25);
        }

        attack() {
        return this.powerAttack;
        }

        get isAlive() {
        return this.health > 0;
        }

        receiveDamage (damage) {
        this.health -= damage;
        }
    }

class Fight {
    constructor(team1, team2) {
        this.team1 = team1;
        this.team2 = team2;
        }

    organizeTeams() {
    return [this.team1, this.team2].sort((a, b) => b.starter - a.starter);
    }

    flvsf2(teamName) {
        const attacker = [this.team1, this.team2].filter(
        team => team.name === teamName
        )[0];

        const defender = [this.team1, this.team2].filter(
            team => team.name !== teamName
        )[0];

        defender.members[this.numberFight].receiveDamage(
        attacker.members[this.numberFight].attack()
        );
    }

    set currentFight(position) {
        this.numberFight = position;
    }

    get areStillFighting() {
        return (
            this.team1.members[this.numberFight].isAlive &&
            this.team2.members[this.numberFight].isAlive
        );
    }

   get selectWinner(){
        const team1Alive = this.team1.members.filter(member => member.isAlive()); 
        const team2Alive = this.team2.members.filter(member => member.isAlive());
        return team1Alive.length>team2Alive.length? this.team1.name:this.team2.name;
    };
}

class UI {
    constructor() {
        this.container = document.querySelector('#body');
    }

    clearContainer() {
        [...this.container.children].forEach(child => {
            this.container.removeChild(child);
        });
    }

    showMessage(message, variant, team) {
        const pClasses = {
            title: 'text-lg font-semibold text-pokemon-blue mb-3',
            subtitle: 'text-base font-normal text-pokemon-blue mb-3 w-full',
            'Team 1': 'text-left', 
            'Team 2': 'text-right', 
            result: 'text-lg font-semibold text-pokemon-red mt-5 mb-5 text-center',
            final: 'text-4x1 font-bold text-pokemon-yellow mt-5 mb-10',
        };

        const p = this.createElement('p',`${pClasses[variant]} ${pClasses[team]}`);
        
        p.innerText=message;
        
        this.container.appendChild(p);
    }

    createElement(type, classes) {
        const element = document.createElement(type);
        element.className = classes;
        
        return element;
    }

    showRestart() {
        const button = this.createElement(
            'button',
            'hover:bg-pokemon-blue text-pokemon-blue hover:text-white inline px-5 py-3 rounded-lg',
        );

        button.innerText = 'Restart battle';
        button.onclick = resetTeams;

        this.container.appendChild(button);
    }

    restart = function () {
        this.clearContainer();

        document
            .querySelectorAll('img')
            .forEach(tag => (tag.src = './assets/pokeball.jpeg'));

        const button = this.createElement(
            'button',
            'hover:bg-pokemon-blue text-pokemon-blue hover:text-white inline px-5 py-3 rounded-lg',
        );
        button.innerText = 'Start Fight';
        button.onclick = startFight;

        this.container.appendChild(button);
    };
};
