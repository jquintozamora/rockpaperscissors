import { html } from 'lit-html';
import { PLAYER_TYPES, MOVES } from '../constants';

const createMoves = (moves, onPickClick) => html`
<ul class="board__icons">
    ${moves.map(
		(m) =>
            html`
            <li class="action">
                <i @click=${onPickClick(
                    m
                )} class="action__icon far fa-hand-${m.toLowerCase()}" aria-hidden="true" title="pick rock"></i>
                <span class="action__key-binding">${m[0]}</span>
            </li>`
	)}
</ul>
`;

const createPlayerSection = (player, onPickClick, isWinner, gameFinished) => {
	const movesToCreate = player.move ? [ player.move ] : Object.keys(MOVES);
	const lastP = gameFinished
		? isWinner ? html`<p class="winner">WINNER</p>` : ''
		: player.move ? `${player.title} made pick` : 'Take your pick';
	return html`
        <section class="board__player">
            <header class="board__player-header">
                <h3>${player.title} Score<h3>
                <p>${player.getPoints()} points<p>
            </header>
            ${gameFinished
				? null
				: createMoves(
						movesToCreate,
						player.type === PLAYER_TYPES.HUMAN && player.move === null ? onPickClick : () => {}
					)}
            <p>${lastP}</p>
        </section>
    `;
};

export const playPage = ({ player1, player2, winner, onPickClick, round, onResetGameClick, resetGameKey = 'M' }) => html`
    <header>
        <h1>Rock, Paper Scissors</h1>
    </header>
    <main role="main">
        <h2 class="board__title">Round ${round}</h2>
        <article class="board">
            ${createPlayerSection(player1, onPickClick, winner === player1, winner !== null)}
            ${createPlayerSection(player2, onPickClick, winner === player2, winner !== null)}
        </article>
    </main>
    <ul class="nav">
        <li class="nav__option">
            <a @click=${onResetGameClick} href="#">Restart</a>
            <span class="nav__key-binding">${resetGameKey}</span>
        </li>
    </ul>
`;
