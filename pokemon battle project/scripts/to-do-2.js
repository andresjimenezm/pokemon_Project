let team1 = {
	name: 'Team 1',
	members: [],
	starter: false,
};
let team2 = {
	name: 'Team 2',
	members: [],
	starter: false,
};

const UIclass = UI();
Object. freeze(UIclass);

const resetTeams = () => {
	selects.forEach(select => ((select.disabled = false), (select.value = '0')));

	[team1, team2].forEach(team => (team.starter = false));

UIclass.restart();
};

const selectWinner = winner => {
	UIclass.showMessage(`${winner} won`, '', 'final');
	UIclass.showRestart();
};

const renderWinner = (winner, loser) => {
	UIclass.showMessage(`${winner} defeated ${loser}`, 'result');
};

const setMessage = (offense, offenseTeam, defense) => {
	UIclass.showMessage(
	`${offense.name} attacks with ${offense.powerAttack} power to ${defense.name}`,
	'subtitle',
	offenseTeam
	);
};

const startBattles = () => {
	const fight = Fight(team1, team2); 
	const [team1Organized, team2Organized] = fight.organizeTeams();

	team1Organized.members.forEach((member, position) => {
		const opponent = team2Organized.members[position];
		fight.currentFight(position);

		while (true) {
			if (!fight.areStillFighting()) {
				break;
			}

			fight.f1vsf2(team1Organized.name);
			setMessage(member, team1Organized.name, opponent);

			if (!fight.areStillFighting()) {
				break;
			}

			fight.f1vsf2(team2Organized.name);
			setMessage(opponent, team2Organized.name, member);

			if (!fight.areStillFighting()) {
				break;
			}
		}

		renderWinner(
		member.isAlive() ? member.name : opponent.name,
		member.isAlive() ? opponent.name : member.name
		);
	});

	selectWinner(fight.selectWinner());
};

const startFight = () => { 
	const isReady = validateTeams(); 

	if (!isReady) {
		return;	
	}

team1.members = team1.members.map(pokemon => Pokemon(pokemon));
team2.members = team2.members.map(pokemon => Pokemon(pokemon));

const selectStarter = Math.round(Math.random());
const starter = [team1, team2].filter(
(_, index) => index === selectStarter
)[0].name;
[team1, team2][selectStarter].starter = true;

UIclass.clearContainer();
UIclass.showMessage(`${starter} will start the Fight!`, 'title');

startBattles();
}