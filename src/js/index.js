import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { Home } from './home';

import '../css/index.scss';
import { MOVES } from './constants';

const h = new Home();

function onKeyDown(event) {
	const KEYS = {
		H: 72,
		C: 67,
        I: 73,
        M: 77,
        R: 82,
        P: 80,
        S: 83
    };
	switch (event.which) {
		case KEYS.H: {
			h.play();
			break;
		}
		case KEYS.C: {
			h.computerPlay();
			break;
		}
		case KEYS.I: {
			h.openRules();
			break;
        }
        case KEYS.M: {
            if (h.game) {
                h.game.resetGameHandler();
            }
            break;
        }
        case KEYS.R: {
            if (h.game) {
                h.game.userSetMove(MOVES.ROCK);
            }
            break;
        }
        case KEYS.P: {
            if (h.game) {
                h.game.userSetMove(MOVES.PAPER);
            }
            break;
        }
        case KEYS.S: {
            if (h.game) {
                h.game.userSetMove(MOVES.SCISSORS);
            }
            break;
        }
	}
	return true;
}
document.onkeydown = onKeyDown;


