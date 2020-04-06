import { PLAYER_TYPES, MAX_POINTS, MOVES } from './constants';

export class Player {
	constructor(type, points = 0) {
		this.type = type;
		this.title = type === PLAYER_TYPES.HUMAN ? 'Your' : 'Computer';
		this.points = points;
		this.move = null;
	}

	addPoint() {
		this.points++;
	}

	getPoints() {
		return this.points;
	}

	isWinner() {
		return this.points === MAX_POINTS;
	}

	setMove(move) {
		if (this.type === PLAYER_TYPES.COMPUTER) {
			const random = Math.floor(Math.random() * Object.keys(MOVES).length);
			this.move = Object.keys(MOVES)[random];
		} else {
			this.move = move;
		}
	}

	getMove() {
		return this.move;
	}

	resetMove() {
		this.move = null;
	}
}
