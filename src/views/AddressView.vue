<template>
    <main>
        <div>
            {{ AddressData }}
        </div>
        <div v-show="AlertError == true" class="alert alert-danger" role="alert">
            <span>{{ errorMessage }}</span>
        </div>
    </main>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const AddressData = ref('')
const AlertError = ref(false);
const errorMessage = ref('');
const token = ref('Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4')


const getAddress = () => {
    const config = {
        method: 'get',
        url: 'https://stage.achareh.ir/api/karfarmas/address',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
        }
    };
    axios(config).then((response) => {
        AddressData.value = response.data
    })
        .catch(httpErrorHandler)
}

const httpErrorHandler = (error) => {
    if (error === null) throw new Error('Unrecoverable error!! Error is null!');
    if (axios.isAxiosError(error)) {
        const response = error.response
        const request = error.request

        if (error.code === 'ERR_NETWORK') {
            errorAlert(error.message)
        } else if (error.code === 'ERR_CANCELED') {
            errorAlert(error.message)
        }
        if (response) {
            const statusCode = response?.status
            if (statusCode === 404) {
                errorAlert(response.data.detail)
            } else if (statusCode === 401) {
                errorAlert(response.data.detail)
            }
        } else if (request) {
            errorAlert(response.data.detail)
        }
    }
    // errorAlert(error.message)
}

const errorAlert = (message) => {
    AlertError.value = true;
    errorMessage.value = message
}


onMounted(() => {
    getAddress()
})
</script>

<style scoped>
.alert {
    min-width: 10rem;
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: 100%;
}

@media(min-width:768px) {
    .alert {
        width: auto;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
}
</style>