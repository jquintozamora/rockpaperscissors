import { Player } from './player';
import { PLAYER_TYPES, MOVES } from './constants';

describe('Player', () => {
	describe('constructor', () => {
		it('should have default props', () => {
			const p = new Player();
			expect(p.title).toEqual('Computer');
			expect(p.type).toEqual(PLAYER_TYPES.COMPUTER);
			expect(p.points).toEqual(0);
			expect(p.move).toEqual(null);
		});
		it('should have `Your` as title when human', () => {
			const p = new Player(PLAYER_TYPES.HUMAN);
			expect(p.title).toEqual('Your');
			expect(p.type).toEqual(PLAYER_TYPES.HUMAN);
			expect(p.points).toEqual(0);
			expect(p.move).toEqual(null);
		});
	});

	describe('addPoints', () => {
		it('should add points', () => {
			const p = new Player();
			p.addPoint();
			expect(p.points).toEqual(1);
			p.addPoint();
			expect(p.points).toEqual(2);
		});
	});

	describe('getPoints', () => {
		it('should get points', () => {
			const p = new Player();
			p.addPoint();
			expect(p.getPoints()).toEqual(p.points);
		});
	});

	describe('isWinner', () => {
		it('should return true if have MAX_POINTS', () => {
			const p = new Player();
			p.addPoint();
			p.addPoint();
			p.addPoint();
			expect(p.isWinner()).toEqual(true);
		});
		it('should return false if still does not have MAX_POINTS', () => {
			const p = new Player();
			p.addPoint();
			p.addPoint();
			expect(p.isWinner()).toEqual(false);
		});
	});

	describe('setMove', () => {
		it('should set this.move if human', () => {
			const p = new Player(PLAYER_TYPES.HUMAN);
			p.setMove(MOVES.ROCK);
			expect(p.move).toEqual(MOVES.ROCK);
		});
		it('should set random move if computer', () => {
			const p = new Player(PLAYER_TYPES.COMPUTER);
			p.setMove();
			expect(Object.keys(MOVES)).toContain(p.move);
		});
	});

	describe('getMove', () => {
		it('should get move', () => {
			const p = new Player(PLAYER_TYPES.HUMAN);
			p.setMove(MOVES.ROCK);
			expect(p.getMove()).toEqual(MOVES.ROCK);
		});
	});

	describe('resetMove', () => {
		it('should reset move', () => {
			const p = new Player(PLAYER_TYPES.HUMAN);
			p.setMove(MOVES.ROCK);
			p.resetMove();
			expect(p.getMove()).toEqual(null);
		});
	});

});
