import { Game } from './game';
import { PLAYER_TYPES, MOVES } from './constants';
import { render } from 'lit-html';
jest.mock('lit-html', () => ({
	render: jest.fn(),
	html: jest.fn()
}));

describe.only('Game', () => {
	const home = () => ({
		restart: () => 'restart'
	});
	beforeEach(() => {
		render.mockClear();
	});
	describe('constructor', () => {
		it('should have props', () => {
			const g = new Game(true, home);
			expect(g.player1.type).toEqual(PLAYER_TYPES.HUMAN);
			expect(g.player2.type).toEqual(PLAYER_TYPES.COMPUTER);
			expect(g.round).toEqual(1);
			expect(g.winner).toEqual(null);
			expect(g.home).toEqual(home);
			expect(render).toHaveBeenCalledTimes(1);
		});
		it('should have two computers', () => {
			const g = new Game(false, home);
			expect(g.player1.type).toEqual(PLAYER_TYPES.COMPUTER);
			expect(g.player2.type).toEqual(PLAYER_TYPES.COMPUTER);
		});
	});

	describe('render', () => {
		it('should call render', () => {
			new Game(true, home);
			expect(render).toHaveBeenCalledTimes(1);
		});
	});

	describe('firstMoveWin', () => {
		const g = new Game(true, home);
		it('should return `false` when m1 is rock and m2 is paper', () => {
			expect(g.firstMoveWin(MOVES.ROCK, MOVES.PAPER)).toEqual(false);
		});
		it('should return `true` when m1 is rock and m2 is scissors', () => {
			expect(g.firstMoveWin(MOVES.ROCK, MOVES.SCISSORS)).toEqual(true);
		});
		it('should return `true` when m1 is paper and m2 is rock', () => {
			expect(g.firstMoveWin(MOVES.PAPER, MOVES.ROCK)).toEqual(true);
		});
		it('should return `false` when m1 is paper and m2 is scissors', () => {
			expect(g.firstMoveWin(MOVES.PAPER, MOVES.SCISSORS)).toEqual(false);
		});
		it('should return `false` when m1 is scissors and m2 is rock', () => {
			expect(g.firstMoveWin(MOVES.SCISSORS, MOVES.ROCK)).toEqual(false);
		});
		it('should return `true` when m1 is scissors and m2 is paper', () => {
			expect(g.firstMoveWin(MOVES.SCISSORS, MOVES.PAPER)).toEqual(true);
		});
		it('should return `false` when m1 and me are other values', () => {
			expect(g.firstMoveWin("", "")).toEqual(false);
		});
	});

	describe('checkWinner', () => {
		it('should return null is still no winner', () => {
			const g = new Game(true, home);
			expect(g.checkWinner()).toEqual(null);
		});
		it('should add point to player1 if win', () => {
			const g = new Game(true, home);
			g.player1.move = MOVES.PAPER;
			g.player2.move = MOVES.ROCK;
			g.checkWinner();
			expect(g.player1.getPoints()).toEqual(1);
		});
		it('should add point to player2 if win', () => {
			const g = new Game(true, home);
			g.player2.move = MOVES.PAPER;
			g.player1.move = MOVES.ROCK;
			g.checkWinner();
			expect(g.player2.getPoints()).toEqual(1);
		});
		it('should return player1 if winner', () => {
			const g = new Game(true, home);
			g.player1.points = 2;
			g.player1.move = MOVES.PAPER;
			g.player2.move = MOVES.ROCK;
			const value = g.checkWinner();
			expect(g.player1.getPoints()).toEqual(3);
			expect(value).toEqual(g.player1);
		});
		it('should return player2 if winner', () => {
			const g = new Game(true, home);
			g.player2.points = 2;
			g.player2.move = MOVES.PAPER;
			g.player1.move = MOVES.ROCK;
			const value = g.checkWinner();
			expect(g.player2.getPoints()).toEqual(3);
			expect(value).toEqual(g.player2);
		});
	});
});
