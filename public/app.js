(function(angular) {

	'use strict';
	var app = angular.module('automotrizModule',[
		'ngResource',
		'ngRoute',
		'ngTouch'
	]);

	app.config(['$locationProvider',function($locationProvider) {
		$locationProvider.html5Mode(true);
	}]);

	/*app.config(['$routeProvider',function($routeProvider) {
		$routeProvider.
			when('/',{
				templateUrl: 'public/give/views/main.view.html',
				controller: 'principalCtrl'
			}).
			when('/404',{
				templateUrl: 'public/main/views/404.view.html'
			}).
			otherwise({
				redirectTo: '/404'
			});
	}]);*/

	app.factory('mainService', ['$http','$q', function( $http,$q){
		var self = {
			config:{},
			cargar: function(){
				var d = $q.defer();
				$http.get('configuracion.json')
					.success(function(data){
						self.config = data;
						d.resolve();
					})
					.error(function(){
						d.reject();
						console.error('No se pudo cargar el archivo de configuración');
					});

				return d.promise;
			}

		};
		return self;
	}]);


	app.controller('mainCtrl', ['$scope', 'mainService', function($scope,mainService) {
		$scope.config = {};
		$scope.services = [{
			icono: 'fa fa-4x fa-stethoscope text-primary sr-icons ',
			titulo: 'Mantenimiento preventivo y correctivo',
			descripcion: 'Servicios de diagnostico y reparación con nuestro Mantenimiento Correctivo Automotriz para verificar las operaciones mayores de su vehículo, las cuales requieren de un tiempo mayor en el taller Automotriz \"Guzmán\"'
		},{
			icono: 'fa fa-4x fa-plus-square text-primary sr-icons ',
			titulo: 'Reparación de motores gasolina y diesel',
			descripcion: 'Reparar un motor, ya sea gasolina o diésel, no es tarea sencilla. Por ello, es algo que tendrá que realizarse siempre por un profesional especializado en la materia que cuente con conocimientos más que suficientes para llevar a cabo la reparación del motor.'
		},{
			icono: 'fa fa-4x fa-cogs text-primary sr-icons ',
			titulo: 'Escaneado',
			descripcion: 'Los scanner tienen la función de detectar todas las unidades de control electrónico que se han instalado en el auto y puede leer los códigos de error en caso de que existan algunas fallas en el auto.'
		},{
			icono: 'fa fa-4x fa-wrench text-primary sr-icons ',
			titulo: 'Limpeza de inyectores por ultrasonido',
			descripcion: 'Un limpiador ultrasónico es un dispositivo de limpieza que utiliza los ultrasonidos y una adecuada solución de limpieza para limpiar objetos delicados. Los ultrasonidos no son efectivos sin la solución de limpieza; éstos precisan una solución apropiada para cada objeto y la suciedad a limpiar.'
		}];
		$scope.pedido = [{
			category: 'Motor',
			name: 'Motor a gasolina',
			img: '10.jpg'
		},
		{
			category: 'Motor',
			name: 'Motor a diesel',
			img: '11.jpg'
		},
		{
			category: 'Caja',
			name: 'Caja Mecánica',
			img: '12.jpg'
		},
		{
			category: 'Caja',
			name: 'Caja Manual',
			img: '13.jpg'
		},
		{
			category: 'Cerebro',
			name: 'Cerebro automotriz',
			img: '14.jpg'
		},
		{
			category: 'Sensor',
			name: 'Sensores automotriz',
			img: '15.jpg'
		},
		{
			category: 'Opturador',
			name: 'Cuerpo de aceleración',
			img: '16.png'
		},
		{
			category: 'Opturador',
			name: 'Cuerpo de aceleración',
			img: '17.jpg'
		}];



		mainService.cargar().then( function(){
			$scope.config = mainService.config;
			console.log($scope.config);
		});




		var cities = [
          {
              place : 'T. A. \"Guzmán\"',
              desc : 'Calle Pisagua, entre Ayacucho y Avenida del ejército',
              lat : -17.9713545,
              long : -67.0997153
          },
          {
              place : 'Sucursal',
              desc : 'Por Oficina Visión Mundial Oruro',
              lat : -17.9351808,
              long : -67.1049758
          }
      	];

		var mapOptions = {
		  zoom: 15,
		  center: new google.maps.LatLng(-17.9713545,-67.0997153),
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		$scope.markers = [];

		var infoWindow = new google.maps.InfoWindow();

		var createMarker = function (info){
		  
		  var marker = new google.maps.Marker({
		      map: $scope.map,
		      position: new google.maps.LatLng(info.lat, info.long),
		      title: info.place
		  });
		  marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
		  
		  google.maps.event.addListener(marker, 'click', function(){
		      infoWindow.setContent('<h2>' + marker.title + '</h2>' + 
		        marker.content);
		      infoWindow.open($scope.map, marker);
		  });
		  
		  $scope.markers.push(marker);

		};

		for (var i = 0; i < cities.length; i++){
		  createMarker(cities[i]);
		}

		$scope.openInfoWindow = function(e, selectedMarker){
		  e.preventDefault();
		  google.maps.event.trigger(selectedMarker, 'click');
		};
		console.log($scope.markers);

	}]);

})(window.angular);
