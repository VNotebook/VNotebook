<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>VNoteBook</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<asset:stylesheet src="navBar.css"/>
		<asset:stylesheet src="libraryButtons.css"/>
		<asset:stylesheet src="notebookTemplate.css"/>
		<script src="js/angular.min.js"></script>
		<script src="js/angular-route.min.js"></script>
		<asset:javascript src="index.js"/>
		<asset:javascript src="libraries.js"/>
		<asset:javascript src="notebooks.js"/>
		<asset:javascript src="notebook.js"/>
	</head>
	<body data-ng-app="VNoteBookApp">
		<div data-ng-controller="HeaderController">
			<nav class="navbar navbar-default" role="navigation">
				<div class="container">
					<div class="navbar-header">
							<a class="navbar-brand" href="#/"> <span style="glyphicon glyphicon-th-list"></span> VNoteBook</a>
					</div>
					<ul class="nav navbar-nav">
						<li data-ng-class="{active: isActive('/bibliotecas')}"><a href="#/bibliotecas">Bibliotecas</a></li>
						<li data-ng-class="{active: isActive('/configuracion')}"><a href="#/configuracion">Configuración</a></li>
					</ul>
				</div>
			</nav>
		</div>

		<div class="container">
			<div data-ng-view></div>
		</div>
	</body>
</html>

