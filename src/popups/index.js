import configuration from './configuration.popup.vue';
import settings from './settings.popup.vue';

wwLib.wwPopups.addPopup('snipcartConfigurationPopup', configuration);
wwLib.wwPopups.addPopup('snipcartSettingsPopup', settings);

wwLib.wwPopups.addStory('SNIPCART_POPUP', {
    title: {
        en: 'Snipcart',
        fr: 'Snipcart',
    },
    type: 'snipcartSettingsPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
});

wwLib.wwPopups.addStory('SNIPCART_CONFIGURATION_POPUP', {
    title: {
        en: 'Snipcart - Configuration',
        fr: 'Snipcart - Configuration',
    },
    type: 'snipcartConfigurationPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save configuration',
                fr: 'Enregistrer la configuration',
            },
        },
    },
});
