import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { render } from 'lit-html';
import { welcomePage } from './pages/welcome';
import { Game } from './game';

import '../css/index.scss';

export class Home {
	constructor() {
		this.game = null;
		this.render();
	}

	play = () => {
		this.game = new Game(true, this);
	};

	computerPlay = () => {
		this.game = new Game(false, this);
	};

	openRules() {
		window.open('https://en.wikipedia.org/wiki/Rock_paper_scissors');
	}

	restart() {
		this.game = null;
		this.render();
	}

	render() {
		render(
			welcomePage({ onPlayClick: this.play, onComputerClick: this.computerPlay, onRulesClick: this.openRules }),
			document.body
		);
	}
}
