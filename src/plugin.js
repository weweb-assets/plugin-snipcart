import './popups';

/* wwEditor:end */
export default {
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
    Data
    \================================================================================================*/
    /* wwEditor:start */
    settings: {
        data: {},
        privateData: {
            apiKey: '',
        },
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        Init
    \================================================================================================*/
    async init() {
        /* wwEditor:start */
        const plugin = wwLib.wwPlugins.pluginSnipcart;
        plugin.settings = (await wwLib.wwPlugin.getSettings(plugin.id)) || this.settings;

        if (!plugin.settings.privateData.apiKey) plugin.settings.privateData.apiKey = '';
        if (!plugin.settings.privateData.apiKey.length) {
            this.sidebarButton();
        }
        /* wwEditor:end */
        const isSetup = !!plugin.settings.privateData.apiKey.length;
        if (isSetup) await this.injectSnipcartDependencies();
    },
    /* wwEditor:start */
    /*=============================================m_ÔÔ_m=============================================\
        INJECT SNIPCART
    \================================================================================================*/
    async injectSnipcartDependencies() {
        let snipcartHeadScript = '';
        let snipcartBodyScript = '';
        if (
            wwLib.wwPlugins.pluginSnipcart &&
            wwLib.wwPlugins.pluginSnipcart.privateData &&
            wwLib.wwPlugins.pluginSnipcart.privateData.apiKey
        ) {
            snipcartHeadScript =
                '<link  ww-plugin-snipcart rel="preconnect" href="https://app.snipcart.com">' +
                '<link ww-plugin-snipcart rel="preconnect" href="https://cdn.snipcart.com">' +
                '<link ww-plugin-snipcart rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css">';
            snipcartBodyScript =
                '<script ww-plugin-snipcart async="" src="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js"></script>' +
                `<div ww-plugin-snipcart hidden="" id="snipcart" data-api-key="${wwLib.wwPlugins.pluginSnipcart.privateData.apiKey}" data-config-modal-style="side"></div>`;
        }
        const designInfo = wwLib.$store.getters['websiteData/getDesignInfo'];
        const headScripts = designInfo.headScripts;
        const bodyScripts = designInfo.bodyScripts;

        let newHeadScripts = this.manageScripts(headScripts, snipcartHeadScript);
        let newBodyScripts = this.manageScripts(bodyScripts, snipcartBodyScript);

        try {
            await wwLib.$apollo.mutate({
                mutation: wwLib.$apolloQueries.UPDATE_DESIGN,
                variables: {
                    designId: await wwLib.$store.getters['websiteData/getDesignInfo'].id,
                    headScripts: newHeadScripts,
                    bodyScripts: newBodyScripts,
                },
            });
            wwLib.$store.dispatch('websiteData/updateDesignInfo', {
                ...designInfo,
                headScripts: newHeadScripts,
                bodyScripts: newBodyScripts,
            });
        } catch (err) {
            wwLib.wwLog.error(err);
        }
    },

    manageScripts(scripts, snipcartScript) {
        const div = document.createElement('div');
        div.innerHTML = scripts;

        const items = div.querySelectorAll('[ww-plugin-snipcart]');

        for (let item of items) {
            item.remove();
        }

        div.innerHTML += snipcartScript;
        return div.innerHTML;
    },
    /*=============================================m_ÔÔ_m=============================================\
        SIDEBAR POPUP
    \================================================================================================*/
    async sidebarButton() {
        try {
            const { id } = wwLib.wwPlugins.pluginSnipcart;
            const settings = await wwLib.wwPlugin.getSettings(id);
            const isSetup = settings && settings.privateData && typeof settings.privateData.apiKey === 'string';
            await wwLib.wwPopups.open({
                firstPage: isSetup ? 'SNIPCART_POPUP' : 'SNIPCART_CONFIGURATION_POPUP',
                data: {
                    pluginId: id,
                    settings,
                },
            });
        } catch (err) {
            wwLib.wwLog.error(err);
        }
    },
    /* wwEditor:end */
};
