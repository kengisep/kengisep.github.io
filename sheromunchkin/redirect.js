var userPlatform = navigator.platform;
alert(userPlatform);
switch(userPlatform) {
  case 'Android':
	alert("andr");
    break;

  case 'iPhone':
	alert("iph")
    break;

  default:
	alert(userPlatform);
    break;
}