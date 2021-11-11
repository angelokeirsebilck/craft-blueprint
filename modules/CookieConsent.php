<?php


namespace modules;
use Craft;

use Boa\Tools\Gdpr;

class CookieConsent extends \yii\base\Module
{
    public function init()
    {
        parent::init();

//        if (Craft::$app->getRequest()->isPost && !Gdpr::getCookiePreferences() && !empty(Craft::$app->request->post('gdpr_confirmation'))) {
//            Gdpr::setCookiePreferences(Craft::$app->request->post());
//            Craft::$app->getResponse()->redirect(Craft::$app->request->absoluteUrl,302)->send();
//        }
    }

    public static function frontend()
    {
        if (empty(Gdpr::getCookiePreferences()) && !Craft::$app->getRequest()->isPost) {
            $gdprPopupCookieOptions = ['essential' => '1', 'tracking' => '0', 'marketing' => '0'];
            $gdprPopupTranslations = json_decode(Craft::t('site', 'gdpr'), true);

            return Gdpr::getFrontend($gdprPopupCookieOptions, $gdprPopupTranslations);
        }
    }

    public static function tracker()
    {
        return Gdpr::getGoogleAnalyticsTracker("xxxx");
    }
}