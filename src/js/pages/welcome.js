import { html } from 'lit-html';
export const welcomePage = ({
	onPlayClick,
	onComputerClick,
	onRulesClick,
	playKey = 'H',
	computerKey = 'C',
	rulesKey = 'I'
}) => html`
<header>
    <h1>Rock, Paper Scissors</h1>
</header>
<nav>
    <ul class="nav">
        <li class="nav__option">
            <a @click=${onPlayClick} href="#">Human</a>
            <span class="nav__key-binding">${playKey}</span>
        </li>
        <li class="nav__option">
            <a @click=${onComputerClick} href="#">Computer</a>
            <span class="nav__key-binding">${computerKey}</span>
        </li>
        <li class="nav__option">
            <a @click=${onRulesClick} href="#">Info</a>
            <span class="nav__key-binding">${rulesKey}</span>
        </li>
    </ul>
</nav>
`;
