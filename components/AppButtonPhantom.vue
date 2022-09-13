<template>
    <v-icon class="mx-auto cursor-pointer" @click="$authentication.becomeAGhost(email)">fas fa-ghost</v-icon>
</template>

<script>
export default {
    props: {
        email: {
            type: String,
            required: true,
        }
    }
}
</script>