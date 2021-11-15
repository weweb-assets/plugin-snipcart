export default {
    editor: {
        settings: {
            edit: () => import('./src/components/SettingsEdit.vue'),
            summary: () => import('./src/components/SettingsSummary.vue'),
            getIsValid(settings) {
                return !!settings.privateData.apiKey;
            },
        },
        designSystemId: '4fa7c80e-1503-4e47-bcd4-c279b991c8df'
    },
};