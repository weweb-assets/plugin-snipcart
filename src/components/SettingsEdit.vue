<template>
    <div class="snipcart-settings-edit">
        <wwEditorFormRow required label="API key">
            <template #append-label>
                <a
                    class="snipcart-settings-edit__link"
                    href="https://app.snipcart.com/dashboard/account/credentials"
                    target="_blank"
                >
                    Find it here
                </a>
            </template>
            <wwEditorInputText
                type="text"
                name="api-key"
                placeholder="*****************"
                :model-value="settings.privateData.apiKey"
                :style="{ '-webkit-text-security': isKeyVisible ? 'none' : 'disc' }"
                large
                @update:modelValue="changeApiKey"
            />
        </wwEditorFormRow>
        <div class="snipcart-settings-edit__row">
            <wwEditorInputSwitch v-model="isKeyVisible" />
            <span class="snipcart-settings-edit__radio-label caption-m">Show api key</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    data() {
        return {
            isKeyVisible: false,
        };
    },
    beforeUnmount() {
        this.plugin.injectSnipcartDependencies();
    },
    methods: {
        changeApiKey(apiKey) {
            this.$emit('update:settings', { ...this.settings, privateData: { apiKey } });
        },
    },
};
</script>

<style lang="scss" scoped>
.snipcart-settings-edit {
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
