GoogleMap 라이브러리 

create-react-app을 설치 후 



```bash
npm i react-geocode react-google-autocomplete react-google-maps
```



프로젝트를 만든 후 키를 생성한다.

GEO 좌료로 변환해야한다.



react-geocode는 지리 좌표를 사용하여 동일한 작업을 수행하므로  이 모듈을 사용하여 지도 api와 같이 장소 api도 활성화 해야한다. 실제 google 자동 완성 모듈이므로 웹사이트로 돌아가야한다.

구글 클라우드에서 라이브러리에서 maps javascript api를 활성화 하고 활성화가 끝나면 왼쪽에  api를 선택하여 Geocoding API를 선택한다.

![image-20210125201247958](/Users/apple/Library/Application Support/typora-user-images/image-20210125201247958.png)

Geocoding API를 이걸 활성화 한다. 그리고 다시 api를 클릭해서 Olaces API 를 활성화 하자.

이제 활성화 해야하는 모든 API가 있으므로 Google API에서 기능을 사용할 준비가 되었지만 하지만 하나 남은 단계는 사용을 시작하기 전이다. Google Maps Platform API는 Google에서 결제를 활성화하는데 필요한 SDK를 보낸다.

클라우드 프로젝트를 볼수 있다면 이 API에 대한 비용을 지불 하므로  실제로 Google이  좋은 점이 필요하다. 3개월 동안 200달러이다. 

react google maps 문서를 보자.

https://tomchentw.github.io/react-google-maps/#introduction

```js
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
));

<MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
```

이걸 쓰자. App.js 에서 

```js
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

function App() {
	const MapWithAMarker = withScriptjs(
		withGoogleMap((props) => (
			<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
				<Marker position={{ lat: -34.397, lng: 150.644 }} />
			</GoogleMap>
		))
	);

	return (
		<MapWithAMarker
			googleMapURL="https://maps.googleapis.com/maps/api/js?key=....8&v=3.exp&libraries=geometry,drawing,places"
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `400px` }} />}
			mapElement={<div style={{ height: `100%` }} />}
		/>
	);
}

export default App;

```

이렇게 하면 지도에 나올 것이다.  (api키는 내꺼니 지울 것이다.)

![image-20210125202855803](/Users/apple/Library/Application Support/typora-user-images/image-20210125202855803.png)

HOC를 사용한것이다. withGoogleMap 

우리는 애플리케이션 내부의 값을 변경하기 위한 상태가 필요하다.

```js
  state ={
    address: '',
    city: '',
    area: '',
    state: '',
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
  },
    markerPosition: {
      lat: 0,
      lng: 0,
    }
  }
```

그래서 먼저 신청을 해서 테이블이 여기에 있다는 것을 설명한다. 주소가 첫번째이다. 

어디 있는지  그러면 값이 필요하다. 



창 정보창이 있는 것이 무엇인지 보려면 마커 위에 표시할 수 있도록 구성 요소를 가져올 수 있다. InfoWindow를 가져오자.

```js
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

```

그래서 마커를 Marker 컴포넌트에 넣자.

```js
	const MapWithAMarker = withScriptjs(
		withGoogleMap((props) => (
			<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
				<Marker position={{ lat: -34.397, lng: 150.644 }}>
					<InfoWindow>
						<div>hello</div>
					</InfoWindow>
				</Marker>
			</GoogleMap>
		))
```

다음으로 할일은 마커를 드래그 할 수 있도록 하는 것이다.

드래그 하려면 원래 지도에서는 새 주소와 지역을 가져와서 머물 수 있지만 지도 안에는 마이크로를 연출하려는데 당장 만들 수 없다. 

잘못된 위치거나 변경되고 있지만 마커 위치를 변경할 수 없으므로 두개의 속성을 추가해야한다.

Add  draggable && onDragEnd를 추가해야한다.  

```js

	const onMarkerDragEnd = (e) => {
		let newLat = e.latLng.lat();
		let newLng = e.latLng.lng();
		console.log('newLat', newLat);
	};
	const MapWithAMarker = withScriptjs(
		withGoogleMap((props) => (
			<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
				<Marker draggable={true} onDragEnd={onMarkerDragEnd} position={{ lat: -34.397, lng: 150.644 }}>
					<InfoWindow>
						<div>hello</div>
					</InfoWindow>
				</Marker>
			</GoogleMap>
		))
	);

```



![image-20210125210305312](/Users/apple/Library/Application Support/typora-user-images/image-20210125210305312.png)

위도와 경도는 이 능력과 경도 정보를 이용하여 시리즈 이름 주소 이름과 주소 이름과 도시 이름과 지역 이름과 주를 알고 싶다.

도시와 지역을 유지하고 이것을 사용하여 그들을 알기 때문에 우리는 이것을 사용할 것이다.



Geocode를 다운로드 하는 것처럼 그래서 이것을 사용하기 전에 우리는 변환을 하거나 지리적 좌표를 이것을 사용하여 위치에 대한 설명으로  먼저 위도를 사용하여 정보를 얻어야 한다.

```js
import Geocode from 'react-geocode';
```

이걸 얻어오고 지리코드를 api를 설정해야한다.

```js
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyC9pRTw-7zb847DyWLD-fUujKxvlG01s08');
```

그래서 이걸 onMarkDragEnd에 설정하고 

```js
	const onMarkerDragEnd = async (e) => {
		let newLat = e.latLng.lat();
		let newLng = e.latLng.lng();

		const res = await Geocode.fromLatLng(newLat, newLng);
		console.log(res);

		console.log('newLat', newLat);
	};
```





![image-20210125211132358](/Users/apple/Library/Application Support/typora-user-images/image-20210125211132358.png)

results에 address_components 데이터를 받아올 수 있다.

이 위체에 대한 주소를 제공하므로 지역에서 얻은 정보를 사용하여 지역과 주를 채울 수 있도록 모두 주에 넣을 것이다. 

```js
    const address = res.results[0].formatted_address,
          addressArray = res.results[0].address_components,
```

배열의 주소를 사용하여 도시의 정보를 얻을 수 있다.

특정 도시와 주 또는 이 변수에 있는 정보는 이 정보에서 도시 정보를 얻기 위해 여기에서 할 것입니다. 

먼저 city qustnfmf qls 3dmfh tjfwjdgks ekdma ektl tlfgodgksek.





```js
	const getCity = (addressArray) => {
		let city = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
				city = addressArray[i].long_name;
				return city;
			}
		}
	};
	const getArea = (addressArray) => {
		let area = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0]) {
				for (let j = 0; j < addressArray.length; j++) {
					if ('sublocality_level_2' === addressArray[i].types[j] || 'locality' === addressArray[i]) {
						area = addressArray[i].long_name;
						return area;
					}
				}
			}
		}
	};

	const getState = (addressArray) => {
		let state = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
					state = addressArray[i].long_name;
					return state;
				}
			}
		}
	};

	const onMarkerDragEnd = async (e) => {
		let newLat = e.latLng.lat();
		let newLng = e.latLng.lng();

		const res = await Geocode.fromLatLng(newLat, newLng);
		const address = res.results[0].formatted_address,
			addressArray = res.results[0].address_components,
			city = getCity(addressArray),
			area = getArea(addressArray),
			state = getState(addressArray);

		console.log(res);

		console.log('newLat', newLat);
	};

```

이렇게 해주고 이제 상태로 넣어주자.



```js

	const onMarkerDragEnd = async (e) => {
		let newLat = e.latLng.lat();
		let newLng = e.latLng.lng();

		const res = await Geocode.fromLatLng(newLat, newLng);
		const address = res.results[0].formatted_address,
			addressArray = res.results[0].address_components,
			city = getCity(addressArray),
			area = getArea(addressArray),
			state = getState(addressArray);

		console.log(res);
		setLocate({
			address: address ? address : '',
			area: area ? area : '',
			city: city ? city : '',
			state: state ? state : '',
			markerPosition: {
				lat: newLat,
				lng: newLat,
			},
			mapPosition: {
				lat: newLat,
				lng: newLat,
			},
		});
		console.log('newLat', newLat);
	};

```

이렇게 코딩하고 보면 움직일 수 없다 왜냐하면 위도를 위해 하드한 코딩을 했기 때문이다.

defaultCenter와 같은 경도이므로 상태를 변경해야 한다.

```js

	const MapWithAMarker = withScriptjs(
		withGoogleMap((props) => (
			<GoogleMap defaultZoom={8} defaultCenter={{ lat: locate.mapPosition.lat, lng: locate.mapPosition.lng }}>
				<Marker
					draggable={true}
					onDragEnd={onMarkerDragEnd}
					position={{ lat: locate.markerPosition.lat, lng: locate.markerPosition.lng }}
				>
					<InfoWindow>
						<div>hello</div>
					</InfoWindow>
				</Marker>
			</GoogleMap>
		))
	);

```

지역을 자동으로 찾으려면 AutoComplete를 사용

```js
import AutoComplete from 'react-google-autocomplete';


	const MapWithAMarker = withScriptjs(
		withGoogleMap((props) => (
			<GoogleMap defaultZoom={8} defaultCenter={{ lat: locate.mapPosition.lat, lng: locate.mapPosition.lng }}>
				<Marker
					draggable={true}
					onDragEnd={onMarkerDragEnd}
					position={{ lat: locate.markerPosition.lat, lng: locate.markerPosition.lng }}
				>
					<InfoWindow>
						<div>hello</div>
					</InfoWindow>
				</Marker>
				<AutoComplete style={{ width: '100%', height: '40px', paddingLeft: 16, marginTop: 2, marginBottom: '2rem' }} />
			</GoogleMap>
		))
	);
```

Google place api를 사용해서 찾을 장소를 찾자.

![image-20210125215729024](/Users/apple/Library/Application Support/typora-user-images/image-20210125215729024.png)

```js
	const MapWithAMarker = withScriptjs(
		withGoogleMap((props) => (
			<GoogleMap defaultZoom={8} defaultCenter={{ lat: locate.mapPosition.lat, lng: locate.mapPosition.lng }}>
				<Marker
					draggable={true}
					onDragEnd={onMarkerDragEnd}
					position={{ lat: locate.markerPosition.lat, lng: locate.markerPosition.lng }}
				>
					<InfoWindow>
						<div>hello</div>
					</InfoWindow>
				</Marker>
				<AutoComplete
					style={{ width: '100%', height: '40px', paddingLeft: 16, marginTop: 2, marginBottom: '2rem' }}
					onPlaceSelected={(place) => {
						console.log(place);
					}}
				/>
			</GoogleMap>
		))
	);

```

![image-20210125220003581](/Users/apple/Library/Application Support/typora-user-images/image-20210125220003581.png)

너무 깊거나 다른 곳에서 추적하므로 우리는 여기에서 우리가 같은 정보를 그래서 장소에서 선택된 이벤트가 발생한 후에 트리거를 켜고 

```js
	const onPlaceSelected = (place) => {
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = getCity(addressArray),
			area = getArea(addressArray),
			state = getState(addressArray),
			newLat = place.geomety.location.lat(),
			newLng = place.geomety.location.lng();
		setLocate({
			address: address ? address : '',
			area: area ? area : '',
			city: city ? city : '',
			state: state ? state : '',
			markerPosition: {
				lat: newLat,
				lng: newLng,
			},
			mapPosition: {
				lat: newLat,
				lng: newLng,
			},
		});
	};

	const MapWithAMarker = withScriptjs(
		withGoogleMap((props) => (
			<GoogleMap defaultZoom={8} defaultCenter={{ lat: locate.mapPosition.lat, lng: locate.mapPosition.lng }}>
				<Marker
					draggable={true}
					onDragEnd={onMarkerDragEnd}
					position={{ lat: locate.markerPosition.lat, lng: locate.markerPosition.lng }}
				>
					<InfoWindow>
						<div>hello</div>
					</InfoWindow>
				</Marker>
				<AutoComplete
					style={{ width: '100%', height: '40px', paddingLeft: 16, marginTop: 2, marginBottom: '2rem' }}
					onPlaceSelected={onPlaceSelected}
				/>
			</GoogleMap>
		))
```



위에서 정하는 장소 뿐만 아니라 위치 정보 api를 사용하자.

https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API



웹 API에서 제공한다.



이 부분을 렌더링 한 후 컴포넌트에 올때마다 didmount를 하자.



```js

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				// 위치와 이 위치 이후에 현재 위치를 가져올 수 있다. 위도와 경도를 사용하므로 이 값을 먼저 입력한다.
				setLocate(
					{
						mapPosition: {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						},
						markerPosition: {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						},
					},
					async () => {
						const res = await Geocode.fromLatLng(position.coords.latitude, position.coords.longitude);
						const address = res.results[0].formatted_address,
							addressArray = res.results[0].address_components,
							city = getCity(addressArray),
							area = getArea(addressArray),
							state = getState(addressArray);

						console.log(res);
						setLocate({
							address: address ? address : '',
							area: area ? area : '',
							city: city ? city : '',
							state: state ? state : '',
						});
					}
				);
			});
		}
	});

```

이렇게 하면 내 위치를 허용 거부 할 수 있게 나온다.

![image-20210125222210133](/Users/apple/Library/Application Support/typora-user-images/image-20210125222210133.png)

허용을 누르고 새로고침하면 내 위치가 나온다.

![image-20210125222439501](/Users/apple/Library/Application Support/typora-user-images/image-20210125222439501.png)