export default {
    editor: {
        settings: {
            edit: () => import('./src/components/SettingsEdit.vue'),
            summary: () => import('./src/components/SettingsSummary.vue'),
            getIsValid(settings) {
                return !!settings.privateData.apiKey;
            },
            /* wwEditor:start */
            copilot: {
                description: 'Validates the Snipcart API key configuration',
                returns: 'boolean',
                schema: {
                    settings: {
                        type: 'object',
                        description: 'Plugin settings object',
                        bindable: false,
                        properties: {
                            privateData: {
                                type: 'object',
                                properties: {
                                    apiKey: {
                                        type: 'string',
                                        description: 'Snipcart API key for authentication',
                                        bindable: false
                                    }
                                }
                            }
                        }
                    }
                }
            }
            /* wwEditor:end */
        },
        designSystemId: '4fa7c80e-1503-4e47-bcd4-c279b991c8df'
    },
};