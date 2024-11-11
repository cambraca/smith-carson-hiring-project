<?php

use alsvanzelf\jsonapi;
use App\Models\Candidates;
use Phalcon\Loader;
use Phalcon\Mvc\Micro;
use Phalcon\Di\FactoryDefault;
use Phalcon\Db\Adapter\Pdo\Mysql as PdoMysql;

require_once 'vendor/autoload.php';

$loader = new Loader();
$loader->registerNamespaces(
    [
        'App\Models' => __DIR__ . '/models/',
    ]
);
$loader->register();


$container = new FactoryDefault();
$container->set(
    'db',
    function () {
        return new PdoMysql(
            [
                'host'     => 'db',
                'username' => 'dev',
                'password' => 'plokijuh',
                'dbname'   => 'hiring',
            ]
        );
    }
);

$app = new Micro($container);

$app->get(
    '/',
    function () {
      header('Content-type: application/json');
      echo json_encode([
        'available REST endpoints:',
        'GET /api/candidates',
        'GET /api/candidates/{id}',
        'POST /api/candidates',
      ]);
    }
);

$app->get(
  '/api/candidates',
  function () use ($app) {
    $phql = "SELECT id, name, age FROM App\Models\Candidates ORDER BY age";
    $candidates = $app
      ->modelsManager
      ->executeQuery($phql)
    ;

    $response = new jsonapi\CollectionDocument();

    /** @var \Phalcon\Mvc\Model\Row $cand */
    foreach ($candidates as $candidate)
      $response->add('candidates', $candidate->id, $candidate->toArray());

    $response->sendResponse();
  }
);

$app->post(
  '/api/candidates',
  function () use ($app) {
    $parser = jsonapi\helpers\RequestParser::fromSuperglobals();
    $document = $parser->getDocument();
    $phql = "INSERT INTO App\Models\Candidates (name, age) VALUES (:name:, :age:)";
    $result = $app
      ->modelsManager
      ->executeQuery($phql, $document['data']['attributes'])
    ;

    /** @var jsonapi\interfaces\DocumentInterface $response */
    if ($result->success()) {
      /** @var Candidates $model */
      $model = $result->getModel();

      $response = new jsonapi\ResourceDocument($model->getSource(), $model->id);
      $response->setAttributesObject(jsonapi\objects\AttributesObject::fromObject($model));
      $response->setHttpStatusCode(201);
    } else {
      $messages = $result->getMessages();
      $message = (count($messages) >= 1) ? $messages[0]->getMessage() : 'Unknown error';

      $error = new jsonapi\objects\ErrorObject(NULL, $message);
      $response = new jsonapi\ErrorsDocument($error);
      $response->setHttpStatusCode(400);
    }
    $response->sendResponse();
  }
);

$app->handle($_SERVER['REQUEST_URI']);
