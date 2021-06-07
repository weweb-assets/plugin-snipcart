module.exports = {
    componentPath: './src/index.js',
    editor: {
        settings: {
            edit: () => import('./src/components/SettingsEdit.vue'),
            summary: () => import('./src/components/SettingsSummary.vue'),
        },
    },
};
