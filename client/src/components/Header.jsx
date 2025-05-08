import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
				<a href="/" class={url == '/' && 'active'}>
					Home
				</a>
				<a href="/about" class={url == '/about' && 'active'}>
				    About
				</a>
				<a href="/projects" class={url == '/projects' && 'active'}>
					Projects
				</a>
				<a href="/authorization" class={url == '/projects' && 'active'}>
					Authorization
				</a>
				<a href="/404" class={url == '/404' && 'active'}>
					404
				</a>
			</nav>
		</header>
	);
}
