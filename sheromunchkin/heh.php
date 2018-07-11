<?php
$image = imagecreate(601, 601);
$white = imagecolorallocate($image, 255, 255, 255);
$gray = imagecolorallocate($image, 128, 128, 128);
$lightgray = imagecolorallocate($image, 216, 216, 216);
$black = imagecolorallocate($image, 0, 0, 0);
imagefill($image, 0, 0, $white);
for ($i=0; $i<=600; $i+=10) {
    imageline($image, 0, $i, 600, $i, $lightgray);
    imageline($image, $i, 0, $i, 600, $lightgray);
}
imageline($image, 0, 600, 600, 600, $gray);
imageline($image, 0, 0, 0, 600, $gray);
for ($i=600,$j=0; $i>=0; $i-=10,$j+=10) {
    imageline($image, 0, $i, 3, $i, $gray); 
    if ($j>0 && $j<600) imagestring($image, 1, 6, $i-4, $j/10, $black);
    imageline($image, $i, 597, $i, 600, $gray); 
    if ($i>10 && $i<600) imagestringup($image, 1, $i-3, 592, ($i/10), $black);
}
function draw() {
    global $black, $image;
    for($z=200; $z>5; $z-=5) {
        $color = imagecolorallocate($image, 0, 255-$z/2-$z/3, 0);
        $oix = 0; $ox = 0;$oy = 0;
        for($t=0; $t<8400; $t++) {
            $ix = $oix+pi()/4196;
            $r = (1+sin($ix))*(1-0.9*abs(sin(4*$ix)))*(0.9+0.05*cos(200*$ix));
            $x = cos($ix)*$r*$z+300;
            $y = -sin($ix)*$r*$z+500;
            if($ox == 0 && $oy == 0) {
                $ox = $x;
                $oy = $y;
            }
            imageline($image, $ox, $oy, $x, $y, $color);
            $ox = $x;
            $oy = $y;
            $oix = $ix;
        }
    } 
}
draw();
header('Content-type: image/png');
imagepng($image);
?>
Подробнее: http://wikireality.ru/wiki/%D0%9A%D0%B0%D0%BD%D0%BD%D0%B0%D0%B1%D0%BE%D0%BB%D0%B0