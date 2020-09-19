<script>
	export let application;
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="{application.url}">
			{application.displayName}
		</a>
	</div>

	<div id="navbarBasicExample" class="navbar-menu">
		<div class="navbar-start">
			<a href="/temp" class="navbar-item">Documentation</a>

			<div class="navbar-item has-dropdown is-hoverable">
				<a href="/temp" class="navbar-link">More</a>

				<div class="navbar-dropdown">
					<a href="/temp" class="navbar-item">About</a>
					<a href="/temp" class="navbar-item">Jobs</a>
					<a href="/temp" class="navbar-item">Contact</a>
					<hr class="navbar-divider" />
					<a href="/temp" class="navbar-item">Report an issue</a>
				</div>
			</div>
		</div>
	</div>
</nav>
