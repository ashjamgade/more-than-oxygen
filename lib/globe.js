// Geographic coordinates on a unit sphere. The land silhouettes are illustrative.
export function geoPoint(lat, lon, radius = 1) {
  const phi = lat * Math.PI / 180, theta = lon * Math.PI / 180;
  return [radius * Math.cos(phi) * Math.sin(theta), radius * Math.sin(phi), radius * Math.cos(phi) * Math.cos(theta)];
}
export const CITIES = { mumbai: { lat: 19.076, lon: 72.8777 }, sydney: { lat: -33.8688, lon: 151.2093 } };
export const LAND = [
 [[-17,36],[10,37],[35,31],[51,12],[42,-12],[32,-34],[18,-35],[10,-15],[-8,5],[-17,20]],
 [[-10,36],[-10,60],[10,72],[40,70],[65,75],[105,76],[145,63],[175,65],[160,45],[140,35],[125,20],[108,5],[98,12],[88,22],[78,8],[70,24],[52,30],[40,40],[28,35],[20,40]],
 [[112,-11],[138,-11],[153,-25],[154,-33],[150,-38],[146,-39],[128,-35],[114,-25]],
 [[-168,65],[-140,70],[-110,73],[-80,63],[-55,50],[-75,40],[-82,25],[-98,16],[-110,28],[-125,40],[-148,58]],
 [[-81,10],[-65,12],[-48,-2],[-35,-8],[-45,-25],[-55,-38],[-70,-55],[-75,-38],[-80,-10]],
 [[-52,60],[-40,63],[-20,78],[-42,84],[-60,75]],
 [[46,-13],[51,-15],[48,-25],[44,-23]],
];
export function inPolygon(lon,lat,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const [xi,yi]=poly[i],[xj,yj]=poly[j];if(((yi>lat)!==(yj>lat))&&(lon<(xj-xi)*(lat-yi)/(yj-yi)+xi))inside=!inside;}return inside;}
