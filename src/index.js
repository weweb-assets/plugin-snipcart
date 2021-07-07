/* wwEditor:start */
import './components/SettingsEdit.vue';
import './components/SettingsSummary.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Snipcart API
    \================================================================================================*/
    async injectSnipcartDependencies() {
        let snipcartHeadScript = '';
        let snipcartBodyScript = '';
        if (this.settings.privateData.apiKey) {
            snipcartHeadScript =
                '<link ww-plugin-snipcart rel="preconnect" href="https://app.snipcart.com">' +
                '<link ww-plugin-snipcart rel="preconnect" href="https://cdn.snipcart.com">' +
                '<link ww-plugin-snipcart rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css">';
            snipcartBodyScript =
                '<script ww-plugin-snipcart async="" src="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js"></script>' +
                `<div ww-plugin-snipcart hidden="" id="snipcart" data-api-key="${this.settings.privateData.apiKey}" data-config-modal-style="side"></div>`;
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
        const div = wwLib.getFrontDocument().createElement('div');
        div.innerHTML = scripts;

        const items = div.querySelectorAll('[ww-plugin-snipcart]');
        for (const item of items) {
            item.remove();
        }

        div.innerHTML += snipcartScript;
        return div.innerHTML;
    },
};
