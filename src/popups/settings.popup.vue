<template>
    <div class="ww-popup-snipcart-settings">
        <div class="snipcart-settings__properties" @click="next('SNIPCART_CONFIGURATION_POPUP')">
            <wwEditorIcon class="snipcart-settings__properties-icon -left" name="advanced" />
            <div class="snipcart-settings__properties-name paragraph-s">Configuration</div>
            <wwEditorIcon class="snipcart-settings__properties-icon -right" name="chevron-forward" />
        </div>
        <a class="snipcart-settings__properties" href="//developer.weweb.io/" target="_blank">
            <wwEditorIcon class="snipcart-settings__properties-icon -left" name="comment" />
            <div class="snipcart-settings__properties-name paragraph-s">Weweb Documentation</div>
            <wwEditorIcon class="snipcart-settings__properties-icon -right" name="chevron-forward" />
        </a>
        <a class="snipcart-settings__properties" href="//docs.snipcart.com/v3/" target="_blank">
            <wwEditorIcon class="snipcart-settings__properties-icon -left" name="comment" />
            <div class="snipcart-settings__properties-name paragraph-s">Snipcart Documentation</div>
            <wwEditorIcon class="snipcart-settings__properties-icon -right" name="chevron-forward" />
        </a>
        <div class="snipcart-settings__delete-zone danger-zone">
            <span class="snipcart-settings__delete-zone-label">DANGER ZONE</span>
            <button
                class="snipcart-settings__delete-zone-button ww-editor-button -primary -red -small"
                @click="deletePlugin"
            >
                Delete plugin
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SettingsPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            pluginId: undefined,
            settings: {},
        };
    },
    methods: {
        next(popup) {
            this.$emit('next', popup);
        },
        async deletePlugin() {
            const confirm = await wwLib.wwModals.open({
                title: {
                    en: 'Delete plugin snipcart?',
                    fr: 'Supprimer le plugin snipcart?',
                },
                text: {
                    en: 'Are you sure you want to delete the plugin from your website?',
                    fr: 'Voulez-vous vraiment supprimer le plugin de votre site ?',
                },
                buttons: [
                    {
                        text: {
                            en: 'Cancel',
                            fr: 'Annuler',
                        },
                        color: '-secondary',
                        value: false,
                        escape: true,
                    },
                    {
                        text: {
                            en: 'Delete',
                            fr: 'Supprimer',
                        },
                        color: '-primary -red',
                        value: true,
                        enter: true,
                    },
                ],
            });
            if (!confirm) return;
            await wwLib.wwPlugin.deleteDesignPlugin(this.pluginId);
        },
    },
    created() {
        this.pluginId = this.options.data.pluginId;
        this.settings = this.options.data.settings;
    },
};
</script>

<style scoped lang="scss">
.ww-popup-snipcart-settings {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .snipcart-settings {
        &__input {
            margin-bottom: var(--ww-spacing-03);
        }
        &__row {
            display: flex;
            align-items: center;
        }
        &__delete-zone {
            margin-top: auto;
            &-label {
                width: 100%;
                font-size: var(--ww-font-size-04);
                color: var(--ww-color-red-500);
            }
            &-button {
                margin-top: var(--ww-spacing-02);
                margin-right: var(--ww-spacing-02);
            }
        }
        &__properties {
            display: flex;
            align-items: center;
            padding: var(--ww-spacing-02) 0;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: var(--ww-border-radius-02);
            margin-bottom: var(--ww-spacing-01);
            &-name {
                margin-left: var(--ww-spacing-01);
            }

            &-content {
                margin-left: auto;
                color: var(--ww-color-dark-400);
            }
            &-icon {
                &.-left {
                    margin-right: var(--ww-spacing-01);
                }
                &.-right {
                    margin-left: auto;
                    margin-right: var(--ww-spacing-01);
                }
            }
            &:hover {
                background-color: var(--ww-color-dark-200);
            }
        }
    }
}
</style>
