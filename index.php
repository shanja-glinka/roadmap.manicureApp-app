<?

use System\Config;

define('AppDirectory', str_replace('\\', '/', __DIR__) . '/app');
define('AssetsDirectory', str_replace('\\', '/', __DIR__) . '/assets');

// @include_once('error_output.php');
// @include_once('tests_works.php');

try {
    require_once AppDirectory . '/system/App.php';
    require_once AppDirectory . '/system/Config.php';

    $routes = require AssetsDirectory . '/data/routes.php';

    $config = new System\Config;
    $app = new System\App($config);

    $app($routes);
} catch (Exception $e) {

    $request = new System\Request();
    $responce = new System\Responce();
    $responce->setHtmlCode($e->getCode());
    $responce->setContentType($request->getContentType());
    $responce->send($e->getMessage());
}
