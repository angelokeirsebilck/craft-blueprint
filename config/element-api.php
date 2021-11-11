<?php

use craft;
use craft\elements\Category;
use craft\elements\Entry;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

return [
    'endpoints' => [
        '/api/load/realizations' => function() {
            return [
                'elementType' => Entry::class,
                'one' => true,
                'transformer' => function() {
                    $from = Craft::$app->getRequest()->getParam('from');
                    $catId = Craft::$app->getRequest()->getParam('catId');
                    if ($from) {
                        $cat = Category::find()
                            ->id($catId);

                        $entries = Entry::find()
                            ->section('realization')
                            ->offset($from)
                            ->relatedTo($cat)
                            ->limit(6);

                        $categories = Category::find()
                            ->all();

                        $cats = array();
                        foreach ($categories as $cat) {
                            $cats[$cat->id] = $cat->fieldColor;
                        }

                        if ($entries != '') {
                            $loader = new FilesystemLoader(__DIR__ . '/../templates');
                            $twig = new Environment($loader);
                            return [
                                $twig->render('_inc/_realization-grid.twig', [
                                    'realizations' => $entries,
                                    'readMore'=>Craft::t('site', 'readMore'),
                                    'initialLoad' => false,
                                    'cats' => $cats
                                ])
                            ];
                        }
                    }
                    return false;
                },
            ];
        },
    ]
];