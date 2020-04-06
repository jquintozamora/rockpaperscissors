import { render } from 'lit-html';
import { playPage } from './pages/play';
import { PLAYER_TYPES, MOVES, WAIT_TIME_SEC } from './constants';
import { Player } from './player';

export class Game {
	constructor(isHuman, home) {
		this.player1 = new Player(isHuman ? PLAYER_TYPES.HUMAN : PLAYER_TYPES.COMPUTER);
		this.player2 = new Player(PLAYER_TYPES.COMPUTER);
		this.round = 0;
		this.winner = null;
		this.home = home;
		this.isHuman = isHuman;
		this.timer = null;

		this.playRound();
	}

	render() {
		render(
			playPage({
				player1: this.player1,
				player2: this.player2,
				winner: this.winner,
				onPickClick: (move) => () => this.userSetMove(move),
				round: this.round,
				onResetGameClick: this.resetGameHandler
			}),
			document.body
		);
	}

	resetGameHandler() {
		clearTimeout(this.timer);
		this.home.restart();
	}

	firstMoveWin(m1, m2) {
		switch (true) {
			case m1 === MOVES.ROCK && m2 === MOVES.PAPER:
				return false;
			case m1 === MOVES.ROCK && m2 === MOVES.SCISSORS:
				return true;
			case m1 === MOVES.PAPER && m2 === MOVES.ROCK:
				return true;
			case m1 === MOVES.PAPER && m2 === MOVES.SCISSORS:
				return false;
			case m1 === MOVES.SCISSORS && m2 === MOVES.ROCK:
				return false;
			case m1 === MOVES.SCISSORS && m2 === MOVES.PAPER:
				return true;
			default:
				return false;
		}
	}

	checkWinner() {
		const m1 = this.player1.getMove();
		const m2 = this.player2.getMove();

		if (m1 === m2) return null;

		if (this.firstMoveWin(m1, m2)) {
			this.player1.addPoint();
			return this.player1.getPoints() === 3 ? this.player1 : null;
		}

		if (this.firstMoveWin(m2, m1)) {
			this.player2.addPoint();
			return this.player2.getPoints() === 3 ? this.player2 : null;
		}

		return null;
	}

	userSetMove(move) {
		this.player1.setMove(move);
		this.checkResults();
	}

	checkResults() {
		const winner = this.checkWinner();
		if (winner) {
			this.render();
			this.winner = winner;
			this.timer = setTimeout(() => this.render(), WAIT_TIME_SEC);
		} else {
			this.render();
			this.timer = setTimeout(() => this.playRound(), WAIT_TIME_SEC);
		}
	}

	playRound() {
		this.round++;
		this.player1.resetMove();
		this.player2.resetMove();
		this.render();

		if (this.isHuman) {
			this.player2.setMove();
		} else {
			this.timer = setTimeout(() => {
				this.player2.setMove();
				this.player1.setMove();
				this.checkResults();
			}, WAIT_TIME_SEC);
		}
	}
}
