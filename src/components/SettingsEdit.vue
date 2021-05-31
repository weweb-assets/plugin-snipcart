<template>
    <div class="settings-edit">
        <wwEditorFormRow required label="API key">
            <template slot="append-label">
                <a
                    class="settings-edit__link"
                    href="https://app.snipcart.com/dashboard/account/credentials"
                    target="_blank"
                >
                    Find it here
                </a>
            </template>
            <wwEditorFormInput
                type="text"
                name="api-key"
                placeholder="key**************"
                :value="settings.privateData.apiKey"
                @input="changeApiKey"
                :style="{ '-webkit-text-security': isKeyHidden ? 'disc' : 'none' }"
                v-on:keyup.native.enter="$emit('save')"
            />
        </wwEditorFormRow>
        <div class="settings-edit__row">
            <wwManagerRadio :value="!isKeyHidden" @input="isKeyHidden = !$event" />
            <span class="settings-edit__radio-label caption-m">Show api key</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    data() {
        return {
            isKeyHidden: true,
        };
    },
    watch: {
        isValid: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    computed: {
        isValid() {
            return !!this.settings.privateData.apiKey;
        },
    },
    methods: {
        changeApiKey(apiKey) {
            this.$emit('update-settings', { ...this.settings, privateData: { apiKey } });
        },
    },
    beforeDestroy() {
        this.plugin.injectSnipcartDependencies();
    },
};
</script>

<style lang="scss" scoped>
.settings-edit {
    display: flex;
    flex-direction: column;
    &__link {
        color: var(--ww-color-blue-500);
        margin-left: var(--ww-spacing-02);
    }
    &__row {
        display: flex;
        align-items: center;
    }
    &__radio-label {
        margin-left: var(--ww-spacing-02);
    }
}
</style>
