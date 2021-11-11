<?php


namespace extension;

use modules\CookieConsent;
use modules\Module;
//composer dump-autoload on composer.json change

class Project_Twig_Extension extends \Twig\Extension\AbstractExtension
{
    public function getFunctions()
    {
        return [
            new \Twig\TwigFunction('gdpr', [$this, 'gdpr']),
            new \Twig\TwigFunction('gatracker', [$this, 'gatracker']),
            new \Twig\TwigFunction('isIE', [$this, 'isIE']),
        ];
    }

    public function gdpr()
    {
        return CookieConsent::frontend();
    }

    public function gatracker()
    {
        return CookieConsent::tracker();
    }

    public function isIE()
    {
        return Module::isIE();
    }
}